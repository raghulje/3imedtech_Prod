import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ASSETS } from '../../constants/assets';
import { trackEvent } from '../../utils/analytics';

interface FooterProps {
  footerData?: {
    logo?: string;
    tagline?: string;
    companyText?: string;
    registeredOffice?: string;
    corporateOffice?: string;
    phone?: string;
    email?: string;
    socialLinks?: any;
    copyright?: string;
    navigationColumns?: any;
  };
}

const Footer = ({ footerData: propFooterData }: FooterProps = {}) => {
  const [footerData, setFooterData] = useState<any>(propFooterData || null);

  // Fetch footer data from CMS if not provided as prop
  useEffect(() => {
    if (!propFooterData) {
      const fetchFooterData = async () => {
        try {
          const res = await fetch('/api/cms/header-footer/footer');
          if (res.ok) {
            const json = await res.json();
            setFooterData(json?.data || json || null);
          }
        } catch (error) {
          console.error('Error fetching footer data:', error);
        }
      };
      fetchFooterData();

      // Listen for footer data changes
      const handleFooterChange = () => {
        fetchFooterData();
      };
      window.addEventListener('footerDataChanged', handleFooterChange);
      return () => window.removeEventListener('footerDataChanged', handleFooterChange);
    } else {
      setFooterData(propFooterData);
    }
  }, [propFooterData]);

  // Parse social links and navigation columns
  const socialLinks = footerData?.socialLinks 
    ? (typeof footerData.socialLinks === 'string' 
        ? JSON.parse(footerData.socialLinks) 
        : footerData.socialLinks)
    : [
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/refex-group/', icon: 'fa-linkedin' },
        { platform: 'Facebook', url: 'https://www.facebook.com/refexindustrieslimited/', icon: 'fa-facebook' },
        { platform: 'Twitter', url: 'https://x.com/GroupRefex', icon: 'fa-twitter' },
        { platform: 'YouTube', url: 'https://www.youtube.com/@refexgroup', icon: 'fa-youtube' },
        { platform: 'Instagram', url: 'https://www.instagram.com/refexgroup/', icon: 'fa-instagram' },
      ];

  const navColumns = footerData?.navigationColumns 
    ? (typeof footerData.navigationColumns === 'string' 
        ? JSON.parse(footerData.navigationColumns) 
        : footerData.navigationColumns)
    : [
        {
          title: 'About 3i MedTech',
          links: [
            { label: 'About', link: '/about' },
            { label: 'Mission & Vision', link: '/mission-vision-and-values' },
            { label: 'Why Choose Us', link: '/why-choose-us' },
          ]
        },
        {
          title: 'Know More',
          links: [
            { label: 'Radiography Systems', link: '/radiography-systems' },
            { label: 'Portable X-Ray Solutions', link: '/portable-x-ray-solutions' },
            { label: 'Mammography Systems', link: '/mammography-systems' },
            { label: 'Flat Panel Detectors', link: '/flat-panel-detectors' },
            { label: 'Imaging Accessories', link: '/imaging-accessories' },
            { label: 'Refurbished MRI Systems', link: '/refurbished-mri-systems' },
            { label: 'Anamaya', link: 'https://anamaya.3imedtech.com/', external: true },
          ]
        },
      ];

  // Format phone number with proper spacing
  const formatPhoneNumber = (phone: string): { countryCode: string; number: string } | null => {
    if (!phone) return null;
    // Extract +91 and the rest of the number
    const match = phone.match(/^(\+91)\s*(.+)$/);
    if (match) {
      return {
        countryCode: match[1],
        number: match[2].trim()
      };
    }
    return { countryCode: '', number: phone.trim() };
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-[1880px] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Logo and Contact Info - Left Section */}
          <div className="lg:col-span-4">
            <Link 
              to="/" 
              className="block mb-4"
              onClick={() => {
                // Scroll to top when clicking footer logo
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {/* Footer Logo - CMS or Local Asset */}
              <img
                src={footerData?.logo || ASSETS.LOGOS.FOOTER}
                alt="3i MedTech"
                style={{ width: '150px', height: '150px', minWidth: '150px', minHeight: '150px' }}
                className="object-contain mb-4"
              />
            </Link>
            <div className="space-y-4 text-gray-700">
              {footerData?.registeredOffice && (
                <div>
                  <p className="font-bold text-gray-900 mb-1.5 text-sm">Registered Office :</p>
                  <p className="text-sm leading-relaxed text-gray-700">
                    {footerData.registeredOffice}
                  </p>
                </div>
              )}
              {footerData?.corporateOffice && (
                <div>
                  <p className="font-bold text-gray-900 mb-1.5 text-sm">Corporate Office :</p>
                  <p className="text-sm leading-relaxed text-gray-700">
                    {footerData.corporateOffice}
                  </p>
                </div>
              )}
              <div className="space-y-1 pt-1">
                {footerData?.phone && (() => {
                  const formatted = formatPhoneNumber(footerData.phone);
                  return formatted ? (
                    <a 
                      href={`tel:${footerData.phone.replace(/\s/g, '')}`} 
                      className="block hover:text-[#E6662F] transition-colors"
                      style={{
                        color: '#0E2B5C',
                        fontFamily: 'Rubik, sans-serif',
                        fontSize: '15px'
                      }}
                      onClick={() => {
                        try {
                          trackEvent('contact_click', 'contact', 'phone_footer');
                        } catch {}
                      }}
                    >
                      <span>{formatted.countryCode}</span>
                      <span style={{ marginLeft: '8px', letterSpacing: '0.5px' }}>{formatted.number}</span>
                    </a>
                  ) : (
                    <a 
                      href={`tel:${footerData.phone.replace(/\s/g, '')}`} 
                      className="block hover:text-[#E6662F] transition-colors"
                      style={{
                        color: '#0E2B5C',
                        fontFamily: 'Rubik, sans-serif',
                        fontSize: '15px'
                      }}
                      onClick={() => {
                        try {
                          trackEvent('contact_click', 'contact', 'phone_footer');
                        } catch {}
                      }}
                    >
                      {footerData.phone}
                    </a>
                  );
                })()}
                {footerData?.email && (
                  <a 
                    href={`mailto:${footerData.email}`} 
                    className="block hover:text-[#E6662F] transition-colors"
                    style={{
                      color: '#0E2B5C',
                      fontFamily: 'Rubik, sans-serif',
                      fontSize: '15px'
                    }}
                    onClick={() => {
                      try {
                        trackEvent('contact_click', 'contact', 'email_footer');
                      } catch {}
                    }}
                  >
                    {footerData.email}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Columns from CMS */}
          {navColumns
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
            .map((column: any, idx: number) => (
            <div key={idx} className="lg:col-span-3">
              <h3 
                className="font-bold mb-4"
                style={{
                  color: '#7DC244',
                  fontFamily: 'Rubik, sans-serif',
                  fontSize: '18px',
                  margin: '0px 0px 30px'
                }}
              >
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links
                  ?.sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                  .map((link: any, linkIdx: number) => (
                  <li key={linkIdx}>
                    {link.external ? (
                      <a 
                        href={link.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="relative inline-block transition-colors duration-300 group"
                        style={{
                          color: '#0E2B5C',
                          fontFamily: 'Rubik, sans-serif',
                          fontSize: '15px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#E6662F';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#0E2B5C';
                        }}
                      >
                        {link.label}
                        <span 
                          className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E6662F] transition-all duration-500 ease-out group-hover:w-full"
                        ></span>
                      </a>
                    ) : (
                      <Link 
                        to={link.link} 
                        className="relative inline-block transition-colors duration-300 group"
                        style={{
                          color: '#0E2B5C',
                          fontFamily: 'Rubik, sans-serif',
                          fontSize: '15px'
                        }}
                        onClick={() => {
                          // Scroll to top when clicking footer links with optimized smooth scroll
                          if (window.pageYOffset > 0) {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#E6662F';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#0E2B5C';
                        }}
                      >
                        {link.label}
                        <span 
                          className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E6662F] transition-all duration-500 ease-out group-hover:w-full"
                        ></span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Follow us on - Right Section */}
          <div className="lg:col-span-2">
            <h3 
              className="font-bold mb-4"
              style={{
                color: '#7DC244',
                          fontFamily: 'Rubik, sans-serif',
                fontSize: '18px',
                margin: '0px 0px 30px'
              }}
            >
              Follow us on
            </h3>
            <ul className="social-icon flex gap-2" style={{ maxWidth: '200px' }}>
              {socialLinks
                .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                .map((social: any, idx: number) => (
                <li key={idx}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-8 h-8 flex items-center justify-center transition-all duration-300 border border-gray-300 rounded-sm bg-white group overflow-hidden"
                    title={social.platform}
                    style={{
                      color: '#333842',
                      fontFamily: 'Rubik, sans-serif',
                      fontSize: '15px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#E6662F';
                      e.currentTarget.style.borderColor = '#E6662F';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#333842';
                      e.currentTarget.style.borderColor = '#d1d5db';
                    }}
                  >
                    {/* Underline effect from left to right */}
                    <span 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E6662F] transition-all duration-500 ease-out group-hover:w-full"
                    ></span>
                    {/* Icon */}
                    <span className="relative z-10">
                      {social.icon && (social.icon.startsWith('fa-') || social.icon.startsWith('ri-')) ? (
                        <i className={`${social.icon.startsWith('fa-') ? 'fa' : 'ri'} ${social.icon} text-sm`}></i>
                      ) : social.icon ? (
                        <img 
                          src={social.icon} 
                          alt={social.platform || 'Social'} 
                          className="w-4 h-4 object-contain" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="16" height="16"%3E%3Crect fill="%23f3f4f6" width="16" height="16" rx="1"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" fill="%239ca3af" font-family="Arial" font-size="8"%3E?%3C/text%3E%3C/svg%3E';
                          }} 
                        />
                      ) : (
                        <i className="fa fa-link text-sm"></i>
                      )}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 py-4">
        <div className="max-w-[1880px] mx-auto px-6 lg:px-12">
          <p className="text-center text-gray-600 text-sm">
            {footerData?.copyright || 'Copyright © 2024 3i Medical Technologies'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
