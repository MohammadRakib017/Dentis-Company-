export interface Service {
  id: string;
  title: string;
  category: 'general' | 'cosmetic' | 'restorative' | 'specialized';
  description: string;
  icon: string; // name of Lucide icon
  longDescription: string;
  duration: string;
  priceEstimate: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  image: string;
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  category: string;
}

export interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  date: string;
  time: string;
  notes?: string;
}
