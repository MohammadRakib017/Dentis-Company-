import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  SERVICES, 
  WHY_CHOOSE_US, 
  PROCESS_STEPS, 
  STATS, 
  TESTIMONIALS, 
  FAQS, 
  DOCTORS 
} from './data';
import SEOHead from './components/SEOHead';
import ServicesGrid from './components/ServicesGrid';
import InteractiveBeforeAfter from './components/InteractiveBeforeAfter';
import BookingModal from './components/BookingModal';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Star, 
  Award, 
  Cpu, 
  UserCheck, 
  HeartHandshake, 
  Zap, 
  DollarSign, 
  CalendarDays, 
  Smile, 
  Calendar, 
  Send, 
  MessageSquare, 
  ArrowUp, 
  Stethoscope,
  CheckCircle,
  Clock3,
  Sparkles
} from 'lucide-react';

// Maps Why Choose Us Icons safely
const getWhyChooseUsIcon = (title: string) => {
  switch (title) {
    case 'Experienced Dentists': return <Award className="w-6 h-6 text-primary" />;
    case 'Latest Dental Technology': return <Cpu className="w-6 h-6 text-primary" />;
    case 'Personalized Treatment': return <UserCheck className="w-6 h-6 text-primary" />;
    case 'Comfortable Environment': return <HeartHandshake className="w-6 h-6 text-primary" />;
    case 'Emergency Appointments': return <Zap className="w-6 h-6 text-primary" />;
    case 'Affordable Pricing': return <DollarSign className="w-6 h-6 text-primary" />;
    case 'Flexible Scheduling': return <CalendarDays className="w-6 h-6 text-primary" />;
    case 'Patient-Focused Care': return <Smile className="w-6 h-6 text-primary" />;
    default: return <Smile className="w-6 h-6 text-primary" />;
  }
};

