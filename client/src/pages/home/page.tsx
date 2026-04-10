import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { ASSETS } from '../../constants/assets';

const HomePage = () => {
  // CMS Data State
  const [homeHero, setHomeHero] = useState<any>(null);
  const [homeAboutSection, setHomeAboutSection] = useState<any>(null);
  const [homeImageBoxes, setHomeImageBoxes] = useState<any[]>([]);
  const [homeCommitment, setHomeCommitment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch CMS Data
  const fetchHomeHero = async () => {
    try {
      const res = await fetch('/api/cms/home-page/hero');
      if (res.ok) {
        const json = await res.json();
        setHomeHero(json?.data || json || null);
      }
    } catch (error) {
      console.error('Error fetching home hero:', error);
    }
  };

  const fetchHomeAboutSection = async () => {
    try {
      const res = await fetch('/api/cms/home-page/about-section');
      if (res.ok) {
        const json = await res.json();
        setHomeAboutSection(json?.data || json || null);
      }
    } catch (error) {
      console.error('Error fetching home about section:', error);
    }
  };

  const fetchHomeImageBoxes = async () => {
    try {
      const res = await fetch('/api/cms/home-page/image-boxes');
      if (res.ok) {
        const json = await res.json();
        const boxes = Array.isArray(json?.data) ? json.data : json;
        setHomeImageBoxes((boxes || []).slice().sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
      }
    } catch (error) {
      console.error('Error fetching home image boxes:', error);
    }
  };

  const fetchHomeCommitment = async () => {
    try {
      const res = await fetch('/api/cms/home-page/commitment');
      if (res.ok) {
        const json = await res.json();
        setHomeCommitment(json?.data || json || null);
      }
    } catch (error) {
      console.error('Error fetching home commitment:', error);
    }
  };

  // Track which sections have already been reported to GA to avoid duplicates
  const trackedSectionsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Smooth scroll to top on page load
    if (window.pageYOffset > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');

          // Section view tracking via data-ga-section attribute
          const sectionId = (entry.target as HTMLElement).getAttribute('data-ga-section');
          if (sectionId && !trackedSectionsRef.current.has(sectionId)) {
            trackedSectionsRef.current.add(sectionId);
            try {
              // Only send high-level content metadata, no PII
              trackEvent('section_view', 'content', sectionId);
            } catch {
              // Analytics failures should never break UX
            }
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    // Fetch CMS data
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchHomeHero(),
          fetchHomeAboutSection(),
          fetchHomeImageBoxes(),
          fetchHomeCommitment()
        ]);
      } catch (error) {
        console.error('Error fetching home page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Listen for data changes from Dashboard
    const handleHomeDataChange = () => {
      fetchData();
    };

    window.addEventListener('homeDataChanged', handleHomeDataChange);
    window.addEventListener('homeHeroChanged', fetchHomeHero);
    window.addEventListener('homeAboutSectionChanged', fetchHomeAboutSection);
    window.addEventListener('homeImageBoxesChanged', fetchHomeImageBoxes);
    window.addEventListener('homeCommitmentChanged', fetchHomeCommitment);

    return () => {
      observer.disconnect();
      window.removeEventListener('homeDataChanged', handleHomeDataChange);
      window.removeEventListener('homeHeroChanged', fetchHomeHero);
      window.removeEventListener('homeAboutSectionChanged', fetchHomeAboutSection);
      window.removeEventListener('homeImageBoxesChanged', fetchHomeImageBoxes);
      window.removeEventListener('homeCommitmentChanged', fetchHomeCommitment);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      {homeHero?.isActive !== false && (
        <section className="relative h-[400px] mt-20">
        <div className="absolute inset-0">
            {/* Hero Banner - CMS or Fallback */}
          <img
              src={homeHero?.backgroundImage || ASSETS.BANNERS.HOME_HERO}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0066A1]/40 to-[#7AB730]/30"></div>
        </div>
          <div className="relative h-full max-w-[1880px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-center lg:items-center lg:justify-between">
            {/* Mobile: Stacked and Centered, Desktop: Side by Side */}
            <div className="flex flex-col lg:contents items-center justify-center w-full">
              {/* Left Side - Title */}
              <div className="max-w-2xl lg:flex-1 text-center lg:text-left">
                <h1 
                  className="text-white text-3xl lg:text-4xl xl:text-5xl font-medium leading-tight"
                  dangerouslySetInnerHTML={{
                    __html: homeHero?.title 
                      ? homeHero.title.replace(/\n/g, '<br />') 
                      : 'Affordable Diagnostic<br />Imaging Solutions'
                  }}
                />
              </div>
              {/* Right Side - New Product Badge */}
              {(homeHero?.badgeImage || ASSETS.BANNERS.NEW_PRODUCT_BADGE) && (
                <div className="flex-shrink-0 mt-4 lg:mt-0 lg:ml-8">
                  <a
                    href={homeHero?.badgeLink || ASSETS.EXTERNAL.ANAMAYA_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block cursor-pointer animate-flicker"
              >
                    <img
                      src={homeHero?.badgeImage || ASSETS.BANNERS.NEW_PRODUCT_BADGE}
                      alt={homeHero?.badgeAltText || 'New Product'}
                      className="w-64 lg:w-72 h-auto hover:scale-105 transition-transform duration-300"
                />
              </a>
            </div>
              )}
            </div>
        </div>
      </section>
      )}

      {/* About Section */}
      {homeAboutSection?.isActive !== false && (
        <section 
          className="py-14 pb-24 lg:pb-32 animate-on-scroll" 
          data-ga-section="home_about_section"
          style={{ backgroundColor: homeAboutSection?.backgroundColor || '#1E4C84' }}
        >
        <div className="max-w-[1880px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h6 
                  className="font-semibold uppercase tracking-wider mb-4"
                  style={{
                    fontSize: '23px',
                    color: '#7dc244',
                    textAlign: 'left'
                  }}
                >
                  {homeAboutSection?.label || 'About Us'}
                </h6>
                <h3 className="text-3xl lg:text-4xl font-medium text-white mb-6 leading-tight">
                  {homeAboutSection?.title || 'Your Partner for Clinically Relevant and Viable Imaging Technologies'}
              </h3>
            </div>
            <div>
                <p className="text-white text-lg leading-relaxed">
                  {homeAboutSection?.description || 'As a dedicated healthcare technology provider, 3i MedTech is committed to revolutionizing diagnostic imaging. We specialize in developing innovative and affordable solutions, including Digital X-Rays, MRI machines, and Digital C-Arms, designed to enhance patient care and improve healthcare outcomes. By leveraging advanced technologies and focusing on customer convenience, product life cycle cost management, exceptional service, and faster turnaround times, we aim to be a trusted partner for healthcare providers worldwide.'}
              </p>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Image Boxes Section */}
      {(homeImageBoxes.length > 0 || homeImageBoxes.length === 0) && (
        <section className="relative py-0 animate-on-scroll" data-ga-section="home_image_boxes">
          {/* Half Blue, Half Grey Background */}
          <div className="absolute inset-0">
            <div className="h-1/2 bg-[#2879B6]"></div>
            <div className="h-1/2 bg-gray-100"></div>
          </div>
          
          <div className="relative max-w-[1880px] mx-auto px-6 lg:px-12 py-14">
            {homeImageBoxes.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-12 md:-mt-20">
                  {homeImageBoxes
                    .filter((box: any) => box.isActive !== false)
                    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                    .map((box: any, idx: number) => (
                    <div 
                      key={box.id || idx} 
                      className="group relative cursor-pointer"
                      data-aos="fade-up"
                      data-aos-delay={idx * 100}
                    >
                      {/* Background Image with Gradient Overlay */}
                      <div className="relative h-96 overflow-hidden rounded-lg">
                        {box.image && (
                          <img
                            src={box.image}
                            alt={box.title || `Box ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#7AB730]/40 to-[#E6662F]/40 transition-opacity duration-500 group-hover:opacity-0"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 transition-opacity duration-500 group-hover:opacity-100"></div>
                      </div>
                      
                      {/* White Card - Overlaps both blue and grey sections */}
                      <div className="absolute bottom-0 left-0 right-0 mx-4 mb-4">
                        <div className="bg-white rounded-lg shadow-xl p-6 overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-6 group-hover:shadow-2xl min-h-[150px]">
                          {/* Label - Scrolls up on hover */}
                          {box.label && (
                            <div className="relative transition-transform duration-500 ease-in-out group-hover:-translate-y-full mb-2">
                              <h6 className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#2879B6' }}>
                                {box.label}
                              </h6>
                            </div>
                          )}
                          
                          {/* Title - Always visible */}
                          <h2 className="text-xl font-bold leading-tight mb-3" style={{ color: '#0E2B5C' }}>
                            {box.title || `Box ${idx + 1}`}
                          </h2>
                          
                          {/* Description - Always visible */}
                          {box.description && box.description !== box.title && (
                            <p className="text-gray-700 text-sm leading-relaxed mb-4">
                              {box.description}
                            </p>
                          )}
                          
                          {/* Link - Appears on hover */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {box.link && (
                              box.link.startsWith('http') || box.link.startsWith('//') ? (
                                <a
                                  href={box.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center font-semibold transition-all duration-300 group/link"
                                  style={{ color: '#1dc2ef' }}
                                  onMouseEnter={(e) => e.currentTarget.style.color = '#7AB730'}
                                  onMouseLeave={(e) => e.currentTarget.style.color = '#1dc2ef'}
                                >
                                  <span>{box.linkText || 'Discover Now'}</span>
                                  <span className="ml-2">→</span>
                                </a>
                              ) : (
                                <Link
                                  to={box.link}
                                  className="inline-flex items-center font-semibold transition-all duration-300 group/link"
                                  style={{ color: '#1dc2ef' }}
                                  onMouseEnter={(e) => e.currentTarget.style.color = '#7AB730'}
                                  onMouseLeave={(e) => e.currentTarget.style.color = '#1dc2ef'}
                                >
                                  <span>{box.linkText || 'Discover Now'}</span>
                                  <span className="ml-2">→</span>
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Footer Text Below Image Boxes */}
                <div className="text-center mt-12">
                  <p 
                    className="text-lg"
                    style={{
                      fontFamily: 'Rubik, sans-serif',
                      color: '#333842'
                    }}
                  >
                    Full-service provider of medical technology solutions.{' '}
                    <Link
                      to="/about"
                      className="underline hover:no-underline transition-all duration-300"
                      style={{
                        color: '#0E2B5C',
                        textDecoration: 'underline'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#2879B6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#0E2B5C';
                      }}
                    >
                      Explore our Comprehensive Medical Solutions
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              // Fallback static content if no CMS data
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-12 md:-mt-20">
                  <div 
                    className="group relative cursor-pointer"
                    data-aos="fade-up"
                    data-aos-delay="0"
                  >
                    <div className="relative h-96 overflow-hidden rounded-lg">
                <img
                  src={ASSETS.BANNERS.IMAGING_EXPERTS}
                  alt="Imaging Equipment Experts"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#7AB730]/40 to-[#E6662F]/40 transition-opacity duration-500 group-hover:opacity-0"></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 transition-opacity duration-500 group-hover:opacity-100"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 mx-4 mb-4">
                      <div className="bg-white rounded-lg shadow-xl p-6 overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-6 group-hover:shadow-2xl min-h-[150px]">
                        {/* Label - Scrolls up on hover */}
                        <div className="relative transition-transform duration-500 ease-in-out group-hover:-translate-y-full mb-2">
                          <h6 className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#2879B6' }}>
                            IMAGING EQUIPMENT EXPERTS
                          </h6>
                        </div>
                        
                        {/* Title - Always visible */}
                        <h2 className="text-xl font-bold leading-tight mb-3" style={{ color: '#0E2B5C' }}>
                          Core competency in manufacturing diagnostic imaging equipment
                        </h2>
                        
                        {/* Link - Appears on hover */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <a
                            href="/about"
                            className="inline-flex items-center font-semibold transition-all duration-300"
                            style={{ color: '#1dc2ef' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#7AB730'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#1dc2ef'}
                          >
                            <span>Discover Now</span>
                            <span className="ml-2">→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div 
                    className="group relative cursor-pointer"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <div className="relative h-96 overflow-hidden rounded-lg">
                <img
                  src={ASSETS.BANNERS.TRUSTED_PARTNER}
                  alt="Trusted Healthcare Partner"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#7AB730]/40 to-[#E6662F]/40 transition-opacity duration-500 group-hover:opacity-0"></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 transition-opacity duration-500 group-hover:opacity-100"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 mx-4 mb-4">
                      <div className="bg-white rounded-lg shadow-xl p-6 overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-6 group-hover:shadow-2xl min-h-[150px]">
                        {/* Label - Scrolls up on hover */}
                        <div className="relative transition-transform duration-500 ease-in-out group-hover:-translate-y-full mb-2">
                          <h6 className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#2879B6' }}>
                            TRUSTED HEALTHCARE PARTNER
                          </h6>
                        </div>
                        
                        {/* Title - Always visible */}
                        <h2 className="text-xl font-bold leading-tight mb-3" style={{ color: '#0E2B5C' }}>
                          Strong reputation in the competitive healthcare market
                        </h2>
                        
                        {/* Link - Appears on hover */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <a
                            href="/about"
                            className="inline-flex items-center font-semibold transition-all duration-300"
                            style={{ color: '#1dc2ef' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#7AB730'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#1dc2ef'}
                          >
                            <span>Learn More</span>
                            <span className="ml-2">→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div 
                    className="group relative cursor-pointer"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <div className="relative h-96 overflow-hidden rounded-lg">
                <img
                  src={ASSETS.BANNERS.HEALTHCARE_ACCESS}
                  alt="Enhancing Healthcare Access"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#7AB730]/40 to-[#E6662F]/40 transition-opacity duration-500 group-hover:opacity-0"></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 transition-opacity duration-500 group-hover:opacity-100"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 mx-4 mb-4">
                      <div className="bg-white rounded-lg shadow-xl p-6 overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-6 group-hover:shadow-2xl min-h-[150px]">
                        {/* Label - Scrolls up on hover */}
                        <div className="relative transition-transform duration-500 ease-in-out group-hover:-translate-y-full mb-2">
                          <h6 className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#2879B6' }}>
                            ENHANCING HEALTHCARE ACCESS
                          </h6>
                        </div>
                        
                        {/* Title - Always visible */}
                        <h2 className="text-xl font-bold leading-tight mb-3" style={{ color: '#0E2B5C' }}>
                          Commitment to healthcare efficiency and accessibility
                        </h2>
                        
                        {/* Link - Appears on hover */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <a
                            href="/about"
                            className="inline-flex items-center font-semibold transition-all duration-300"
                            style={{ color: '#1dc2ef' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#7AB730'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#1dc2ef'}
                          >
                            <span>Read More</span>
                            <span className="ml-2">→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
          </div>
                {/* Footer Text Below Image Boxes */}
                <div className="text-center mt-12">
                  <p 
                    className="text-lg"
                    style={{
                      fontFamily: 'Rubik, sans-serif',
                      color: '#333842'
                    }}
                  >
                    Full-service provider of medical technology solutions.{' '}
                    <Link
                      to="/about"
                      className="underline hover:no-underline transition-all duration-300"
                      style={{
                        color: '#0E2B5C',
                        textDecoration: 'underline'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#2879B6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#0E2B5C';
                      }}
                    >
                      Explore our Comprehensive Medical Solutions
                    </Link>
                  </p>
          </div>
              </>
            )}
        </div>
      </section>
      )}

      {/* Commitment Section */}
      {homeCommitment?.isActive !== false && (
        <section 
          className="pb-14 relative overflow-hidden" 
          data-ga-section="home_commitment_section"
          style={{ backgroundColor: homeCommitment?.backgroundColor || '#F9FAFB' }}
          data-aos="fade-in"
          data-aos-duration="200"
        >
          {/* Background Animated Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full animate-pulse" data-aos="zoom-in" data-aos-delay="300" data-aos-duration="2000"></div>
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-green-500/5 rounded-full animate-pulse" data-aos="zoom-in" data-aos-delay="600" data-aos-duration="2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/3 rounded-full animate-pulse" data-aos="zoom-in" data-aos-delay="900" data-aos-duration="2000"></div>
          </div>

        <div className="max-w-[1880px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16" data-aos="slide-up" data-aos-duration="1000">
              <h6 
                className="font-semibold uppercase tracking-wider mb-4"
                style={{ 
                  fontSize: '10px',
                  color: '#627792',
                  textAlign: 'center'
                }}
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="800"
              >
                {homeCommitment?.label || 'Our Commitment'}
              </h6>
            <h3 
              className="font-medium"
              style={{ 
                fontFamily: 'Rubik, sans-serif',
                fontWeight: 500,
                color: '#2879b6',
                fontSize: '1.875rem',
                lineHeight: '1.2em'
              }}
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="1000"
            >
                {homeCommitment?.title || 'Redefining Healthcare Through Innovation'}
            </h3>
            
            {/* Animated Divider */}
            <div className="flex justify-center mt-3" data-aos="scale-in" data-aos-delay="600" data-aos-duration="800">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#2879B6', animationDelay: '0s' }}></div>
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#7AB730', animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#E6662F', animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>

            {homeCommitment?.cards ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(() => {
                  const cards = typeof homeCommitment.cards === 'string' 
                    ? JSON.parse(homeCommitment.cards) 
                    : homeCommitment.cards;
                  return cards
                    .filter((card: any) => card.isActive !== false)
                    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                    .map((card: any, idx: number) => {
                      const staggerDelay = idx * 100;
                      return (
                    <div 
                      key={idx} 
                      className="group relative rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-6 hover:rotate-1 cursor-pointer overflow-hidden border border-gray-100" 
                      data-aos="fade-up"
                      data-aos-delay={staggerDelay}
                      data-aos-duration="800"
                      data-aos-easing="ease-out-cubic"
                      style={{ 
                        opacity: 1, 
                        transform: 'translateY(0)', 
                        animation: 'fadeInUp 0.8s ease-out forwards',
                        backgroundColor: '#F1F1F1',
                        padding: '30px',
                        color: '#333842',
                        fontFamily: 'Rubik, sans-serif',
                        fontSize: '16px'
                      }}
                    >
                      {/* Enhanced Background Effects */}
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-20 transition-all duration-700 rounded-full blur-xl" 
                           style={{ background: 'radial-gradient(circle, #2879B6, #2879B688)' }}>
                      </div>
                      
                      {/* Floating Particles Effect */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: '#2879B6', animationDuration: '2s' }}></div>
                        <div className="absolute bottom-8 left-6 w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: '#2879B6', animationDelay: '0.5s', animationDuration: '3s' }}></div>
                        <div className="absolute top-1/2 left-4 w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: '#2879B6', animationDelay: '1s', animationDuration: '2.5s' }}></div>
                      </div>
                      
                      <div className="relative z-10">
                      <div className="flex flex-col items-center text-center">
                        <h4 
                          className="mb-6 group-hover:scale-105 transition-all duration-500"
                          style={{
                            fontFamily: 'Rubik, sans-serif',
                            fontWeight: 500,
                            color: '#2879B6',
                            fontSize: '1.25rem',
                            lineHeight: '1.35em'
                          }}
                        >
                          {card.title || `Card ${idx + 1}`}
                        </h4>
                        {card.icon && (
                          <div className="w-24 h-24 mb-6 flex items-center justify-center relative" style={{ transformOrigin: 'center bottom' }}>
                            {/* Icon with tilt effect, magnification, and enhanced drop shadow */}
                            <img
                              src={card.icon}
                              alt={card.title || `Icon ${idx + 1}`}
                              className="w-full h-full object-contain relative z-10 transition-transform duration-500 ease-out group-hover:rotate-6 group-hover:scale-150"
                              style={{
                                filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35))',
                                transformOrigin: 'center bottom',
                              }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96"%3E%3Crect fill="%23f3f4f6" width="96" height="96" rx="8"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" fill="%239ca3af" font-family="Arial" font-size="10"%3EIcon not found%3C/text%3E%3C/svg%3E';
                              }}
                            />
                            {/* Enhanced shadow below icon that shrinks on hover */}
                            <div 
                              className="absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out group-hover:scale-90"
                              style={{
                                width: '80px',
                                height: '20px',
                                background: 'rgba(0, 0, 0, 0.25)',
                                borderRadius: '50%',
                                filter: 'blur(10px)',
                              }}
                            >
                            </div>
                          </div>
                        )}
                        <p 
                          className="mb-6 group-hover:text-gray-700 transition-colors duration-500"
                          style={{
                            fontFamily: 'Rubik, sans-serif',
                            fontStyle: 'normal',
                            color: '#333842',
                            fontSize: '1rem',
                            lineHeight: '1.625em'
                          }}
                        >
                          {card.description || ''}
                        </p>
                        {card.link && (
                          card.link.startsWith('http') || card.link.startsWith('//') ? (
                            <a
                              href={card.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative inline-flex items-center px-6 py-3 rounded font-medium transition-all duration-500 cursor-pointer whitespace-nowrap group/link overflow-hidden"
                              style={{ color: '#2879B6' }}
                            >
                              <span className="relative z-10 flex items-center">
                                {card.linkText || 'Learn More'} <i className="ri-arrow-right-line ml-2 group-hover/link:translate-x-1 transition-transform"></i>
                              </span>
                              <span className="absolute inset-0 bg-[#E6662F] transform translate-y-full group-hover/link:translate-y-0 transition-transform duration-500 ease-out"></span>
                              <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover/link:opacity-100 transition-opacity duration-500 z-20">
                                {card.linkText || 'Learn More'} <i className="ri-arrow-right-line ml-2 translate-x-1 transition-transform"></i>
                              </span>
                            </a>
                          ) : (
                            <Link
                              to={card.link}
                              className="relative inline-flex items-center px-6 py-3 rounded font-medium transition-all duration-500 cursor-pointer whitespace-nowrap group/link overflow-hidden"
                              style={{ color: '#2879B6' }}
                              onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                            >
                              <span className="relative z-10 flex items-center">
                                {card.linkText || 'Learn More'} <i className="ri-arrow-right-line ml-2 group-hover/link:translate-x-1 transition-transform"></i>
                              </span>
                              <span className="absolute inset-0 bg-[#E6662F] transform translate-y-full group-hover/link:translate-y-0 transition-transform duration-500 ease-out"></span>
                              <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover/link:opacity-100 transition-opacity duration-500 z-20">
                                {card.linkText || 'Learn More'} <i className="ri-arrow-right-line ml-2 translate-x-1 transition-transform"></i>
                              </span>
                            </Link>
                          )
                        )}
                      </div>
                      </div>
                      
                      {/* Enhanced Hover Border Effect */}
                      <div className="absolute inset-0 border-2 border-transparent rounded-lg transition-all duration-700 opacity-0 group-hover:opacity-30 group-hover:scale-105" 
                           style={{ borderColor: '#2879B6', filter: 'blur(1px)' }}>
                      </div>
                      
                      {/* Corner Accent */}
                      <div className="absolute top-0 left-0 w-0 h-0 border-t-4 border-l-4 border-transparent group-hover:border-t-8 group-hover:border-l-8 transition-all duration-500 rounded-tl-lg" 
                           style={{ borderTopColor: '#2879B6', borderLeftColor: '#2879B6' }}>
                      </div>
                    </div>
                    );
                  })
                })()}
              </div>
            ) : (
              // Fallback static content
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              className="group relative rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-6 hover:rotate-1 cursor-pointer overflow-hidden border border-gray-100"
              data-aos="fade-up"
              data-aos-delay="0"
              data-aos-duration="800"
              data-aos-easing="ease-out-cubic"
              style={{
                backgroundColor: '#F1F1F1',
                padding: '30px',
                color: '#333842',
                fontFamily: 'Rubik, sans-serif',
                fontSize: '16px'
              }}
            >
              {/* Enhanced Background Effects */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-20 transition-all duration-700 rounded-full blur-xl" 
                   style={{ background: 'radial-gradient(circle, #2879B6, #2879B688)' }}>
              </div>
              
              {/* Floating Particles Effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: '#2879B6', animationDuration: '2s' }}></div>
                <div className="absolute bottom-8 left-6 w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: '#2879B6', animationDelay: '0.5s', animationDuration: '3s' }}></div>
                <div className="absolute top-1/2 left-4 w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: '#2879B6', animationDelay: '1s', animationDuration: '2.5s' }}></div>
              </div>
              
              <div className="relative z-10">
              <div className="flex flex-col items-center text-center">
                <h4 
                  className="mb-6 group-hover:scale-105 transition-all duration-500"
                  style={{
                    fontFamily: 'Rubik, sans-serif',
                    fontWeight: 500,
                    color: '#2879B6',
                    fontSize: '1.25rem',
                    lineHeight: '1.35em'
                  }}
                >
                  Affordable Excellence
                </h4>
                <div className="w-24 h-24 mb-6 flex items-center justify-center relative" style={{ transformOrigin: 'center bottom' }}>
                  <img
                    src={ASSETS.ICONS.AFFORDABLE_EXCELLENCE}
                    alt="Affordable Excellence"
                    className="w-full h-full object-contain relative z-10 transition-transform duration-500 ease-out group-hover:rotate-6 group-hover:scale-150"
                    style={{
                      filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35))',
                      transformOrigin: 'center bottom',
                    }}
                  />
                  {/* Enhanced shadow that shrinks on hover */}
                  <div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out group-hover:scale-90"
                    style={{
                      width: '80px',
                      height: '20px',
                      background: 'rgba(0, 0, 0, 0.25)',
                      borderRadius: '50%',
                      filter: 'blur(10px)',
                    }}
                  >
                  </div>
                </div>
                <p 
                  className="mb-6 group-hover:text-gray-700 transition-colors duration-500"
                  style={{
                    fontFamily: 'Rubik, sans-serif',
                    fontStyle: 'normal',
                    color: '#333842',
                    fontSize: '1rem',
                    lineHeight: '1.625em'
                  }}
                >
                  Delivering world-class medical technology at accessible prices
                </p>
                <Link
                  to="/about"
                  className="relative inline-flex items-center px-6 py-3 rounded font-medium transition-all duration-500 cursor-pointer whitespace-nowrap group/link overflow-hidden"
                  style={{ color: '#2879B6' }}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    Explore Our Products <i className="ri-arrow-right-line ml-2 group-hover/link:translate-x-1 transition-transform"></i>
                  </span>
                  <span className="absolute inset-0 bg-[#E6662F] transform translate-y-full group-hover/link:translate-y-0 transition-transform duration-500 ease-out"></span>
                  <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover/link:opacity-100 transition-opacity duration-500 z-20">
                    Explore Our Products <i className="ri-arrow-right-line ml-2 translate-x-1 transition-transform"></i>
                  </span>
                </Link>
              </div>
              </div>
              
              {/* Enhanced Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent rounded-lg transition-all duration-700 opacity-0 group-hover:opacity-30 group-hover:scale-105" 
                   style={{ borderColor: '#2879B6', filter: 'blur(1px)' }}>
              </div>
              
              {/* Corner Accent */}
              <div className="absolute top-0 left-0 w-0 h-0 border-t-4 border-l-4 border-transparent group-hover:border-t-8 group-hover:border-l-8 transition-all duration-500 rounded-tl-lg" 
                   style={{ borderTopColor: '#2879B6', borderLeftColor: '#2879B6' }}>
              </div>
            </div>
            <div 
              className="group relative rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-6 hover:rotate-1 cursor-pointer overflow-hidden border border-gray-100"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="800"
              data-aos-easing="ease-out-cubic"
              style={{
                backgroundColor: '#F1F1F1',
                padding: '30px',
                color: '#333842',
                fontFamily: 'Rubik, sans-serif',
                fontSize: '16px'
              }}
            >
              {/* Enhanced Background Effects */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-20 transition-all duration-700 rounded-full blur-xl" 
                   style={{ background: 'radial-gradient(circle, #2879B6, #2879B688)' }}>
              </div>
              
              {/* Floating Particles Effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: '#2879B6', animationDuration: '2s' }}></div>
                <div className="absolute bottom-8 left-6 w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: '#2879B6', animationDelay: '0.5s', animationDuration: '3s' }}></div>
                <div className="absolute top-1/2 left-4 w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: '#2879B6', animationDelay: '1s', animationDuration: '2.5s' }}></div>
              </div>
              
              <div className="relative z-10">
              <div className="flex flex-col items-center text-center">
                <h4 
                  className="mb-6 group-hover:scale-105 transition-all duration-500"
                  style={{
                    fontFamily: 'Rubik, sans-serif',
                    fontWeight: 500,
                    color: '#2879B6',
                    fontSize: '1.25rem',
                    lineHeight: '1.35em'
                  }}
                >
                  Comprehensive Solutions
                </h4>
                <div className="w-24 h-24 mb-6 flex items-center justify-center relative" style={{ transformOrigin: 'center bottom' }}>
                  <img
                    src={ASSETS.ICONS.COMPREHENSIVE_SOLUTIONS}
                    alt="Comprehensive Solutions"
                    className="w-full h-full object-contain relative z-10 transition-transform duration-500 ease-out group-hover:rotate-6 group-hover:scale-150"
                    style={{
                      filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35))',
                      transformOrigin: 'center bottom',
                    }}
                  />
                  {/* Enhanced shadow that shrinks on hover */}
                  <div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out group-hover:scale-90"
                    style={{
                      width: '80px',
                      height: '20px',
                      background: 'rgba(0, 0, 0, 0.25)',
                      borderRadius: '50%',
                      filter: 'blur(10px)',
                    }}
                  >
                  </div>
                </div>
                <p 
                  className="mb-6 group-hover:text-gray-700 transition-colors duration-500"
                  style={{
                    fontFamily: 'Rubik, sans-serif',
                    fontStyle: 'normal',
                    color: '#333842',
                    fontSize: '1rem',
                    lineHeight: '1.625em'
                  }}
                >
                  Providing end-to-end solutions for optimal patient care
                </p>
                <Link
                  to="/about"
                  className="relative inline-flex items-center px-6 py-3 rounded font-medium transition-all duration-500 cursor-pointer whitespace-nowrap group/link overflow-hidden"
                  style={{ color: '#2879B6' }}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    Discover Our Services <i className="ri-arrow-right-line ml-2 group-hover/link:translate-x-1 transition-transform"></i>
                  </span>
                  <span className="absolute inset-0 bg-[#E6662F] transform translate-y-full group-hover/link:translate-y-0 transition-transform duration-500 ease-out"></span>
                  <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover/link:opacity-100 transition-opacity duration-500 z-20">
                    Discover Our Services <i className="ri-arrow-right-line ml-2 translate-x-1 transition-transform"></i>
                  </span>
                </Link>
              </div>
              </div>
              
              {/* Enhanced Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent rounded-lg transition-all duration-700 opacity-0 group-hover:opacity-30 group-hover:scale-105" 
                   style={{ borderColor: '#2879B6', filter: 'blur(1px)' }}>
              </div>
              
              {/* Corner Accent */}
              <div className="absolute top-0 left-0 w-0 h-0 border-t-4 border-l-4 border-transparent group-hover:border-t-8 group-hover:border-l-8 transition-all duration-500 rounded-tl-lg" 
                   style={{ borderTopColor: '#2879B6', borderLeftColor: '#2879B6' }}>
              </div>
            </div>
            <div 
              className="group relative rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-6 hover:rotate-1 cursor-pointer overflow-hidden border border-gray-100"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="800"
              data-aos-easing="ease-out-cubic"
              style={{
                backgroundColor: '#F1F1F1',
                padding: '30px',
                color: '#333842',
                fontFamily: 'Rubik, sans-serif',
                fontSize: '16px'
              }}
            >
              {/* Enhanced Background Effects */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-20 transition-all duration-700 rounded-full blur-xl" 
                   style={{ background: 'radial-gradient(circle, #2879B6, #2879B688)' }}>
              </div>
              
              {/* Floating Particles Effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: '#2879B6', animationDuration: '2s' }}></div>
                <div className="absolute bottom-8 left-6 w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: '#2879B6', animationDelay: '0.5s', animationDuration: '3s' }}></div>
                <div className="absolute top-1/2 left-4 w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: '#2879B6', animationDelay: '1s', animationDuration: '2.5s' }}></div>
              </div>
              
              <div className="relative z-10">
              <div className="flex flex-col items-center text-center">
                <h4 
                  className="mb-6 group-hover:scale-105 transition-all duration-500"
                  style={{
                    fontFamily: 'Rubik, sans-serif',
                    fontWeight: 500,
                    color: '#2879B6',
                    fontSize: '1.25rem',
                    lineHeight: '1.35em'
                  }}
                >
                  Unwavering Support
                </h4>
                <div className="w-24 h-24 mb-6 flex items-center justify-center relative" style={{ transformOrigin: 'center bottom' }}>
                  <img
                    src={ASSETS.ICONS.UNWAVERING_SUPPORT}
                    alt="Unwavering Support"
                    className="w-full h-full object-contain relative z-10 transition-transform duration-500 ease-out group-hover:rotate-6 group-hover:scale-150"
                    style={{
                      filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35))',
                      transformOrigin: 'center bottom',
                    }}
                  />
                  {/* Enhanced shadow that shrinks on hover */}
                  <div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out group-hover:scale-90"
                    style={{
                      width: '80px',
                      height: '20px',
                      background: 'rgba(0, 0, 0, 0.25)',
                      borderRadius: '50%',
                      filter: 'blur(10px)',
                    }}
                  >
                  </div>
                </div>
                <p 
                  className="mb-6 group-hover:text-gray-700 transition-colors duration-500"
                  style={{
                    fontFamily: 'Rubik, sans-serif',
                    fontStyle: 'normal',
                    color: '#333842',
                    fontSize: '1rem',
                    lineHeight: '1.625em'
                  }}
                >
                  Committed to customer satisfaction through exceptional service
                </p>
                <Link
                  to="/contact"
                  className="relative inline-flex items-center px-6 py-3 rounded font-medium transition-all duration-500 cursor-pointer whitespace-nowrap group/link overflow-hidden"
                  style={{ color: '#2879B6' }}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    Contact Us Today <i className="ri-arrow-right-line ml-2 group-hover/link:translate-x-1 transition-transform"></i>
                  </span>
                  <span className="absolute inset-0 bg-[#E6662F] transform translate-y-full group-hover/link:translate-y-0 transition-transform duration-500 ease-out"></span>
                  <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover/link:opacity-100 transition-opacity duration-500 z-20">
                    Contact Us Today <i className="ri-arrow-right-line ml-2 translate-x-1 transition-transform"></i>
                  </span>
                </Link>
              </div>
              </div>
              
              {/* Enhanced Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent rounded-lg transition-all duration-700 opacity-0 group-hover:opacity-30 group-hover:scale-105" 
                   style={{ borderColor: '#2879B6', filter: 'blur(1px)' }}>
              </div>
              
              {/* Corner Accent */}
              <div className="absolute top-0 left-0 w-0 h-0 border-t-4 border-l-4 border-transparent group-hover:border-t-8 group-hover:border-l-8 transition-all duration-500 rounded-tl-lg" 
                   style={{ borderTopColor: '#2879B6', borderLeftColor: '#2879B6' }}>
              </div>
            </div>
          </div>
            )}
        </div>
      </section>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;
