import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ASSETS } from '../../constants/assets';
import { trackEvent } from '../../utils/analytics';

interface HeaderProps {
  headerData?: {
    logo?: string;
    phone?: string;
    phoneIcon?: string;
    email?: string;
    navigationLinks?: any;
  };
}

const Header = ({ headerData: propHeaderData }: HeaderProps = {}) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [headerData, setHeaderData] = useState<any>(propHeaderData || null);
  const [lastClickTime, setLastClickTime] = useState(0);

  // Fetch header data from CMS if not provided as prop
  useEffect(() => {
    if (!propHeaderData) {
      const fetchHeaderData = async () => {
        try {
          const res = await fetch('/api/cms/header-footer/header');
          if (res.ok) {
            const json = await res.json();
            setHeaderData(json?.data || json || null);
          }
        } catch (error) {
          console.error('Error fetching header data:', error);
        }
      };
      fetchHeaderData();

      // Listen for header data changes
      const handleHeaderChange = () => {
        fetchHeaderData();
      };
      window.addEventListener('headerDataChanged', handleHeaderChange);
      return () => window.removeEventListener('headerDataChanged', handleHeaderChange);
    } else {
      setHeaderData(propHeaderData);
    }
  }, [propHeaderData]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // Helper function to handle navigation with scroll to top and hash highlighting
  const handleHashNavigation = (path: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    // Scroll to top first
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Navigate after a short delay
    setTimeout(() => {
      navigate(path);
      
      // Handle hash highlighting after navigation
      setTimeout(() => {
        const hash = window.location.hash;
        if (hash) {
          const element = document.getElementById(hash.replace('#', ''));
          if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            // Scroll to element
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            
            // Add highlight effect
            element.style.transition = 'all 0.3s ease';
            element.style.boxShadow = '0 0 20px rgba(230, 102, 47, 0.5)';
            element.style.outline = '2px solid rgba(230, 102, 47, 0.3)';
            
            // Remove highlight after 2 seconds
            setTimeout(() => {
              element.style.boxShadow = '';
              element.style.outline = '';
            }, 2000);
          }
        }
      }, 200);
    }, 300);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'} pb-0`}>
        <div className="max-w-[1880px] mx-auto px-6 lg:px-12 relative">
          {/* Orange top line for navbar - positioned at top of container, animates based on hovered nav item */}
          <div className="absolute top-0 left-0 h-0.5 bg-[#E6662F] transition-all duration-500 ease-out nav-orange-line" style={{ width: '0', transform: 'translateX(0)' }}></div>
          <div className="flex items-center justify-between h-[100px]">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                {/* Main Logo - CMS or Local Asset */}
                <img
                  src={headerData?.logo || ASSETS.LOGOS.MAIN}
                  alt="3i MedTech"
                  className="object-contain"
                  style={{ width: '100px', height: '100px', minWidth: '100px', minHeight: '100px' }}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/" 
                className="relative text-[#0E2B5C] hover:text-[#7AB730] font-medium transition-colors duration-300 group"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onMouseEnter={(e) => {
                  const line = document.querySelector('.nav-orange-line') as HTMLElement;
                  if (line) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const container = e.currentTarget.closest('.max-w-\\[1920px\\]') || document.querySelector('.max-w-\\[1920px\\]');
                    const containerRect = container?.getBoundingClientRect();
                    if (containerRect) {
                      line.style.width = `${rect.width}px`;
                      line.style.transform = `translateX(${rect.left - containerRect.left}px)`;
                    }
                  }
                }}
                onMouseLeave={() => {
                  const line = document.querySelector('.nav-orange-line') as HTMLElement;
                  if (line) {
                    line.style.width = '0';
                  }
                }}
              >
                Home
              </Link>

              <div className="relative group">
                <button 
                  className="relative text-[#0E2B5C] hover:text-[#7AB730] font-medium transition-colors duration-300 whitespace-nowrap"
                  onMouseEnter={(e) => {
                    const line = document.querySelector('.nav-orange-line') as HTMLElement;
                    if (line) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const container = e.currentTarget.closest('.max-w-\\[1920px\\]') || document.querySelector('.max-w-\\[1920px\\]');
                      const containerRect = container?.getBoundingClientRect();
                      if (containerRect) {
                        line.style.width = `${rect.width}px`;
                        line.style.transform = `translateX(${rect.left - containerRect.left}px)`;
                      }
                    }
                  }}
                  onMouseLeave={() => {
                    const line = document.querySelector('.nav-orange-line') as HTMLElement;
                    if (line) {
                      line.style.width = '0';
                    }
                  }}
                >
                  About 3i MedTech
                </button>
                <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 overflow-hidden">
                  <Link 
                    to="/about" 
                    className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 group/item"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100 transition-all duration-300">→</span>
                    <span>About</span>
                  </Link>
                  <Link 
                    to="/mission-vision-and-values" 
                    className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 group/item"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100 transition-all duration-300">→</span>
                    <span>Mission &amp; Vision</span>
                  </Link>
                  <Link 
                    to="/why-choose-us" 
                    className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 group/item"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100 transition-all duration-300">→</span>
                    <span>Why Choose Us</span>
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <button 
                  className="relative text-[#0E2B5C] hover:text-[#7AB730] font-medium transition-colors duration-300 whitespace-nowrap"
                  onMouseEnter={(e) => {
                    const line = document.querySelector('.nav-orange-line') as HTMLElement;
                    if (line) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const container = e.currentTarget.closest('.max-w-\\[1920px\\]') || document.querySelector('.max-w-\\[1920px\\]');
                      const containerRect = container?.getBoundingClientRect();
                      if (containerRect) {
                        line.style.width = `${rect.width}px`;
                        line.style.transform = `translateX(${rect.left - containerRect.left}px)`;
                      }
                    }
                  }}
                  onMouseLeave={() => {
                    const line = document.querySelector('.nav-orange-line') as HTMLElement;
                    if (line) {
                      line.style.width = '0';
                    }
                  }}
                >
                  Specialties
                </button>
                <div className="absolute left-0 mt-2 min-w-[320px] bg-white border border-gray-200 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                  <div className="relative group/sub">
                    <button className="flex items-center w-full text-left px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 group/item">
                      <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100 transition-all duration-300 flex-shrink-0">→</span>
                      <span className="truncate">General Radiography</span>
                    </button>
                    <div className="absolute left-full top-0 w-96 bg-white border border-gray-200 shadow-lg rounded-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 transform group-hover/sub:translate-x-0 -translate-x-2 overflow-hidden z-50">
                      <Link 
                        to="/radiography-systems#fpd-c-arm" 
                        className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem"
                        onClick={(e) => handleHashNavigation('/radiography-systems#fpd-c-arm', e)}
                      >
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>FPD C-ARM</span>
                      </Link>
                      <Link 
                        to="/radiography-systems#dreamcmtdual" 
                        className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem"
                        onClick={(e) => handleHashNavigation('/radiography-systems#dreamcmtdual', e)}
                      >
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>DReam CMT-Dual (Ceiling Type, Dual Detector)</span>
                      </Link>
                      <Link 
                        to="/radiography-systems#dreamcmtsingle" 
                        className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem"
                        onClick={(e) => handleHashNavigation('/radiography-systems#dreamcmtsingle', e)}
                      >
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>DReam CMT-Single (Ceiling Type, Single Detector)</span>
                      </Link>
                      <Link 
                        to="/radiography-systems#dreamfloormounteddr" 
                        className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem"
                        onClick={(e) => handleHashNavigation('/radiography-systems#dreamfloormounteddr', e)}
                      >
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>DReam Floor Mounted DR</span>
                      </Link>
                      <Link 
                        to="/radiography-systems#addonis100hf150hfmobilexray" 
                        className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem"
                        onClick={(e) => handleHashNavigation('/radiography-systems#addonis100hf150hfmobilexray', e)}
                      >
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>ADONIS 100HF/150HF Mobile X-Ray</span>
                      </Link>
                      <Link 
                        to="/radiography-systems#adonishfradiographicsystems300ma500ma600ma" 
                        className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem"
                        onClick={(e) => handleHashNavigation('/radiography-systems#adonishfradiographicsystems300ma500ma600ma', e)}
                      >
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>ADONIS HF Radiographic Systems 300mA / 500mA / 600mA</span>
                      </Link>
                    </div>
                  </div>

                  <div className="relative group/sub">
                    <button className="flex items-center w-full text-left px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 group/item">
                      <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100 transition-all duration-300 flex-shrink-0">→</span>
                      <span className="truncate">Portable Imaging</span>
                    </button>
                    <div className="absolute left-full top-0 w-80 bg-white border border-gray-200 shadow-lg rounded-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 transform group-hover/sub:translate-x-0 -translate-x-2 overflow-hidden z-50">
                      <Link 
                        to="/portable-x-ray-solutions#mini90pointofcarexray" 
                        className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem"
                        onClick={(e) => handleHashNavigation('/portable-x-ray-solutions#mini90pointofcarexray', e)}
                      >
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>Mini 90 Point-of-Care X-Ray</span>
                      </Link>
                      <Link 
                        to="/portable-x-ray-solutions#adonishfmobiledr" 
                        className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem"
                        onClick={(e) => handleHashNavigation('/portable-x-ray-solutions#adonishfmobiledr', e)}
                      >
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>ADONIS HF Mobile DR</span>
                      </Link>
                    </div>
                  </div>

                  <div className="relative group/sub">
                    <button className="flex items-start w-full text-left px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 group/item">
                      <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100 transition-all duration-300 flex-shrink-0 mt-0.5">→</span>
                      <span className="break-words whitespace-normal leading-tight">Women's Health (Mammography)</span>
                    </button>
                    <div className="absolute left-full top-0 w-80 bg-white border border-gray-200 shadow-lg rounded-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 transform group-hover/sub:translate-x-0 -translate-x-2 overflow-hidden z-50">
                      <Link 
                        to="/mammography-systems#pinkviewdrplus" 
                        className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem"
                        onClick={(e) => handleHashNavigation('/mammography-systems#pinkviewdrplus', e)}
                      >
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>PINKVIEW DR PLUS (Digital Mammography)</span>
                      </Link>
                      <Link 
                        to="/mammography-systems#pinkviewrt" 
                        className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem"
                        onClick={(e) => handleHashNavigation('/mammography-systems#pinkviewrt', e)}
                      >
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>PINKVIEW RT (Analog Mammography)</span>
                      </Link>
                    </div>
                  </div>

                  <div className="relative group/sub">
                    <button className="flex items-center w-full text-left px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 group/item">
                      <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100 transition-all duration-300 flex-shrink-0">→</span>
                      <span className="truncate">Detector Technology</span>
                    </button>
                    <div className="absolute left-full top-0 w-80 bg-white border border-gray-200 shadow-lg rounded-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 transform group-hover/sub:translate-x-0 -translate-x-2 overflow-hidden z-50">
                      <Link 
                        to="/flat-panel-detectors#glassfreeflatpaneldetector" 
                        className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem"
                        onClick={(e) => handleHashNavigation('/flat-panel-detectors#glassfreeflatpaneldetector', e)}
                      >
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>Glass-Free Flat Panel Detector</span>
                      </Link>
                      <Link 
                        to="/flat-panel-detectors#retrofitmammographypanel" 
                        className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem"
                        onClick={(e) => handleHashNavigation('/flat-panel-detectors#retrofitmammographypanel', e)}
                      >
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>Retrofit Mammography Panel</span>
                      </Link>
                    </div>
                  </div>

                  <div className="relative group/sub">
                    <button className="flex items-center w-full text-left px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 group/item">
                      <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100 transition-all duration-300 flex-shrink-0">→</span>
                      <span className="truncate">Imaging Support Solutions</span>
                    </button>
                    <div className="absolute left-full top-0 w-96 bg-white border border-gray-200 shadow-lg rounded-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 transform group-hover/sub:translate-x-0 -translate-x-2 overflow-hidden z-50">
                      <Link 
                        to="/imaging-accessories#dmdd2000xrayfilmdigitizer" 
                        className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem"
                        onClick={(e) => handleHashNavigation('/imaging-accessories#dmdd2000xrayfilmdigitizer', e)}
                      >
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>DMD D 2000, X-Ray Film Digitizer</span>
                      </Link>
                      <Link 
                        to="/imaging-accessories#imagedisplaymonitors" 
                        className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem"
                        onClick={(e) => handleHashNavigation('/imaging-accessories#imagedisplaymonitors', e)}
                      >
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>Image Display Monitors</span>
                      </Link>
                      <Link 
                        to="/imaging-accessories#ctmrmammographmultimodalityworkstations" 
                        className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem"
                        onClick={(e) => handleHashNavigation('/imaging-accessories#ctmrmammographmultimodalityworkstations', e)}
                      >
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>CT/MR/Mammograph Multi-Modality Workstations</span>
                      </Link>
                      <Link 
                        to="/imaging-accessories#cddvdpublishers" 
                        className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem"
                        onClick={(e) => handleHashNavigation('/imaging-accessories#cddvdpublishers', e)}
                      >
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>CD/DVD Publishers</span>
                      </Link>
                      <Link 
                        to="/imaging-accessories#mededrive" 
                        className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem"
                        onClick={(e) => handleHashNavigation('/imaging-accessories#mededrive', e)}
                      >
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>MedE Drive for Patient Data Storage</span>
                      </Link>
                    </div>
                  </div>

                  <div className="relative group/sub">
                    <button className="flex items-center w-full text-left px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 group/item">
                      <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100 transition-all duration-300 flex-shrink-0">→</span>
                      <span className="truncate">Advanced MRI Imaging</span>
                    </button>
                    <div className="absolute left-full top-0 w-80 bg-white border border-gray-200 shadow-lg rounded-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 transform group-hover/sub:translate-x-0 -translate-x-2 overflow-hidden z-50">
                      <a href="https://anamaya.3imedtech.com/" target="_blank" rel="noopener noreferrer" className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem">
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>Anamaya</span>
                      </a>
                      <Link 
                        to="/refurbished-mri-systems#philipsachieva30teslaxseries" 
                        className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem"
                        onClick={(e) => handleHashNavigation('/refurbished-mri-systems#philipsachieva30teslaxseries', e)}
                      >
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>Philips Achieva 3.0Tesla X-Series</span>
                      </Link>
                      <Link 
                        to="/refurbished-mri-systems#gesignahdxt15tesla" 
                        className="flex items-center px-6 py-3 text-[#0E2B5C] hover:bg-blue-50 hover:text-[#0E2B5C] transition-all duration-300 text-sm group/subitem"
                        onClick={(e) => handleHashNavigation('/refurbished-mri-systems#gesignahdxt15tesla', e)}
                      >
                        <span className="mr-2 text-[#0E2B5C] -translate-x-4 opacity-0 group-hover/subitem:translate-x-0 group-hover/subitem:opacity-100 transition-all duration-300">→</span>
                        <span>GE Signa HDxt 1.5Tesla</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link 
                to="/contact" 
                className="relative text-[#0E2B5C] hover:text-[#7AB730] font-medium transition-colors duration-300 whitespace-nowrap group"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onMouseEnter={(e) => {
                  const line = document.querySelector('.nav-orange-line') as HTMLElement;
                  if (line) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const container = e.currentTarget.closest('.max-w-\\[1920px\\]') || document.querySelector('.max-w-\\[1920px\\]');
                    const containerRect = container?.getBoundingClientRect();
                    if (containerRect) {
                      line.style.width = `${rect.width}px`;
                      line.style.transform = `translateX(${rect.left - containerRect.left}px)`;
                    }
                  }
                }}
                onMouseLeave={() => {
                  const line = document.querySelector('.nav-orange-line') as HTMLElement;
                  if (line) {
                    line.style.width = '0';
                  }
                }}
              >
                Contact Us
              </Link>
            </nav>

            {/* Right Side */}
            <div className="hidden lg:flex items-center space-x-6 relative" style={{ minWidth: isSearchOpen ? '400px' : 'auto' }}>
              {/* Have any questions section - slides out to left when search is open */}
              {!isSearchOpen && (
                <>
                  <div className="flex items-center space-x-3 whitespace-nowrap">
                    {/* Phone Icon - CMS or Local Asset */}
                    <img 
                      src={headerData?.phoneIcon || ASSETS.ICONS.PHONE} 
                      alt="icon" 
                      className="w-10 h-10" 
                    />
                    <div className="text-sm">
                      <div className="text-gray-600">Have any questions?</div>
                      <a 
                        href={`tel:${(headerData?.phone || '+91 94440 26307').replace(/\s/g, '')}`} 
                        className="text-[#7AB730] font-semibold whitespace-nowrap"
                        onClick={() => {
                          try {
                            trackEvent('contact_click', 'contact', 'phone_header');
                          } catch {}
                        }}
                      >
                        {headerData?.phone || '+91 94440 26307'}
                      </a>
                    </div>
                  </div>
                </>
              )}
              
              {/* Search bar - slides in from right when open */}
              {isSearchOpen && (
                <div className="flex items-center w-full animate-in">
                  <form className="flex items-center w-full" onSubmit={(e) => { 
                    e.preventDefault();
                    const input = e.currentTarget.querySelector('input[type="search"]') as HTMLInputElement;
                    if (input?.value) {
                      navigate(`/search?s=${encodeURIComponent(input.value)}`);
                    } else {
                      navigate('/search');
                    }
                  }}>
                    <input
                      type="search"
                      placeholder="Search …"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:border-[#7AB730] text-sm shadow-sm"
                      autoFocus={true}
                    />
                    <button 
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r transition-colors"
                      aria-label="Close search"
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700 cursor-pointer"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 bg-current transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      <div className={`fixed top-0 right-0 bottom-0 w-80 bg-white z-50 lg:hidden transform transition-transform duration-300 overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-gray-700 cursor-pointer"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className="block h-0.5 bg-current rotate-45 translate-y-2"></span>
              <span className="block h-0.5 bg-current -rotate-45 -translate-y-2"></span>
            </div>
          </button>

          <div className="mt-12 space-y-4">
            <Link 
              to="/" 
              className="block text-gray-700 hover:text-[#7AB730] font-medium" 
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Home
            </Link>

            <div>
              <button
                onClick={() => toggleDropdown('about')}
                className="w-full flex items-center justify-between text-gray-700 hover:text-[#7AB730] font-medium cursor-pointer"
              >
                About 3i MedTech
                <i className={`ri-arrow-${openDropdown === 'about' ? 'up' : 'down'}-s-line`}></i>
              </button>
              {openDropdown === 'about' && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link 
                    to="/about" 
                    className="block text-gray-600 hover:text-[#7AB730]" 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    About
                  </Link>
                  <Link 
                    to="/mission-vision-and-values" 
                    className="block text-gray-600 hover:text-[#7AB730]" 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Mission &amp; Vision
                  </Link>
                  <Link 
                    to="/why-choose-us" 
                    className="block text-gray-600 hover:text-[#7AB730]" 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Why Choose Us
                  </Link>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleDropdown('specialties')}
                className="w-full flex items-center justify-between text-gray-700 hover:text-[#7AB730] font-medium cursor-pointer"
              >
                Specialties
                <i className={`ri-arrow-${openDropdown === 'specialties' ? 'up' : 'down'}-s-line`}></i>
              </button>
              {openDropdown === 'specialties' && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link 
                    to="/radiography-systems" 
                    className="block text-gray-600 hover:text-[#7AB730]" 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    General Radiography
                  </Link>
                  <Link 
                    to="/portable-x-ray-solutions" 
                    className="block text-gray-600 hover:text-[#7AB730]" 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Portable Imaging
                  </Link>
                  <Link 
                    to="/mammography-systems" 
                    className="block text-gray-600 hover:text-[#7AB730]" 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Women's Health
                  </Link>
                  <Link 
                    to="/flat-panel-detectors" 
                    className="block text-gray-600 hover:text-[#7AB730]" 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Detector Technology
                  </Link>
                  <Link 
                    to="/refurbished-mri-systems" 
                    className="block text-gray-600 hover:text-[#7AB730]" 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Advanced MRI Imaging
                  </Link>
                </div>
              )}
            </div>

            <Link 
              to="/contact" 
              className="block text-gray-700 hover:text-[#7AB730] font-medium" 
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
