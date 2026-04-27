import { useState, useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { trackFormSubmit, trackEvent } from '../../utils/analytics';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useCooldownTimer } from '../../hooks/enquiry/useCooldownTimer';
import { useEmailValidation } from '../../hooks/enquiry/useEmailValidation';
import { usePhoneValidation } from '../../hooks/enquiry/usePhoneValidation';
import { checkEnquiry, createEnquiry, HttpError } from '../../hooks/enquiry/enquiryApi';

function SubmissionSuccessOverlay({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onDone, 4500);
    return () => window.clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#06121f]/90">
      <div className="relative w-full max-w-3xl rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-[#06121f] via-[#071a2c] to-[#06121f] shadow-2xl overflow-hidden">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="px-8 py-10 md:px-12 md:py-12">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full animate-ping bg-emerald-400/20" />
              <div className="absolute -inset-3 rounded-full border border-emerald-400/30 animate-spin [animation-duration:6s]" />
              <div className="relative h-20 w-20 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <span className="text-white text-2xl font-bold leading-none">✓</span>
                </div>
              </div>
            </div>

            <div className="w-full max-w-2xl rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-6 py-5">
              <p className="text-white text-lg md:text-xl font-semibold">
                Your enquiry has been <span className="text-emerald-300">submitted successfully!</span>
              </p>
              <p className="mt-2 text-sm md:text-base text-slate-200/90 leading-relaxed">
                Thank you for reaching out to us.
                <br />
                Our <span className="text-emerald-200 font-semibold">Agentic AI</span> will call you shortly for further enquiry and details.
                During the call, you can provide more details and also ask any queries you may have.
              </p>
              <p className="mt-3 text-sm text-emerald-200 font-semibold">We&apos;re here to help!</p>
            </div>

            <div className="w-full max-w-xl">
              <p className="text-xs text-slate-200/70 mb-2">You will be redirected shortly...</p>
              <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-1/2 bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse" />
              </div>
            </div>

            <button
              type="button"
              onClick={onDone}
              className="mt-2 text-xs text-slate-200/70 hover:text-slate-200 underline underline-offset-4"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const PRODUCT_OPTIONS = [
  'FPD C-ARM',
  'DReam CMT-Dual (Ceiling Type, Dual Detector)',
  'DReam CMT-Single (Ceiling Type, Single Detector)',
  'DReam Floor Mounted DR',
  'ADONIS 100HF/150HF Mobile X-Ray',
  'ADONIS HF Radiographic Systems 300mA / 500mA / 600mA',
  'Mini 90 Point-of-Care X-Ray',
  'ADONIS HF Mobile DR',
  'PINKVIEW DR PLUS (Digital Mammography)',
  'PINKVIEW RT (Analog Mammography)',
  'Glass-Free Flat Panel Detector',
  'Retrofit Mammography Panel',
  'DMD D 2000, X-Ray Film Digitizer',
  'Image Display Monitors',
  'CT/MR/Mammograph Multi-Modality Workstations',
  'CD/DVD Publishers',
  'MedE Drive for Patient Data Storage',
  'Anamaya',
  'Philips Achieva 3.0Tesla X-Series',
  'GE Signa HDxt 1.5Tesla',
] as const;

export default function Contact() {
  // CMS Data State
  const [contactHero, setContactHero] = useState<any>(null);
  const [contactInfoCards, setContactInfoCards] = useState<any[]>([]);
  const [contactMap, setContactMap] = useState<any>(null);
  const [contactForm, setContactForm] = useState<any>(null);

  // Fetch CMS Data
  const fetchContactHero = async () => {
    try {
      const res = await fetch('/api/cms/contact-page/hero');
      if (res.ok) {
        const json = await res.json();
        setContactHero(json?.data || json || null);
      }
    } catch (error) {
      console.error('Error fetching contact hero:', error);
    }
  };

  const fetchContactInfoCards = async () => {
    try {
      const res = await fetch('/api/cms/contact-page/info-cards');
      if (res.ok) {
        const json = await res.json();
        const cards = Array.isArray(json?.data) ? json.data : json;
        setContactInfoCards(cards.filter((c: any) => c.isActive !== false).sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
      }
    } catch (error) {
      console.error('Error fetching contact info cards:', error);
    }
  };

  const fetchContactMap = async () => {
    try {
      const res = await fetch('/api/cms/contact-page/map');
      if (res.ok) {
        const json = await res.json();
        setContactMap(json?.data || json || null);
      }
    } catch (error) {
      console.error('Error fetching contact map:', error);
    }
  };

  const fetchContactForm = async () => {
    try {
      const res = await fetch('/api/cms/contact-page/form');
      if (res.ok) {
        const json = await res.json();
        setContactForm(json?.data || json || null);
      }
    } catch (error) {
      console.error('Error fetching contact form:', error);
    }
  };


  useEffect(() => {
    // Fetch CMS data
    fetchContactHero();
    fetchContactInfoCards();
    fetchContactMap();
    fetchContactForm();

    // Listen for data changes from Dashboard
    const handleContactHeroChange = () => fetchContactHero();
    const handleContactInfoCardsChange = () => fetchContactInfoCards();
    const handleContactMapChange = () => fetchContactMap();
    const handleContactFormChange = () => fetchContactForm();

    window.addEventListener('contactHeroChanged', handleContactHeroChange);
    window.addEventListener('contactInfoCardsChanged', handleContactInfoCardsChange);
    window.addEventListener('contactMapChanged', handleContactMapChange);
    window.addEventListener('contactFormChanged', handleContactFormChange);

    return () => {
      window.removeEventListener('contactHeroChanged', handleContactHeroChange);
      window.removeEventListener('contactInfoCardsChanged', handleContactInfoCardsChange);
      window.removeEventListener('contactMapChanged', handleContactMapChange);
      window.removeEventListener('contactFormChanged', handleContactFormChange);
    };
  }, []);

  const [formData, setFormData] = useState({
    fname: '',
    organization: '',
    email: '',
    phone: '',
    product: '',
    companySize: '',
    inquiry: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<'fname' | 'email' | 'phone' | 'product' | 'message', string>>>({});
  const [touched, setTouched] = useState<Partial<Record<'fname' | 'email' | 'phone' | 'product' | 'message', boolean>>>({});
  const { isCoolingDown, secondsLeft, startCooldown } = useCooldownTimer(10);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  const emailValidation = useEmailValidation(formData.email, true);
  const phoneValidation = usePhoneValidation(formData.phone, true);
  const productError = !String(formData.product || '').trim() ? 'Product is required' : null;
  const messageError =
    !formData.message.trim()
      ? 'Message is required'
      : formData.message.trim().length < 15
        ? 'Message must be at least 15 characters'
        : null;

  const validateAndSet = (field: keyof typeof touched) => {
    const next: Partial<Record<'fname' | 'email' | 'phone' | 'product' | 'message', string>> = {};
    if (field === 'fname') {
      next.fname = !formData.fname.trim() ? 'Name is required' : formData.fname.trim().length < 2 ? 'Name must be at least 2 characters' : undefined;
    }
    if (field === 'email') next.email = emailValidation.validate() || undefined;
    if (field === 'phone') next.phone = phoneValidation.validate() || undefined;
    if (field === 'product') next.product = productError || undefined;
    if (field === 'message') next.message = messageError || undefined;
    setFieldErrors((prev) => ({ ...prev, ...next }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    setFieldErrors({});
    
    // Validate required fields
    if (!formData.fname || !formData.email || !formData.phone || !formData.organization || !formData.product || !formData.message || !formData.companySize || !formData.inquiry) {
      setSubmitMessage({ type: 'error', text: 'Please fill in all required fields.' });
      setIsSubmitting(false);
      // Track validation error (no field values sent)
      try {
        trackEvent('form_validation_error', 'form', 'contact_form');
      } catch {}
      return;
    }

    // Field-level validation (email/phone/name)
    const nextErrors: typeof fieldErrors = {};
    if (formData.fname.trim().length < 2) nextErrors.fname = 'Name must be at least 2 characters';
    const emailErr = emailValidation.validate();
    if (emailErr) nextErrors.email = emailErr;
    const phoneErr = phoneValidation.validate();
    if (phoneErr) nextErrors.phone = phoneErr;
    if (productError) nextErrors.product = productError;
    if (messageError) nextErrors.message = messageError;
    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors);
      setTouched({ fname: true, email: true, phone: true, product: true, message: true });
      setIsSubmitting(false);
      return;
    }

    if (isCoolingDown) {
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Duplicate check (skip if endpoint not present)
      try {
        const dup = await checkEnquiry({
          name: formData.fname.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        });
        if (dup?.exists) {
          const field = dup.field || 'phone';
          const msg =
            field === 'email'
              ? 'This email is already registered'
              : field === 'phone'
                ? 'This phone number is already registered'
                : 'This name is already registered';
          setFieldErrors((prev) => ({ ...prev, [field === 'name' ? 'fname' : field]: msg } as any));
          setIsSubmitting(false);
          return;
        }
      } catch (err) {
        if (!(err instanceof HttpError && err.status === 404)) throw err;
      }

      // Preferred API
      try {
        await createEnquiry({
          name: formData.fname.trim(),
          organization: formData.organization,
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          product: formData.product,
          companySize: formData.companySize,
          inquiry: formData.inquiry,
          message: formData.message,
          source: '3imed-contact',
        });
        trackFormSubmit('contact_form', 'Contact Form');
        setSubmitMessage({
          type: 'success',
          text: 'Thank you! Your message has been sent successfully. We will get back to you soon.'
        });
        setShowSuccessOverlay(true);
        setFormData({
          fname: '',
          organization: '',
          email: '',
          phone: '',
          product: '',
          companySize: '',
          inquiry: '',
          message: ''
        });
        startCooldown();
        setIsSubmitting(false);
        return;
      } catch (err) {
        if (!(err instanceof HttpError && err.status === 404)) throw err;
      }

      // Submit form to server
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Track successful form submission (NO PII - only form type)
        trackFormSubmit('contact_form', 'Contact Form');
        
        setSubmitMessage({ 
          type: 'success', 
          text: 'Thank you! Your message has been sent successfully. We will get back to you soon.' 
        });
        setShowSuccessOverlay(true);
        
        // Reset form and checkbox after submission
        setFormData({
          fname: '',
          organization: '',
          email: '',
          phone: '',
          product: '',
          companySize: '',
          inquiry: '',
          message: ''
        });
        startCooldown();
        
        // Hide overlay after a short delay
        setTimeout(() => {
          setShowSuccessOverlay(false);
          setSubmitMessage(null);
        }, 4500);
      } else {
        setSubmitMessage({ 
          type: 'error', 
          text: result.message || 'Sorry, there was an error sending your message. Please try again later.' 
        });
        console.error('Form submission error:', result);
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: 'Sorry, there was an error sending your message. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    const key = e.target.name as keyof typeof touched;
    if (key in touched) {
      setTouched((prev) => ({ ...prev, [key]: true }));
      if (touched[key]) validateAndSet(key);
    }
  };

  return (
    <div className="contact-page">
      {showSuccessOverlay && (
        <SubmissionSuccessOverlay
          onDone={() => {
            setShowSuccessOverlay(false);
            setSubmitMessage(null);
          }}
        />
      )}
      <Header />
      
      {/* Page Title - CMS or Fallback */}
      {contactHero?.isActive !== false && (
      <div className="bg-gray-50 py-12 mt-20">
        <div className="container mx-auto px-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-center text-gray-900">
              {contactHero?.title || 'Contact Us'}
            </h1>
          </div>
        </div>
      )}

      {/* Contact Info Section - CMS or Fallback */}
      <section className="pb-16 bg-gray-50" style={{ marginLeft: '50px', marginRight: '50px' }}>
        <div className="container mx-auto px-4">
          {contactInfoCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contactInfoCards.map((card: any, idx: number) => (
                <div 
                  key={card.id || idx} 
                  className="group relative rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-6 hover:rotate-1 cursor-pointer overflow-hidden border border-gray-100"
                  style={{ 
                    backgroundColor: '#F1F1F1',
                    padding: '30px',
                    color: '#333842',
                    fontFamily: 'Rubik, sans-serif'
                  }}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  data-aos-duration="800"
                  data-aos-easing="ease-out-cubic"
                >
                  {/* Background Effects */}
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
                      {/* Title */}
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
                        {card.title}
                      </h4>
                      
                      {/* Icon with shadow */}
                      {card.icon && (
                        <div className="w-24 h-24 mb-6 flex items-center justify-center relative" style={{ transformOrigin: 'center bottom' }}>
                          <i 
                            className={`${card.icon} text-6xl relative z-10 transition-transform duration-500 ease-out group-hover:rotate-6 group-hover:scale-150`}
                            style={{
                              color: '#2879B6',
                              filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35))',
                              transformOrigin: 'center bottom',
                            }}
                          ></i>
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
                      
                      {/* Content */}
                      {card.link ? (
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
                          <a href={card.link} target={card.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="hover:text-[#2879B6] transition-colors">
                            {card.content}
                          </a>
                        </p>
                      ) : (
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
                          {card.content}
                        </p>
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
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Registered Office */}
              <div 
                className="group relative rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-6 hover:rotate-1 cursor-pointer overflow-hidden border border-gray-100"
                style={{ 
                  backgroundColor: '#F1F1F1',
                  padding: '30px',
                  color: '#333842',
                  fontFamily: 'Rubik, sans-serif'
                }}
                data-aos="fade-up"
                data-aos-delay="0"
                data-aos-duration="800"
                data-aos-easing="ease-out-cubic"
              >
                {/* Background Effects */}
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
                    {/* Title */}
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
                      Registered Office
                    </h4>
                    
                    {/* Icon with shadow */}
                    <div className="w-24 h-24 mb-6 flex items-center justify-center relative" style={{ transformOrigin: 'center bottom' }}>
                      <i 
                        className="fas fa-map-marked-alt text-6xl relative z-10 transition-transform duration-500 ease-out group-hover:rotate-6 group-hover:scale-150"
                        style={{
                          color: '#2879B6',
                          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35))',
                          transformOrigin: 'center bottom',
                        }}
                      ></i>
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
                    
                    {/* Content */}
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
                      <a href="https://maps.app.goo.gl/MheuF5TBoDraFrgD8" target="_blank" rel="noopener noreferrer" className="hover:text-[#2879B6] transition-colors">
                        Second Floor, Refex Towers, Sterling Road Signal, 313, Valluvar Kottam High Road, Nungambakkam, Chennai – 600034, Tamil Nadu
                      </a>
                    </p>
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
              
              {/* Corporate Office */}
              <div 
                className="group relative rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-6 hover:rotate-1 cursor-pointer overflow-hidden border border-gray-100"
                style={{ 
                  backgroundColor: '#F1F1F1',
                  padding: '30px',
                  color: '#333842',
                  fontFamily: 'Rubik, sans-serif'
                }}
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="800"
                data-aos-easing="ease-out-cubic"
              >
                {/* Background Effects */}
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
                    {/* Title */}
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
                      Corporate Office
                    </h4>
                    
                    {/* Icon with shadow */}
                    <div className="w-24 h-24 mb-6 flex items-center justify-center relative" style={{ transformOrigin: 'center bottom' }}>
                      <i 
                        className="fas fa-map-marked-alt text-6xl relative z-10 transition-transform duration-500 ease-out group-hover:rotate-6 group-hover:scale-150"
                        style={{
                          color: '#2879B6',
                          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35))',
                          transformOrigin: 'center bottom',
                        }}
                      ></i>
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
                    
                    {/* Content */}
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
                      <a href="https://maps.app.goo.gl/Kifm5u8hDDXqoT898" target="_blank" rel="noopener noreferrer" className="hover:text-[#2879B6] transition-colors">
                        Refex Building, 67, Bazullah Road, Parthasarathy Puram, T Nagar, Chennai – 600017
                      </a>
                    </p>
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
              
              {/* Phone */}
              <div 
                className="group relative rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-6 hover:rotate-1 cursor-pointer overflow-hidden border border-gray-100"
                style={{ 
                  backgroundColor: '#F1F1F1',
                  padding: '30px',
                  color: '#333842',
                  fontFamily: 'Rubik, sans-serif'
                }}
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="800"
                data-aos-easing="ease-out-cubic"
              >
                {/* Background Effects */}
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
                    {/* Title */}
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
                      Phone
                    </h4>
                    
                    {/* Icon with shadow */}
                    <div className="w-24 h-24 mb-6 flex items-center justify-center relative" style={{ transformOrigin: 'center bottom' }}>
                      <i 
                        className="fas fa-phone-volume text-6xl relative z-10 transition-transform duration-500 ease-out group-hover:rotate-6 group-hover:scale-150"
                        style={{
                          color: '#2879B6',
                          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35))',
                          transformOrigin: 'center bottom',
                        }}
                      ></i>
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
                    
                    {/* Content */}
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
                      <a href="tel:+919444026307" className="hover:text-[#2879B6] transition-colors">
                        +91 94440 26307
                      </a>
                    </p>
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
              
              {/* Email */}
              <div 
                className="group relative rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-6 hover:rotate-1 cursor-pointer overflow-hidden border border-gray-100"
                style={{ 
                  backgroundColor: '#F1F1F1',
                  padding: '30px',
                  color: '#333842',
                  fontFamily: 'Rubik, sans-serif'
                }}
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="800"
                data-aos-easing="ease-out-cubic"
              >
                {/* Background Effects */}
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
                    {/* Title */}
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
                      Email
                    </h4>
                    
                    {/* Icon with shadow */}
                    <div className="w-24 h-24 mb-6 flex items-center justify-center relative" style={{ transformOrigin: 'center bottom' }}>
                      <i 
                        className="fas fa-envelope-open-text text-6xl relative z-10 transition-transform duration-500 ease-out group-hover:rotate-6 group-hover:scale-150"
                        style={{
                          color: '#2879B6',
                          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35))',
                          transformOrigin: 'center bottom',
                        }}
                      ></i>
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
                    
                    {/* Content */}
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
                      <a href="mailto:info@3imedtech.com" className="hover:text-[#2879B6] transition-colors">
                        info@3imedtech.com
                      </a>
                    </p>
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

      {/* Map Section - CMS or Fallback */}
      {contactMap?.isActive !== false && (
      <section className="w-full">
        <iframe 
            src={contactMap?.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2748.1873197906534!2d80.24098097527796!3d13.06595648541996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267b450aa54e9%3A0xf906e87011428643!2sRefex%20Towers!5e0!3m2!1sen!2sin!4v1733296964599!5m2!1sen!2sin"}
          width="100%" 
          height="450" 
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Refex Towers Location"
        ></iframe>
      </section>
      )}

      {/* Contact Form Section - CMS or Fallback */}
      {contactForm?.isActive !== false && (
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
              {contactForm?.title && (
                <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{contactForm.title}</h2>
              )}
              {contactForm?.description && (
                <p className="text-gray-700 mb-8 text-center">{contactForm.description}</p>
              )}
            <form onSubmit={handleSubmit} className="space-y-6" data-ga-form-type="contact_form" data-ga-form-name="Contact Form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Full name *
                  </label>
                  <input 
                    type="text"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    onBlur={() => {
                      setTouched((prev) => ({ ...prev, fname: true }));
                      validateAndSet('fname');
                    }}
                    placeholder="e.g., John Doe"
                    required
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#4A90A4] ${fieldErrors.fname ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {fieldErrors.fname && <p className="text-xs text-red-500 mt-1">{fieldErrors.fname}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Organization *
                  </label>
                  <input 
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Company Name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#4A90A4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Work email address *
                  </label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => {
                      setTouched((prev) => ({ ...prev, email: true }));
                      validateAndSet('email');
                    }}
                    placeholder="name@company.com"
                    required
                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#4A90A4] ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {fieldErrors.email && <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone number *
                  </label>
                  <div className={`w-full px-4 py-2 border rounded focus-within:border-[#4A90A4] transition-all duration-200 ${fieldErrors.phone ? 'border-red-500' : 'border-gray-300'}`}>
                    <PhoneInput
                      country="in"
                      value={formData.phone.replace(/^\+/, '')}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: value ? `+${value}` : '',
                        }))
                      }
                      inputProps={{
                        name: 'phone',
                        autoComplete: 'tel',
                        required: true,
                        onBlur: () => {
                          setTouched((prev) => ({ ...prev, phone: true }));
                          validateAndSet('phone');
                        }
                      }}
                      containerClass="w-full"
                      inputClass="!w-full !border-0 !shadow-none focus:!outline-none"
                      buttonClass="!bg-transparent !border-0"
                      placeholder="Full Number (incl. prefix)"
                    />
                  </div>
                  {fieldErrors.phone && <p className="text-xs text-red-500 mt-1">{fieldErrors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Company size *
                  </label>
                  <div className="relative">
                    <select 
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded focus:outline-none focus:border-[#4A90A4] appearance-none bg-white"
                    >
                      <option value="">Please Select</option>
                      <option value="1">1 (freelancer)</option>
                      <option value="2-19">2-19</option>
                      <option value="20-49">20-49</option>
                      <option value="50+">50+</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    What is your inquiry about? *
                  </label>
                  <div className="relative">
                    <select 
                      name="inquiry"
                      value={formData.inquiry}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded focus:outline-none focus:border-[#4A90A4] appearance-none bg-white"
                    >
                      <option value="">Please Select</option>
                      <option value="General Information Request">General Information Request</option>
                      <option value="Partner Relations">Partner Relations</option>
                      <option value="Careers">Careers</option>
                      <option value="Product Licencing">Product Licencing</option>
                      <option value="I need help">I need help</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Select Product *
                </label>
                <div className="relative">
                  <select 
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    onBlur={() => {
                      setTouched((prev) => ({ ...prev, product: true }));
                      validateAndSet('product');
                    }}
                    required
                    className={`w-full px-4 py-3 pr-10 border rounded focus:outline-none focus:border-[#4A90A4] appearance-none bg-white ${fieldErrors.product ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Please Select</option>
                    {PRODUCT_OPTIONS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {fieldErrors.product && <p className="text-xs text-red-500 mt-1">{fieldErrors.product}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  How we can help you? *
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={() => {
                    setTouched((prev) => ({ ...prev, message: true }));
                    validateAndSet('message');
                  }}
                  placeholder="Let us know what you need."
                  rows={6}
                  maxLength={500}
                  required
                  className={`w-full px-4 py-3 border rounded focus:outline-none focus:border-[#4A90A4] resize-none ${fieldErrors.message ? 'border-red-500' : 'border-gray-300'}`}
                ></textarea>
                <p className="text-sm text-gray-500 mt-2">Maximum 500 characters</p>
                {fieldErrors.message && <p className="text-xs text-red-500 mt-1">{fieldErrors.message}</p>}
              </div>

              {/* Submit Message */}
              {submitMessage && (
                <div className={`p-4 rounded ${
                  submitMessage.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  <p className="font-medium">{submitMessage.text}</p>
                </div>
              )}

              <div>
                <button 
                  type="submit"
                  disabled={isSubmitting || isCoolingDown}
                  className="w-full md:w-auto px-12 py-4 font-semibold rounded transition-colors bg-[#4A90A4] text-white hover:bg-[#3a7a8a] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2"></i>
                      Submitting...
                    </>
                  ) : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      )}
      
      <Footer />
    </div>
  );
}