export default function App() {
  // Navigation & UI States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scheduler States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState('');

  // Slider & FAQ Accordion States
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Contact Form States
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactErrors, setContactErrors] = useState<{ [key: string]: string }>({});

  // Detect scroll to handle sticky nav header and back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Autoplay testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleBookService = (serviceId: string) => {
    setPreSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleOpenBookingDefault = () => {
    setPreSelectedServiceId('');
    setIsBookingOpen(true);
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!contactName.trim()) errors.name = 'Name is required.';
    if (!contactEmail.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      errors.email = 'Please enter a valid email.';
    }
    if (!contactMessage.trim()) errors.message = 'Please type a message.';

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }

    setContactErrors({});
    setIsSubmitting(true);

    // Simulate clinical dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset fields
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMessage('');
    }, 1800);
  };

  return (
    <div className="relative min-h-screen text-slate-800 font-sans selection:bg-primary/20 selection:text-primary">
      {/* SEO metadata management */}
      <SEOHead />

      {/* STICKY HEADER / NAVIGATION */}
      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? 'glass-nav shadow-lg shadow-slate-100/40 py-3' 
            : 'bg-white/95 md:bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo brand */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-[#0F6CBD] rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200/50 group-hover:scale-105 transition-all">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                Dentis <span className="text-[#2BB3A3]">Company</span>
              </span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block leading-none mt-0.5">
                Metropolis Dental
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600 uppercase tracking-wider">
            <a href="#home" className="hover:text-[#0F6CBD] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#0F6CBD] transition-colors">About</a>
            <a href="#services" className="hover:text-[#0F6CBD] transition-colors">Services</a>
            <a href="#why-choose-us" className="hover:text-[#0F6CBD] transition-colors">Why Us</a>
            <a href="#process" className="hover:text-[#0F6CBD] transition-colors">Our Process</a>
            <a href="#before-after" className="hover:text-[#0F6CBD] transition-colors">Before & After</a>
            <a href="#testimonials" className="hover:text-[#0F6CBD] transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-[#0F6CBD] transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-[#0F6CBD] transition-colors">Contact</a>
          </nav>

          {/* Desktop Call to Action Button */}
          <div className="hidden lg:flex items-center gap-6">
            <a 
              href="tel:+15551234567" 
              className="text-slate-600 hover:text-primary transition-colors font-semibold text-sm flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-[#2BB3A3]" />
              <span>(555) 123-4567</span>
            </a>
            
            <button
              onClick={handleOpenBookingDefault}
              className="px-6 py-2.5 bg-[#0F6CBD] hover:bg-primary-hover text-white rounded-full font-bold shadow-lg shadow-blue-200/50 text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

        </div>
      </header>

      {/* MOBILE HAMBURGER MENU DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Mask */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
            />
            {/* Slide out Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 shadow-2xl p-6 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-1.5">
                    <Stethoscope className="w-5 h-5 text-primary" />
                    <span className="font-extrabold text-slate-800 text-base">Dentis Menu</span>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Links */}
                <nav className="flex flex-col gap-4 text-sm font-bold uppercase tracking-wider text-slate-600">
                  <a 
                    href="#home" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-primary transition-colors py-1"
                  >
                    Home
                  </a>
                  <a 
                    href="#about" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-primary transition-colors py-1"
                  >
                    About
                  </a>
                  <a 
                    href="#services" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-primary transition-colors py-1"
                  >
                    Services
                  </a>
                  <a 
                    href="#why-choose-us" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-primary transition-colors py-1"
                  >
                    Why Choose Us
                  </a>
                  <a 
                    href="#process" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-primary transition-colors py-1"
                  >
                    Our Process
                  </a>
                  <a 
                    href="#before-after" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-primary transition-colors py-1"
                  >
                    Before & After
                  </a>
                  <a 
                    href="#testimonials" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-primary transition-colors py-1"
                  >
                    Testimonials
                  </a>
                  <a 
                    href="#faq" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-primary transition-colors py-1"
                  >
                    FAQ
                  </a>
                  <a 
                    href="#contact" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-primary transition-colors py-1"
                  >
                    Contact
                  </a>
                </nav>
              </div>

              {/* Mobile Actions in Drawer */}
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <a 
                  href="tel:+15551234567"
                  className="flex items-center gap-3 justify-center bg-slate-50 border border-slate-200 py-3 rounded-xl text-slate-700 font-bold text-sm hover:bg-slate-100 transition-all"
                >
                  <Phone className="w-4 h-4 text-secondary" />
                  Call Now (555) 123-4567
                </a>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleOpenBookingDefault();
                  }}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3.5 rounded-xl text-center shadow-md shadow-primary/20 transition-all text-xs uppercase tracking-wider"
                >
                  Book Appointment
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


      {/* 1. HERO SECTION */}
      <section id="home" className="relative pt-24 md:pt-36 pb-16 md:pb-28 overflow-hidden bg-gradient-to-br from-white to-slate-50">
        
        {/* Subtle decorative background shapes */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              {/* Emergency Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-[#0F6CBD] text-xs font-bold uppercase tracking-widest">
                <span className="flex h-2 w-2 rounded-full bg-[#0F6CBD] animate-pulse"></span>
                Emergency Care Available 24/7
              </div>

              {/* Headline H1 */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Healthy Smiles <br/> <span className="text-[#0F6CBD]">Start Here</span>
              </h1>

              {/* Subheadline */}
              <p className="text-slate-500 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 font-medium">
                Professional dental care with advanced technology, experienced dentists, and personalized treatment plans for patients of all ages.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={handleOpenBookingDefault}
                  className="px-8 py-4 bg-[#0F6CBD] text-white rounded-xl font-bold shadow-xl shadow-blue-200/40 text-lg hover:scale-105 active:scale-95 transition-all cursor-pointer text-center"
                >
                  Start Your Journey
                </button>
                <a
                  href="tel:+15551234567"
                  className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-50 transition-all text-center"
                >
                  <Phone className="w-5 h-5 text-[#2BB3A3]" />
                  Call Now
                </a>
              </div>

              {/* Stats Row in Hero */}
              <div className="flex items-center justify-center lg:justify-start gap-8 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-2xl font-bold text-slate-900">10+</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Years Experience</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">5,000+</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Happy Patients</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">98%</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Satisfaction</p>
                </div>
              </div>

            </div>

            {/* Hero Right Media (Images collage) */}
            <div className="lg:col-span-6 relative h-[450px]">
              <div className="absolute inset-0 bg-[#2BB3A3] rounded-[40px] rotate-3 opacity-10"></div>
              <div className="absolute inset-0 border-2 border-slate-200 rounded-[40px] -rotate-2"></div>
              
              <div className="relative h-full w-full bg-slate-200 rounded-[40px] overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10"></div>
                <img 
                  src="/src/assets/images/happy_patient_smile_1784401945814.jpg" 
                  alt="Professional Dentist treating a happy smiling patient at Dentis Company" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl flex items-center gap-4 z-20 shadow-lg">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300 overflow-hidden">
                      <img src="/src/assets/images/hero_dentistry_banner_1784401931127.jpg" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-[#0F6CBD] text-white flex items-center justify-center text-[10px] font-bold">+3k</div>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-bold text-slate-900">Join our community</p>
                    <p className="text-[11px] text-slate-500">Rated 4.9/5 stars across review platforms</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. ABOUT US SECTION */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Layout divided into Intro and Doctor Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* About Info Left */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-1.5 bg-primary-light text-primary px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                About Dentis Company
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
                Compassionate Care Meet Modern Dental Science
              </h2>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Dentis Company is established as a trusted dental clinic providing comprehensive oral healthcare. By uniting experienced, compassionate specialists with premium diagnostic tools, we provide dentistry that is comfortable, highly effective, and entirely centered on patient wellbeing.
              </p>

              <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                We know that visiting the dentist can evoke anxiety. That is why our facility has been engineered as a soothing retreat, utilizing digital scanning, same-day scheduling, and highly controlled sedation options to ensure peace of mind.
              </p>

              <div className="pt-2">
                <button 
                  onClick={handleOpenBookingDefault}
                  className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-xl transition-all shadow text-xs uppercase tracking-wider flex items-center gap-2 mx-auto lg:mx-0"
                >
                  <span>Consult with Our Team</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Doctors Presentation Right */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {DOCTORS.map((doctor) => (
                  <div 
                    key={doctor.name}
                    className="bg-slate-50 border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                  >
                    {/* Doctor photo */}
                    <div className="aspect-5/6 rounded-2xl overflow-hidden mb-4 bg-slate-200">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Details */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">
                        {doctor.role}
                      </span>
                      <h4 className="font-bold text-slate-800 text-base">
                        {doctor.name}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        {doctor.specialty}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* 3. SERVICES SECTION */}
      <section id="services" className="py-16 md:py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold uppercase tracking-wider text-xs block">
              Complete Clinical Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              State-Of-The-Art Dental Services
            </h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto">
              Explore our comprehensive suite of 20 dental procedures covering preventative checkups, cosmetic transformations, and advanced surgical restorations.
            </p>
          </div>

          {/* Interactive categorizable searchable grid */}
          <ServicesGrid onBookService={handleBookService} />

        </div>
      </section>


      {/* 4. WHY CHOOSE US SECTION */}
      <section id="why-choose-us" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual illustration Column (Left) */}
            <div className="lg:col-span-5 relative order-last lg:order-first">
              <div className="relative mx-auto max-w-md">
                
                <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-xl border border-slate-150 bg-slate-100">
                  <img 
                    src="/src/assets/images/dental_technology_1784401960143.jpg" 
                    alt="Highly precise advanced dental examination technology at Dentis Company" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Tech floating detail box */}
                <div className="absolute -bottom-6 -right-4 bg-slate-900 text-white p-4 rounded-xl shadow-lg border border-slate-800 max-w-xs space-y-1.5">
                  <p className="text-xs font-bold text-secondary flex items-center gap-1.5 uppercase tracking-wider">
                    <Cpu className="w-3.5 h-3.5" />
                    Our Tech Guarantee
                  </p>
                  <p className="text-[10px] text-slate-300 leading-relaxed font-medium">
                    We utilize intraoral digital scanners, high-definition panoramic X-rays, and soft-tissue lasers to ensure absolute diagnosis accuracy.
                  </p>
                </div>

              </div>
            </div>

            {/* Grid of Values (Right) */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="space-y-3 text-center lg:text-left">
                <span className="text-xs text-primary font-bold uppercase tracking-wider block">
                  The Dentis Standard
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
                  Why Leading Families Trust Our Clinical Practice
                </h2>
                <p className="text-slate-500 text-xs md:text-sm max-w-xl">
                  We blend premium oral healthcare expertise with high patient accommodation, ensuring your physical comfort and long-term diagnostic success.
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WHY_CHOOSE_US.map((item) => (
                  <div 
                    key={item.title}
                    className="p-5 bg-slate-50 border border-slate-100/80 rounded-2xl flex gap-3.5 items-start hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all"
                  >
                    <div className="p-2 bg-white rounded-xl shadow-sm shrink-0 border border-slate-100">
                      {getWhyChooseUsIcon(item.title)}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800 text-sm md:text-base">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* 5. TREATMENT PROCESS SECTION */}
      <section id="process" className="py-16 md:py-24 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 md:mb-16">
            <span className="text-xs text-secondary font-bold uppercase tracking-wider block">
              Clinical Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              Our 4-Step Treatment Process
            </h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto">
              From your initial warm greeting to complete post-care clinical support, here is how we guarantee dental excellence.
            </p>
          </div>

          {/* Timeline Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {/* Background connecting track line (desktop only) */}
            <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200/80 -translate-y-1/2 z-0" />

            {PROCESS_STEPS.map((step, idx) => (
              <div 
                key={step.step}
                className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between relative z-10 hover:shadow-md transition-shadow group h-full"
              >
                <div className="space-y-4">
                  
                  {/* Step Index Circle */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary-light px-2.5 py-1 rounded-full border border-primary/5">
                      Stage {step.step}
                    </span>
                    <span className="text-3xl font-extrabold text-slate-200 group-hover:text-primary/20 transition-colors">
                      {step.step}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-800 text-base md:text-lg">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.description}
                  </p>

                </div>

                {/* Progress tag */}
                <div className="mt-4 text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                  <Clock3 className="w-3.5 h-3.5 text-secondary" />
                  <span>{idx === 0 ? 'Day 1' : idx === 1 ? 'Day 1 Check' : idx === 2 ? 'Active visit' : 'Lifetime support'}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 6. STATISTICS SECTION */}
      <section className="py-12 bg-primary relative overflow-hidden text-white">
        {/* Subtle glowing graphics */}
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-200/90">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 7. BEFORE & AFTER GALLERY */}
      <section id="before-after" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs text-primary font-bold uppercase tracking-wider block">
              Proven Clinical Excellence
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              Smile Transformations
            </h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto">
              Our patient portfolio features real biological dental restorations completed with absolute precision.
            </p>
          </div>

          {/* Interactive comparison element */}
          <InteractiveBeforeAfter />

        </div>
      </section>


      {/* 8. TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-16 md:py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs text-secondary font-bold uppercase tracking-wider block">
              Patient Feedback
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              Testimonials From Happy Families
            </h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto">
              Read how our dedicated team has turned nervous clinical appointments into comfortable, smile-filled visits.
            </p>
          </div>

          {/* Testimonial Slider element */}
          <div className="max-w-3xl mx-auto relative">
            <div className="bg-white rounded-3xl border border-slate-100 p-8 md:p-12 shadow-md relative overflow-hidden">
              
              {/* Giant quote background markup */}
              <div className="absolute top-6 right-8 text-slate-100 text-8xl font-serif select-none pointer-events-none leading-none">
                “
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonialIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: TESTIMONIALS[currentTestimonialIndex].rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400 shrink-0" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-slate-600 text-sm md:text-base leading-relaxed italic font-medium">
                    "{TESTIMONIALS[currentTestimonialIndex].review}"
                  </blockquote>

                  {/* Patient Profile info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-100">
                      <img 
                        src={TESTIMONIALS[currentTestimonialIndex].image} 
                        alt={TESTIMONIALS[currentTestimonialIndex].name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm md:text-base">
                        {TESTIMONIALS[currentTestimonialIndex].name}
                      </h5>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                        {TESTIMONIALS[currentTestimonialIndex].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Carousel navigation indicators */}
            <div className="flex justify-center items-center gap-2 mt-6">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonialIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentTestimonialIndex === idx 
                      ? 'bg-primary w-6' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* 9. FAQ SECTION ACCORDION */}
      <section id="faq" className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Header */}
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs text-primary font-bold uppercase tracking-wider block">
              Knowledge Hub
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto">
              Have clinical queries? Read our transparent answers to questions regarding treatments, emergencies, and payment options.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-primary transition-colors text-sm md:text-base select-none"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-white border border-slate-200 px-2.5 py-0.5 rounded-md shadow-sm">
                        {faq.category}
                      </span>
                      {faq.question}
                    </span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                  </button>
                  
                  {/* Expand panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* 10. CALL TO ACTION SECTION */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary via-primary to-primary-hover relative overflow-hidden text-white text-center">
        
        {/* Subtle graphics */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-xs text-white font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Join the Dentis Family Today
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Ready for a Healthier, Brighter Smile?
          </h2>

          <p className="text-slate-100 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Don’t put your oral hygiene on hold. Book a consult with Metropolis’ leading dentists and experience the premium, pain-free difference.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleOpenBookingDefault}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-primary font-extrabold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-slate-900/10 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer text-xs uppercase tracking-wider"
            >
              Schedule Appointment
            </button>
            <a
              href="#contact"
              className="w-full sm:w-auto border border-white/40 hover:border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-xl transition-all text-center text-xs uppercase tracking-wider"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>


      {/* 11. CONTACT SECTION */}
      <section id="contact" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Details & Map (Left) */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="space-y-3">
                <span className="text-xs text-primary font-bold uppercase tracking-wider block">
                  Reach Out
                </span>
                <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                  We Love to Hear From You
                </h2>
                <p className="text-slate-500 text-xs md:text-sm">
                  Whether you have insurance questions or require immediate emergency care, our dedicated front desk is on standby.
                </p>
              </div>

              {/* Direct Details */}
              <div className="space-y-4 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-3.5 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div className="p-2.5 bg-white rounded-xl shadow-sm text-primary border border-slate-100">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] uppercase tracking-wider">Clinical Telephone</p>
                    <a href="tel:+15551234567" className="text-slate-800 font-bold hover:text-primary transition-colors mt-0.5 block">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div className="p-2.5 bg-white rounded-xl shadow-sm text-primary border border-slate-100">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] uppercase tracking-wider">Secure Email</p>
                    <a href="mailto:care@dentiscompany.com" className="text-slate-800 font-bold hover:text-primary transition-colors mt-0.5 block">
                      care@dentiscompany.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div className="p-2.5 bg-white rounded-xl shadow-sm text-primary border border-slate-100">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] uppercase tracking-wider">Our Address</p>
                    <p className="text-slate-800 font-bold mt-0.5">
                      456 Healthcare Blvd, Suite 100, Metropolis, NY
                    </p>
                  </div>
                </div>
              </div>

              {/* STYLED GOOGLE MAPS PLACEHOLDER */}
              <div className="relative aspect-16/9 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50 flex flex-col justify-between p-5 select-none">
                {/* Visual map design representation */}
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                  <div className="w-full h-full bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-slate-400" />
                  <div className="absolute right-1/4 top-0 bottom-0 w-1.5 bg-slate-400" />
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-400" />
                </div>

                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary-light border border-primary/5 px-2 py-0.5 rounded-full">
                      Dentis Metropolis Office
                    </span>
                    <h5 className="font-bold text-slate-800 text-sm mt-1.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-secondary animate-bounce" />
                      456 Healthcare Blvd, Suite 100
                    </h5>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-slate-200/60 pt-4 mt-8">
                  <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Open Mon - Sat • Parking available
                  </span>
                  
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-white border border-slate-200 hover:border-slate-300 shadow-sm text-slate-700 font-bold px-3.5 py-1.5 rounded-xl transition-all text-xs flex items-center gap-1"
                  >
                    Get Routes
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

            {/* Interactive Contact Form (Right) */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-100 p-6 md:p-10 rounded-3xl shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Send Direct Clinical Inquiry
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-6">
                Our customer coordination team resolves emails within 2 business hours. If this is a clinical emergency, please dial +1 (555) 123-4567 directly.
              </p>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleContactSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Johnathan Doe"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                      {contactErrors.name && <p className="text-rose-500 text-[11px] font-medium mt-1">{contactErrors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                        {contactErrors.email && <p className="text-rose-500 text-[11px] font-medium mt-1">{contactErrors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          placeholder="(555) 000-0000"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Inquiry Message
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Please share what treatment or pricing clarification you seek..."
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      />
                      {contactErrors.message && <p className="text-rose-500 text-[11px] font-medium mt-1">{contactErrors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider mt-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending clinical request...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Send Inquiry
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-box"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center space-y-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">Inquiry Successfully Secured!</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                        Thank you for reaching out. We have logged your message securely. A patient coordinator will review your inquiry and follow up within 2 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="border border-slate-200 hover:bg-slate-50 text-xs text-slate-600 font-bold px-4 py-2 rounded-xl transition-all"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>
      </section>


      {/* 12. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#home" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="text-white text-lg font-bold tracking-tight">
                Dentis <span className="text-secondary">Company</span>
              </span>
            </a>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              State-of-the-art family and cosmetic dentistry focused on patient comfort and biological integrity. Secured in Metropolis.
            </p>
            {/* Social Icons Placeholder */}
            <div className="flex gap-3 pt-2 text-slate-500">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-1.5 bg-slate-800/60 rounded-lg hover:bg-slate-800">
                Instagram
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-1.5 bg-slate-800/60 rounded-lg hover:bg-slate-800">
                Facebook
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-1.5 bg-slate-800/60 rounded-lg hover:bg-slate-800">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider">Quick Links</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Clinical Services</a></li>
              <li><a href="#why-choose-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">Treatment Process</a></li>
            </ul>
          </div>

          {/* Core Services Column */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider">Clinical Focus</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">General & Preventive Care</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Premium Veneers & Makeovers</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Dental Implants & Crowns</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Invisalign Clear Aligners</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Same-Day Emergency Care</a></li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider">Metropolis Studio</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              456 Healthcare Blvd, Suite 100,<br />
              Metropolis, NY 10001
            </p>
            <p className="text-xs text-slate-400">
              Tel: (555) 123-4567<br />
              Email: care@dentiscompany.com
            </p>
            <p className="text-[10px] text-slate-500 font-medium">
              Open Mon-Fri: 8:00 AM - 7:00 PM<br />
              Saturday: 9:00 AM - 4:00 PM
            </p>
          </div>

        </div>

        {/* Legal block */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-[10px] text-slate-500 space-y-2">
          <p>© 2026 Dentis Company. All rights reserved. HIPAA and ADA Compliant Facility.</p>
          <p className="max-w-xl mx-auto leading-relaxed">
            Disclaimer: The clinical diagnostic estimations and guidelines provided on this platform serve an educational purpose. Booking an appointment represents a request; formal verification is completed after visual/physical examination at our clinical facilities.
          </p>
        </div>
      </footer>


      {/* RESPONSIVE FLOATING CALL-TO-ACTIONS */}
      
      {/* Bottom Right: Book Appointment */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3 rounded-full bg-white hover:bg-slate-50 text-slate-600 shadow-xl border border-slate-200 transition-all cursor-pointer hover:-translate-y-0.5 flex items-center justify-center"
            title="Back to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
        
        <button
          onClick={handleOpenBookingDefault}
          className="bg-primary hover:bg-primary-hover text-white font-extrabold p-4 rounded-full shadow-2xl transition-all cursor-pointer flex items-center gap-2 group hover:-translate-y-0.5"
          title="Book Appointment"
        >
          <Calendar className="w-5 h-5 shrink-0" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 text-xs uppercase tracking-wider font-bold whitespace-nowrap">
            Book Appointment
          </span>
        </button>
      </div>

      {/* Bottom Left: Call Now (Mobile / Tablet Only) */}
      <div className="fixed bottom-6 left-6 z-30 md:hidden">
        <a
          href="tel:+15551234567"
          className="bg-secondary hover:bg-secondary-hover text-white p-4 rounded-full shadow-2xl transition-all flex items-center justify-center cursor-pointer"
          title="Call Clinic Now"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>


      {/* MULTI-STEP APPOINTMENT SCHEDULER MODAL */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        initialServiceId={preSelectedServiceId}
      />

    </div>
  );
}
