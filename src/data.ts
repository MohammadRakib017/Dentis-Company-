import { Service, FAQItem, Testimonial, BeforeAfterCase } from './types';

export const SERVICES: Service[] = [
  // General Dentistry
  {
    id: 'general-dentistry',
    title: 'General Dentistry',
    category: 'general',
    description: 'Comprehensive preventive care, diagnostic exams, and standard maintenance for patients of all ages.',
    icon: 'Stethoscope',
    longDescription: 'Our general dentistry services serve as the foundation of your oral health. We focus on regular assessments, diagnostics using state-of-the-art digital X-rays, and customized preventative planning. Our goal is to catch issues early and maintain a healthy environment for your gums and teeth.',
    duration: '45-60 mins',
    priceEstimate: 'From $120'
  },
  {
    id: 'dental-checkups',
    title: 'Dental Checkups',
    category: 'general',
    description: 'Thorough clinical examinations, digital diagnostics, and oral cancer screenings for early detection.',
    icon: 'ClipboardCheck',
    longDescription: 'Regular checkups are essential for long-term health. We conduct precision examinations of your teeth, gums, and surrounding bone structures, paired with visual screening for any abnormalities. This proactive approach prevents advanced decay or periodontal problems.',
    duration: '30-45 mins',
    priceEstimate: 'From $90'
  },
  {
    id: 'teeth-cleaning',
    title: 'Teeth Cleaning',
    category: 'general',
    description: 'Professional plaque and tartar removal with gentle scaling, polishing, and customized hygiene advice.',
    icon: 'Sparkles',
    longDescription: 'Our registered dental hygienists utilize advanced ultrasonic scaling and polishing tools to remove stubborn plaque, tartar (calculus), and light superficial stains. This professional cleaning reduces inflammation and leaves your breath fresh and your smile bright.',
    duration: '45-60 mins',
    priceEstimate: 'From $110'
  },
  {
    id: 'fillings',
    title: 'Fillings',
    category: 'general',
    description: 'Durable, tooth-colored composite resin fillings to restore decayed, chipped, or worn-down teeth.',
    icon: 'ShieldCheck',
    longDescription: 'We offer advanced metal-free composite restorations that bond directly to your natural tooth structure. These tooth-colored fillings are custom-shaded to match your surrounding enamel perfectly, preserving your smile\'s natural beauty while restoring physical integrity.',
    duration: '30-60 mins',
    priceEstimate: 'From $150'
  },
  {
    id: 'gum-disease-treatment',
    title: 'Gum Disease Treatment',
    category: 'general',
    description: 'Deep scaling, root planing, and antimicrobial therapy to reverse or manage periodontal disease.',
    icon: 'HeartPulse',
    longDescription: 'Periodontal health is critical for overall systemic health. We offer non-surgical deep cleanings (scaling and root planing) to remove deep subgingival tartar and bacterial colonies, combined with laser or localized antibiotic treatments to promote tissue attachment and healing.',
    duration: '60-90 mins',
    priceEstimate: 'From $250 / quadrant'
  },
  {
    id: 'pediatric-dentistry',
    title: 'Pediatric Dentistry',
    category: 'general',
    description: 'Friendly, gentle, and fun oral care tailored to kids, building confident and lifelong healthy habits.',
    icon: 'Baby',
    longDescription: 'We specialize in gentle care for children, focusing on education, sealants, flouride protection, and making visits fun and fear-free. Our welcoming environment ensures your child develops positive, lifelong associations with professional dental care.',
    duration: '30-45 mins',
    priceEstimate: 'From $95'
  },

  // Restorative
  {
    id: 'root-canal-treatment',
    title: 'Root Canal Treatment',
    category: 'restorative',
    description: 'Pain-free therapy to save infected, deeply decayed teeth and restore healthy function.',
    icon: 'Activity',
    longDescription: 'A root canal is a highly routine procedure designed to rescue an infected tooth from extraction. By carefully removing infected pulp, sterilizing the root canals, and sealing them with biocompatible materials, we eliminate pain and preserve your natural tooth structure.',
    duration: '60-90 mins',
    priceEstimate: 'From $750'
  },
  {
    id: 'tooth-extractions',
    title: 'Tooth Extractions',
    category: 'restorative',
    description: 'Safe, gentle, and completely comfortable removal of non-savable or damaged teeth.',
    icon: 'Scissors',
    longDescription: 'When a tooth is cracked, severely decayed, or impacted beyond repair, a professional extraction is handled with the utmost care. We prioritize patient comfort with localized anesthesia and detailed post-care instructions to ensure rapid, painless recovery.',
    duration: '30-60 mins',
    priceEstimate: 'From $180'
  },
  {
    id: 'wisdom-tooth-removal',
    title: 'Wisdom Tooth Removal',
    category: 'restorative',
    description: 'Expert extraction of impacted or troublesome third molars to prevent crowding and pain.',
    icon: 'Shield',
    longDescription: 'Wisdom teeth often emerge with insufficient space, causing severe pain, infection, or crowding of surrounding teeth. Our advanced surgical extraction techniques ensure minimal swelling, high comfort, and a rapid return to your normal routine.',
    duration: '45-90 mins',
    priceEstimate: 'From $250'
  },
  {
    id: 'dental-crowns',
    title: 'Dental Crowns',
    category: 'restorative',
    description: 'Custom, high-strength porcelain caps to reinforce, protect, and completely restore weakened teeth.',
    icon: 'Crown',
    longDescription: 'A custom-designed dental crown wraps around a weak or damaged tooth, restoring its natural shape, size, strength, and function. Crafted from premium porcelain, zirconia, or metal-ceramic materials, our crowns look and perform exactly like healthy natural enamel.',
    duration: '2 visits (60m each)',
    priceEstimate: 'From $950'
  },
  {
    id: 'dental-bridges',
    title: 'Dental Bridges',
    category: 'restorative',
    description: 'Elegant, fixed tooth replacements that span the gap left by one or more missing adjacent teeth.',
    icon: 'Layers',
    longDescription: 'A dental bridge literally bridges the gap created by one or more missing teeth. It consists of custom artificial teeth anchored securely on either side by beautiful, natural-looking porcelain crowns, restoring complete chewing ability and dynamic smile cosmetics.',
    duration: '2 visits (60m each)',
    priceEstimate: 'From $1,800'
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    category: 'restorative',
    description: 'Permanent, surgical-grade titanium posts that act as natural tooth roots for lifetime replacements.',
    icon: 'Anchor',
    longDescription: 'Dental implants represent the gold standard of modern tooth replacement. A titanium screw is gently embedded into the jawbone, serving as a robust foundation for a custom porcelain crown. Implants look, feel, and function identical to healthy, lifetime teeth.',
    duration: 'Multi-stage (3-6 mo)',
    priceEstimate: 'From $2,400'
  },
  {
    id: 'dentures',
    title: 'Dentures',
    category: 'restorative',
    description: 'High-quality, comfortable, and natural-looking full or partial removable prosthetic teeth.',
    icon: 'LayoutGrid',
    longDescription: 'Whether you require full or partial dentures, our modern, lightweight custom prosthetics are custom-shaped to fit your gum lines comfortably. They restore natural speech, ease of chewing, and provide healthy facial muscle support with high-quality materials.',
    duration: '3-4 visits',
    priceEstimate: 'From $1,200'
  },

  // Cosmetic
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    category: 'cosmetic',
    description: 'Professional in-office or take-home whitening treatments for a dramatically brighter smile.',
    icon: 'Sun',
    longDescription: 'Our medical-grade teeth whitening treatments safely break down deep enamel stains caused by coffee, tea, aging, and smoking. Choose between an ultra-fast, 1-hour professional in-office session (up to 8 shades brighter) or customized take-home trays.',
    duration: '60 mins',
    priceEstimate: 'From $299'
  },
  {
    id: 'dental-veneers',
    title: 'Dental Veneers',
    category: 'cosmetic',
    description: 'Ultra-thin, custom porcelain shells bonded to the front of teeth for a flawless cosmetic appearance.',
    icon: 'Heart',
    longDescription: 'Porcelain veneers are ultra-thin shells custom-sculpted to cover the front surface of your teeth. Ideal for masking discoloration, chips, minor gaps, or misalignment, veneers create a stunning, symmetrical, and permanently bright movie-star smile.',
    duration: '2 visits (75m each)',
    priceEstimate: 'From $1,100 / tooth'
  },
  {
    id: 'smile-makeovers',
    title: 'Smile Makeovers',
    category: 'cosmetic',
    description: 'Comprehensive, personalized combinations of treatments to design and build your dream smile.',
    icon: 'Smile',
    longDescription: 'A comprehensive Smile Makeover integrates multiple aesthetic treatments—such as whitening, veneers, crowns, and clear aligners—into a structured, personalized master plan. We design your new smile in harmony with your facial symmetry, lips, and unique features.',
    duration: 'Variable timeline',
    priceEstimate: 'Custom Consultation'
  },
  {
    id: 'braces-clear-aligners',
    title: 'Braces & Clear Aligners',
    category: 'cosmetic',
    description: 'Expert orthodontic treatments using comfortable clear aligners or standard gentle braces.',
    icon: 'Grid',
    longDescription: 'We offer state-of-the-art orthodontic solutions for teens and adults, featuring Invisalign clear aligners and modern low-profile braces. Straighten your teeth discreetly, comfortably, and efficiently with customized digital aligner mapping.',
    duration: '6-18 months',
    priceEstimate: 'From $3,500'
  },

  // Specialized Care
  {
    id: 'emergency-dental-care',
    title: 'Emergency Dental Care',
    category: 'specialized',
    description: 'Immediate, same-day relief for toothaches, broken teeth, trauma, and acute dental pain.',
    icon: 'Flame',
    longDescription: 'We reserve emergency slots daily to address sudden trauma, severe throbbing toothaches, lost crowns, or broken teeth immediately. Our compassionate emergency team focuses on rapid pain relief and stabilizing your dental structures on the same day.',
    duration: '30-60 mins',
    priceEstimate: 'From $150 (Emergency fee)'
  },
  {
    id: 'oral-surgery',
    title: 'Oral Surgery',
    category: 'specialized',
    description: 'Expert, highly controlled bone grafting, sinus lifts, and advanced oral surgical procedures.',
    icon: 'Syringe',
    longDescription: 'From bone grafting and sinus lifts to complex extractions, our clinic offers comprehensive surgical services in-house. Guided by advanced 3D scanning, our surgery protocols minimize recovery time and maximize structural healing.',
    duration: '45-90 mins',
    priceEstimate: 'Based on consultation'
  },
  {
    id: 'tmj-treatment',
    title: 'TMJ Treatment',
    category: 'specialized',
    description: 'Custom night guards, jaw physical therapy, and target procedures to relieve TMJ pain and teeth grinding.',
    icon: 'Compass',
    longDescription: 'Temporomandibular Joint (TMJ) disorders cause jaw clicking, headaches, neck stiffness, and tooth wear from chronic grinding (bruxism). We offer custom-molded night guards, bite adjustment therapies, and laser therapy to soothe tense joints and protect teeth.',
    duration: '45 mins',
    priceEstimate: 'From $450'
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Experienced Dentists',
    description: 'Our team consists of highly certified, board-recognized clinicians who undergo continuous training in cutting-edge techniques.',
    icon: 'Award'
  },
  {
    title: 'Latest Dental Technology',
    description: 'From 3D digital scanners and digital X-rays with 90% less radiation to comfortable laser dentistry, we invest in absolute precision.',
    icon: 'Cpu'
  },
  {
    title: 'Personalized Treatment',
    description: 'We do not believe in one-size-fits-all. Every treatment plan is uniquely crafted around your long-term goals and comfort levels.',
    icon: 'UserCheck'
  },
  {
    title: 'Comfortable Environment',
    description: 'Enjoy a spa-like clinic featuring soothing background acoustics, ceiling-mounted TV displays, and optional sedation options.',
    icon: 'HeartHandshake'
  },
  {
    title: 'Emergency Appointments',
    description: 'Severe pain can occur unexpectedly. We reserve priority scheduling slots daily for urgent care so you never have to wait.',
    icon: 'Zap'
  },
  {
    title: 'Affordable & Transparent Pricing',
    description: 'Clear upfront estimations, flexible multi-stage payment options, and direct-to-insurance electronic filing for your ease.',
    icon: 'DollarSign'
  },
  {
    title: 'Flexible Scheduling',
    description: 'Convenient early morning, evening, and weekend booking options to accommodate busy family, student, and work timetables.',
    icon: 'CalendarDays'
  },
  {
    title: 'Patient-Focused Care',
    description: 'We actively listen, address anxieties, and prioritize patient comfort and consent. Every visit is tailored around your ease.',
    icon: 'Smile'
  }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Consultation',
    description: 'Meet our friendly team, share your visual/physical goals, and discuss clinical history in a relaxed, non-judgmental atmosphere.'
  },
  {
    step: '02',
    title: 'Examination & Diagnosis',
    description: 'Advanced dental imaging, digital 3D scans, and clinical checks are used to build an incredibly accurate map of your oral structure.'
  },
  {
    step: '03',
    title: 'Personalized Treatment',
    description: 'We outline options clearly, align with your budget, and complete treatments with state-of-the-art pain-free technology.'
  },
  {
    step: '04',
    title: 'Follow-Up Care',
    description: 'We provide clear digital recovery guidelines, routine maintenance schedules, and ongoing care to protect your investment.'
  }
];

