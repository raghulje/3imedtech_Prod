import { useEffect, useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { ASSETS } from '../../constants/assets';
import { smoothScrollToHash, smoothScrollToTop } from '../../utils/smoothScroll';

const RadiographySystemsPage = () => {
  // CMS Data State
  const [hero, setHero] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);

  // Fetch CMS Data
  const fetchHero = async () => {
    try {
      const res = await fetch('/api/cms/radiography/hero');
      if (res.ok) {
        const json = await res.json();
        setHero(json?.data || json || null);
      }
    } catch (error) {
      console.error('Error fetching radiography hero:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/cms/radiography/products');
      if (res.ok) {
        const json = await res.json();
        const productsData = Array.isArray(json?.data) ? json.data : json;
        // Filter active products and sort by order
        const activeProducts = (productsData || [])
          .filter((p: any) => p.isActive !== false && !p.isDeleted)
          .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
        setProducts(activeProducts);
      }
    } catch (error) {
      console.error('Error fetching radiography products:', error);
    }
  };

  // Function to scroll to section with hash and highlight
  const scrollToHashSection = () => {
    if (window.location.hash) {
      setTimeout(() => {
        const hash = window.location.hash.replace('#', '');
        const element = document.getElementById(hash);
        if (element) {
          smoothScrollToHash(window.location.hash, {
            offset: 100,
            duration: 800,
          });

          // Add highlight effect
          setHighlightedSection(hash);
          setTimeout(() => {
            setHighlightedSection(null);
          }, 2000);
        }
      }, 300); // Wait for products to render
    }
  };

  useEffect(() => {
    smoothScrollToTop(400);
    fetchHero();
    fetchProducts();

    // Listen for data changes from Dashboard
    const handleHeroChange = () => fetchHero();
    const handleProductsChange = () => fetchProducts();

    window.addEventListener('radiographyHeroChanged', handleHeroChange);
    window.addEventListener('radiographyProductsChanged', handleProductsChange);

    // Handle hash navigation after products load
    const handleHashChange = () => {
      scrollToHashSection();
    };

    // Handle initial hash and hash changes
    if (window.location.hash) {
      scrollToHashSection();
    }
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('radiographyHeroChanged', handleHeroChange);
      window.removeEventListener('radiographyProductsChanged', handleProductsChange);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Re-run hash navigation when products are loaded
  useEffect(() => {
    if (products.length > 0 && window.location.hash) {
      scrollToHashSection();
    }
  }, [products]);

  // Parse features from JSON string or array
  const parseFeatures = (features: any): string[] => {
    if (!features) return [];
    if (Array.isArray(features)) return features;
    if (typeof features === 'string') {
      try {
        const parsed = JSON.parse(features);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        // If not JSON, treat as newline-separated string
        return features.split('\n').filter((f: string) => f.trim());
      }
    }
    return [];
  };

  // Parse benefits from JSON string or array (similar to features)
  const parseBenefits = (benefits: any): string[] => {
    if (!benefits) return [];
    if (Array.isArray(benefits)) return benefits;
    if (typeof benefits === 'string') {
      try {
        const parsed = JSON.parse(benefits);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        // If not JSON, treat as newline-separated string
        return benefits.split('\n').filter((b: string) => b.trim());
      }
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#7AB730] to-[#4A90A4] pt-28 md:pt-28 lg:pt-32 pb-12 md:pb-16 flex items-center min-h-[250px] md:min-h-[300px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center w-full flex flex-col justify-center items-center h-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-6 animate-fade-up">
            {hero?.title || 'Radiography Systems'}
          </h1>
        </div>
      </section>

      {/* Products Section */}
      {products.length > 0 ? (
        products.map((product, index) => {
          const features = parseFeatures(product.features);
          const benefits = parseBenefits(product.benefits);
          const imagePosition = product.imagePosition || 'left';
          const backgroundColor = product.backgroundColor || 'from-gray-50 to-white';
          const sectionId = product.sectionId || `product-${index}`;
          const isHighlighted = highlightedSection === sectionId;

          return (
            <section
              key={product.id || sectionId || index}
              id={sectionId}
              className={`py-8 md:py-12 lg:py-20 bg-gradient-to-br ${backgroundColor} relative overflow-hidden transition-all duration-500 ${isHighlighted ? 'ring-4 ring-[#E6662F] ring-opacity-75 shadow-2xl' : ''
                }`}
              style={{
                scrollMarginTop: '100px',
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 10%, rgba(40, 121, 182, 0.08) 90%)'
              }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex flex-col lg:flex-row gap-4 md:gap-6 items-start ${imagePosition === 'right' ? 'lg:flex-row-reverse' : ''
                  }`}>
                  {/* Image */}
                  <div
                    className={`w-full lg:w-[48%] flex justify-center ${imagePosition === 'right' ? 'lg:justify-end' : 'lg:justify-start'}`}
                    data-aos={imagePosition === 'right' ? 'fade-left' : 'fade-right'}
                    style={{ alignSelf: 'flex-start' }}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.title}
                        className="max-w-full h-auto object-contain max-h-[300px] md:max-h-[495px]"
                        style={{
                          display: 'block',
                          verticalAlign: 'top',
                          margin: 0,
                          padding: 0,
                          paddingBottom: 0,
                          objectFit: 'contain',
                          maxWidth: '100%'
                        }}
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Product+Image';
                        }}
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={`w-full lg:w-[48%]`}
                    data-aos={imagePosition === 'right' ? 'fade-right' : 'fade-left'}
                    style={{ alignSelf: 'flex-start', wordWrap: 'break-word', overflowWrap: 'break-word' }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-5 text-center" style={{
                      color: '#2879b6',
                      marginTop: 0,
                      paddingTop: 0,
                      lineHeight: '1.2'
                    }}>
                      {product.title}
                    </h3>
                    <ul className="space-y-2 text-sm md:text-base text-gray-700" style={{ marginBottom: 0, paddingBottom: 0 }}>
                      {product.overview && (
                        <li>
                          <strong>Overview:</strong> {product.overview}
                        </li>
                      )}
                      {features.length > 0 && (
                        <li>
                          <strong>Features:</strong>
                          <ul className="ml-6 mt-2 space-y-2 list-disc">
                            {features.map((feature: string, idx: number) => (
                              <li key={idx}>{feature}</li>
                            ))}
                          </ul>
                        </li>
                      )}
                      {benefits.length > 0 ? (
                        <li>
                          <strong>Benefits:</strong>
                          <ul className="ml-6 mt-2 space-y-2 list-disc">
                            {benefits.map((benefit: string, idx: number) => (
                              <li key={idx}>{benefit}</li>
                            ))}
                          </ul>
                        </li>
                      ) : product.benefits ? (
                        <li>
                          <strong>Benefits:</strong> {product.benefits}
                        </li>
                      ) : null}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          );
        })
      ) : (
        // Fallback to hardcoded content if no CMS data
        <>
          {/* DReam CMT-Dual */}
          <section
            id="dreamcmtdual"
            className={`py-8 md:py-12 lg:py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden transition-all duration-500 ${highlightedSection === 'dreamcmtdual' ? 'ring-4 ring-[#E6662F] ring-opacity-75 shadow-2xl' : ''
              }`}
            style={{
              scrollMarginTop: '100px',
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 10%, #2879b6 90%)'
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start">
                <div className="w-full lg:w-[48%] flex items-start justify-center lg:justify-start" data-aos="fade-right" style={{}}>
                  {/* Product Image - Local Asset */}
                  <img
                    src={ASSETS.PRODUCTS.RADIOGRAPHY.DREAM_CMT_DUAL}
                    alt="DReam CMT-Dual (Ceiling Type, Dual Detector)"
                    className="max-w-full h-auto object-contain"
                    className="max-h-[300px] md:max-h-[495px]"
                    style={{ objectFit: 'contain', maxWidth: '100%' }}
                  />
                </div>
                <div className="w-full lg:w-[48%]" data-aos="fade-left" style={{ alignSelf: 'flex-start', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-5 text-center" style={{ color: '#2879b6' }}>
                    DReam CMT-Dual (Ceiling Type, Dual Detector)
                  </h3>
                  <ul className="space-y-2 text-gray-700" style={{ marginBottom: 0, paddingBottom: 0 }}>
                    <li>
                      <strong>Overview:</strong> The DReam CMT-Dual system is designed to enhance patient throughput and optimize performance. Its dual detector system allows for rapid, high-quality image acquisition, coupled with ergonomic design for easy operation.
                    </li>
                    <li>
                      <strong>Features:</strong>
                      <ul className="ml-6 mt-2 space-y-2 list-disc">
                        <li>Synchronized detector stand and tube movement (optional)</li>
                        <li>Automatic positioning for versatile applications</li>
                        <li>Elevating horizontal table</li>
                        <li>Bucky tilt for upper extremity studies</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Benefits:</strong> This system translates into higher performance, reduces non-essential work steps, and is ideal for high-demand environments.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* DReam CMT-Single */}
          <section
            id="dreamcmtsingle"
            className={`py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden transition-all duration-500 ${highlightedSection === 'dreamcmtsingle' ? 'ring-4 ring-[#E6662F] ring-opacity-75 shadow-2xl' : ''
              }`}
            style={{
              scrollMarginTop: '100px',
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 10%, #2879b6 90%)'
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row-reverse gap-6 items-start" >
                <div className="w-full lg:w-[48%]" data-aos="fade-right" style={{ alignSelf: 'flex-start', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-5 text-center" style={{ color: '#2879b6' }}>
                    DReam CMT-Single (Ceiling Type, Single Detector)
                  </h3>
                  <ul className="space-y-2 text-gray-700" style={{ marginBottom: 0, paddingBottom: 0 }}>
                    <li>
                      <strong>Overview:</strong> The DReam CMT-Single system is designed for smaller rooms and moderate patient throughput, offering flexibility and extended freedom of movement for challenging clinical examinations.
                    </li>
                    <li>
                      <strong>Features:</strong>
                      <ul className="ml-6 mt-2 space-y-2 list-disc">
                        <li>Tube mounted auto tracking and positioning</li>
                        <li>High spatial resolution for best image quality</li>
                        <li>Auto exposure and pre-set programs for faster throughput</li>
                        <li>Optimized image processing software</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Benefits:</strong> Ideal for stand-alone diagnostic centers, emergency care, and specialty hospitals where space is limited but high-quality imaging is required.
                    </li>
                  </ul>
                </div>
                <div data-aos="fade-left" className="w-full lg:w-[48%] flex items-start justify-center lg:justify-end" style={{}}>
                  {/* Product Image - Local Asset */}
                  <img
                    src={ASSETS.PRODUCTS.RADIOGRAPHY.DREAM_CMT_SINGLE}
                    alt="DReam CMT-Single (Ceiling Type, Single Detector)"
                    className="max-w-full h-auto object-contain"
                    className="max-h-[300px] md:max-h-[495px]"
                    style={{ objectFit: 'contain', maxWidth: '100%' }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* DReam Floor Mounted DR */}
          <section
            id="dreamfloormounteddr"
            className={`py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden transition-all duration-500 ${highlightedSection === 'dreamfloormounteddr' ? 'ring-4 ring-[#E6662F] ring-opacity-75 shadow-2xl' : ''
              }`}
            style={{
              scrollMarginTop: '100px',
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 10%, #2879b6 90%)'
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start">
                <div className="w-full lg:w-[48%] flex items-start justify-center lg:justify-start" data-aos="fade-right" style={{}}>
                  {/* Product Image - Local Asset */}
                  <img
                    src={ASSETS.PRODUCTS.RADIOGRAPHY.DREAM_FLOOR_MOUNTED}
                    alt="DReam Floor Mounted DR"
                    className="max-w-full h-auto object-contain"
                    className="max-h-[300px] md:max-h-[495px]"
                    style={{ objectFit: 'contain', maxWidth: '100%' }}
                  />
                </div>
                <div className="w-full lg:w-[48%]" data-aos="fade-left" style={{ alignSelf: 'flex-start', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-5 text-center" style={{ color: '#2879b6' }}>
                    DReam Floor Mounted DR
                  </h3>
                  <ul className="space-y-2 text-gray-700" style={{ marginBottom: 0, paddingBottom: 0 }}>
                    <li>
                      <strong>Overview:</strong> The DReam Floor Mounted DR system provides a cost-effective and high-performance radiography solution with advanced features and easy operability.
                    </li>
                    <li>
                      <strong>Features:</strong>
                      <ul className="ml-6 mt-2 space-y-2 list-disc">
                        <li>Digital display for kV/mA/mAs selection</li>
                        <li>APR-based control for all body parts</li>
                        <li>Microprocessor control tube for overload protection</li>
                        <li>Automatic voltage compensation</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Benefits:</strong> This system ensures high reliability and accuracy, making it suitable for various radiological needs.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ADONIS 100HF/150HF Mobile X-Ray */}
          <section
            id="adonismobilexray"
            className={`py-20 bg-[#F8F9FA] relative overflow-hidden transition-all duration-500 ${highlightedSection === 'adonismobilexray' ? 'ring-4 ring-[#E6662F] ring-opacity-75 shadow-2xl' : ''
              }`}
            style={{
              scrollMarginTop: '100px',
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 10%, #2879b6 90%)'
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row-reverse gap-6 items-start" >
                <div className="w-full lg:w-[48%]" data-aos="fade-right" style={{ alignSelf: 'flex-start', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-5 text-center" style={{ color: '#2879b6' }}>
                    ADONIS 100HF/150HF Mobile X-Ray
                  </h3>
                  <ul className="space-y-2 text-gray-700" style={{ marginBottom: 0, paddingBottom: 0 }}>
                    <li>
                      <strong>Overview:</strong> The ADONIS Mobile X-Ray system is compact and lightweight, designed for easy mobility in all directions with effective braking, making it ideal for bedside X-Ray needs.
                    </li>
                    <li>
                      <strong>Features:</strong>
                      <ul className="ml-6 mt-2 space-y-2 list-disc">
                        <li>Actuator-based motorized vertical movement</li>
                        <li>Soft-touch keypad with auto-programmable features</li>
                        <li>Detachable exposure release switch</li>
                        <li>Horizontal table/semi-motorized table/vertical bucky (optional)</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Benefits:</strong> Offers portability and flexibility for on-the-go radiography, particularly in hospital wards or remote locations.
                    </li>
                  </ul>
                </div>
                <div data-aos="fade-left" className="w-full lg:w-[48%] flex items-start justify-center lg:justify-end" style={{}}>
                  {/* Product Image - Local Asset */}
                  <img
                    src={ASSETS.PRODUCTS.RADIOGRAPHY.ADONIS_MOBILE_XRAY}
                    alt="ADONIS 100HF/150HF Mobile X-ray"
                    className="max-w-full h-auto object-contain"
                    className="max-h-[300px] md:max-h-[495px]"
                    style={{ objectFit: 'contain', maxWidth: '100%' }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ADONIS HF Radiographic Systems */}
          <section
            id="adonishfradiographicsystems"
            className={`py-20 bg-white relative overflow-hidden transition-all duration-500 ${highlightedSection === 'adonishfradiographicsystems' ? 'ring-4 ring-[#E6662F] ring-opacity-75 shadow-2xl' : ''
              }`}
            style={{
              scrollMarginTop: '100px',
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 10%, #2879b6 90%)'
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start">
                <div className="w-full lg:w-[48%] flex items-start justify-center lg:justify-start" data-aos="fade-right" style={{}}>
                  {/* Product Image - Local Asset */}
                  <img
                    src={ASSETS.PRODUCTS.RADIOGRAPHY.ADONIS_HF_RADIOGRAPHIC}
                    alt="Adonis HF Radiographic Systems 300mA / 500mA / 600mA"
                    className="max-w-full h-auto object-contain"
                    className="max-h-[300px] md:max-h-[495px]"
                    style={{ objectFit: 'contain', maxWidth: '100%' }}
                  />
                </div>
                <div className="w-full lg:w-[48%]" data-aos="fade-left" style={{ alignSelf: 'flex-start', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-5 text-center" style={{ color: '#2879b6' }}>
                    Adonis HF Radiographic Systems 300mA / 500mA / 600mA
                  </h3>
                  <ul className="space-y-2 text-gray-700" style={{ marginBottom: 0, paddingBottom: 0 }}>
                    <li>
                      <strong>Overview:</strong> The Adonis HF Radiographic Systems are high-frequency X-ray systems developed to meet a broad range of radiological needs with high-contrast imaging and reduced patient skin dose.
                    </li>
                    <li>
                      <strong>Features:</strong>
                      <ul className="ml-6 mt-2 space-y-2 list-disc">
                        <li>Digital display of factors</li>
                        <li>APR-based control with 200 programs</li>
                        <li>Motorized table (depending on the system)</li>
                        <li>Automatic voltage compensation</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Benefits:</strong> These systems are built for high efficiency and reliability, providing superior imaging performance at an affordable price.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
};

export default RadiographySystemsPage;