export const STATS = [
  { value: '10+', label: 'Years Experience' },
  { value: '5000+', label: 'Happy Patients' },
  { value: '20+', label: 'Dental Services' },
  { value: '98%', label: 'Patient Satisfaction' }
];

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: 'smile-makeover-1',
    title: 'Full Porcelain Veneers',
    description: 'Restoration of chipped, misaligned, and discolored front teeth using 8 custom premium porcelain veneers.',
    category: 'Cosmetic Veneers',
    // Using high quality placeholders designed to contrast well as before-after
    beforeImage: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600&h=450',
    afterImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600&h=450'
  },
  {
    id: 'smile-makeover-2',
    title: 'Professional Laser Whitening',
    description: 'Removal of heavy coffee and tobacco discoloration in a single, comfortable 1-hour in-office whitening session.',
    category: 'Teeth Whitening',
    beforeImage: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600&h=450',
    afterImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600&h=450'
  },
  {
    id: 'smile-makeover-3',
    title: 'Invisalign Aligner Therapy',
    description: 'Correction of severe crowding and bite misalignment over a period of 12 months using clear aligners.',
    category: 'Clear Aligners',
    beforeImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600&h=450',
    afterImage: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600&h=450'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'How often should I visit the dentist?',
    answer: 'For most children and adults, we highly recommend scheduling a professional dental checkup and thorough cleaning every six months (twice a year). However, patients with historical gum issues, active orthodontics, or prone to rapid decay may benefit from custom schedules of every 3 to 4 months.',
    category: 'General'
  },
  {
    question: 'Do you offer emergency dental care?',
    answer: 'Yes! We prioritize dental emergencies. If you have a severe throbbing toothache, a broken crown, a knocked-out tooth, or facial trauma, contact us immediately. We save priority slots in our schedule daily to ensure same-day pain relief and treatment.',
    category: 'Emergency'
  },
  {
    question: 'Are dental implants permanent?',
    answer: 'With professional surgical placement, high bone density, and excellent daily hygiene maintenance, dental implants are designed to be a permanent, lifetime tooth-replacement solution. The medical-grade titanium post fuses directly with your jawbone, behaving exactly like a healthy natural tooth root.',
    category: 'Restorative'
  },
  {
    question: 'Do you treat children?',
    answer: 'Absolutely! Our compassionate team specializes in pediatric dentistry. We have a welcoming environment specifically calibrated to ease children\'s anxieties, teaching them proper brushing and flossing habits in a fun, positive, and fear-free environment.',
    category: 'Pediatric'
  },
  {
    question: 'What payment options are available?',
    answer: 'To ensure absolute convenience, we offer direct electronic billing to most major dental insurance plans. For any out-of-pocket expenses or comprehensive multi-stage makeovers, we support cash, credit cards, Apple Pay, interest-free payment plans, and healthcare financing options.',
    category: 'Insurance & Billing'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Sarah Jenkins',
    role: 'Teacher & Mom',
    review: 'I had avoided the dentist for over 4 years out of pure anxiety. The team at Dentis Company treated me with exceptional patience and complete gentleness. My whitening and cleaning were entirely pain-free. I can finally smile with 100% confidence!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 't-2',
    name: 'David Carter',
    role: 'Software Engineer',
    review: 'The technology they use is absolute state-of-the-art. No messy molds or uncomfortable trays—they mapped my entire mouth in seconds with an intraoral 3D scanner for my aligners. Incredibly organized, professional staff and transparent pricing.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 't-3',
    name: 'Elena Rostova',
    role: 'Local Business Owner',
    review: 'My daughter actually looks forward to visiting Dentis! The pediatric dentists are brilliant—they explained everything like a fun game. We have had cleanings, fillings, and sealants done here. Clean clinic and zero wait times.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 't-4',
    name: 'Marcus Thorne',
    role: 'Retired Architect',
    review: 'I received two dental implants to restore my missing molars. The entire process—from initial digital surgical mapping to custom crown placement—was incredibly smooth. The quality of fit and color matching is indistinguishable from my natural teeth.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

export const DOCTORS = [
  {
    name: 'Dr. Evelyn Ross, DDS',
    role: 'Lead Cosmetic & Restorative Dentist',
    specialty: 'Columbia University graduate with 12+ years experience in advanced veneers and full smile makeovers.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=500'
  },
  {
    name: 'Dr. Adrian Mercer, DMD',
    role: 'Specialist Oral Surgeon & Implantologist',
    specialty: 'Harvard Dental Medicine residency, expert in dental implants, complex extractions, and computer-guided bone tissue surgery.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=500'
  }
];
