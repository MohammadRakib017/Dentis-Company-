import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { X, Calendar, Clock, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Phone, Mail, User, ShieldCheck } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

const TIME_SLOTS = [
  '08:30 AM', '09:15 AM', '10:00 AM', '10:45 AM', '11:30 AM',
  '01:30 PM', '02:15 PM', '03:00 PM', '03:45 PM', '04:30 PM', '05:15 PM'
];

export default function BookingModal({ isOpen, onClose, initialServiceId = '' }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState(initialServiceId || SERVICES[0].id);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  
  // Patient details
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientNotes, setPatientNotes] = useState('');

  // Validation states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Reset state on close
  const handleClose = () => {
    setStep(1);
    onClose();
  };

  const selectedService = SERVICES.find(s => s.id === serviceId) || SERVICES[0];

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    const today = new Date().toISOString().split('T')[0];
    
    if (!appointmentDate) {
      newErrors.date = 'Please select an appointment date.';
    } else if (appointmentDate < today) {
      newErrors.date = 'Appointment date cannot be in the past.';
    }
    
    if (!appointmentTime) {
      newErrors.time = 'Please pick an available time slot.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!patientName.trim()) {
      newErrors.name = 'Please provide your full name.';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patientEmail.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(patientEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    if (!patientPhone.trim()) {
      newErrors.phone = 'Please provide your contact number.';
    } else if (patientPhone.replace(/\D/g, '').length < 8) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh] z-10"
          >
            
            {/* Upper Banner Accent */}
            <div className="h-1.5 bg-gradient-to-r from-primary to-secondary w-full" />

            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <span className="text-xs text-primary font-bold uppercase tracking-wider">
                  Dentis Company Metropolis
                </span>
                <h3 className="text-xl font-bold text-slate-800 mt-0.5">
                  {step === 3 ? 'Appointment Confirmed' : 'Book Dental Consultation'}
                </h3>
              </div>
              <button 
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Indicators */}
            {step < 3 && (
              <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-4 text-xs font-semibold text-slate-500 select-none">
                <div className="flex items-center gap-1.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step >= 1 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    1
                  </span>
                  <span className={step === 1 ? 'text-primary font-bold' : ''}>Treatment & Timing</span>
                </div>
                <div className="h-px bg-slate-200 flex-1" />
                <div className="flex items-center gap-1.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step >= 2 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    2
                  </span>
                  <span className={step === 2 ? 'text-primary font-bold' : ''}>Patient Information</span>
                </div>
              </div>
            )}

            {/* Scrollable Form Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              <AnimatePresence mode="wait">
                
                {/* STEP 1: SERVICE & TIMING */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    {/* Service Selection */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Select Dental Service
                      </label>
                      <select
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title} ({s.priceEstimate})
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        Estimated duration: <span className="font-semibold text-slate-500">{selectedService.duration}</span>. {selectedService.description}
                      </p>
                    </div>

                    {/* Date picker */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                          Choose Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                          <input
                            type="date"
                            value={appointmentDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => {
                              setAppointmentDate(e.target.value);
                              if (errors.date) setErrors(prev => ({ ...prev, date: '' }));
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          />
                        </div>
                        {errors.date && <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.date}</p>}
                      </div>

                      {/* Time slot indicator */}
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                          Duration & Fee
                        </label>
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-xs text-slate-500 space-y-1">
                          <div className="flex justify-between">
                            <span>Clinical Time:</span>
                            <span className="font-semibold text-slate-700">{selectedService.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Est. Starting Fee:</span>
                            <span className="font-semibold text-primary">{selectedService.priceEstimate}</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-slate-200 text-[10px]">
                            <span>Insurance coverage:</span>
                            <span className="text-emerald-600 font-medium">95%+ direct filing</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Select Preferred Time Slot
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {TIME_SLOTS.map((time) => (
                          <button
                            type="button"
                            key={time}
                            onClick={() => {
                              setAppointmentTime(time);
                              if (errors.time) setErrors(prev => ({ ...prev, time: '' }));
                            }}
                            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all border ${
                              appointmentTime === time
                                ? 'bg-primary border-primary text-white shadow-md'
                                : 'bg-slate-50 border-slate-200/60 hover:border-slate-300 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <Clock className="w-3 h-3 inline mr-1 -mt-0.5" />
                            {time}
                          </button>
                        ))}
                      </div>
                      {errors.time && <p className="text-rose-500 text-xs mt-2 font-medium">{errors.time}</p>}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: PATIENT DETAILS */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="bg-primary-light text-slate-700 rounded-xl p-3.5 text-xs flex items-start gap-2.5 border border-primary/10">
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <p>
                        Your details are completely confidential. We adhere strictly to HIPAA guidelines for dental diagnostics and security.
                      </p>
                    </div>

                    {/* Full name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Dr. John Doe"
                          value={patientName}
                          onChange={(e) => {
                            setPatientName(e.target.value);
                            if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                      {errors.name && <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            placeholder="john@example.com"
                            value={patientEmail}
                            onChange={(e) => {
                              setPatientEmail(e.target.value);
                              if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          />
                        </div>
                        {errors.email && <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                          <input
                            type="tel"
                            placeholder="(555) 000-0000"
                            value={patientPhone}
                            onChange={(e) => {
                              setPatientPhone(e.target.value);
                              if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          />
                        </div>
                        {errors.phone && <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                        Clinical Symptoms or Specific Goals (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Please share any tooth sensitivity, history of anxiety, or aesthetic goals..."
                        value={patientNotes}
                        onChange={(e) => setPatientNotes(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: SUCCESS CONFIRMATION */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', duration: 0.6 }}
                    className="py-6 text-center space-y-6"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100">
                      <CheckCircle2 className="w-10 h-10 animate-bounce" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-2xl font-bold text-slate-800">Appointment Scheduled!</h4>
                      <p className="text-sm text-slate-500 max-w-md mx-auto">
                        Thank you, <span className="font-semibold text-slate-800">{patientName}</span>. Your reservation has been clinically secured. A formal calendar invite and digital registration papers have been sent to <span className="font-semibold text-slate-800">{patientEmail}</span>.
                      </p>
                    </div>

                    {/* Summary Card */}
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 max-w-md mx-auto text-left space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Dentist Facility:</span>
                        <span className="font-bold text-slate-700">Dentis Company Metropolis</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Treatment:</span>
                        <span className="font-bold text-primary">{selectedService.title}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Date of Visit:</span>
                        <span className="font-bold text-slate-700">{new Date(appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Secure Time:</span>
                        <span className="font-bold text-slate-700">{appointmentTime}</span>
                      </div>
                    </div>

                    {/* Guidelines and instructions */}
                    <div className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed border-t border-slate-100 pt-4">
                      <span className="font-bold text-slate-500 block mb-1">Pre-visit clinical checklist:</span>
                      • Please arrive 10 minutes prior to {appointmentTime} for initial documentation.<br />
                      • Bring a valid government ID and electronic insurance card if filing.<br />
                      • Do not consume heavy beverages within 1 hour of the visit.
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

            </div>

            {/* Footer Navigation Buttons */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              {step === 1 && (
                <>
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    Same-day insurance clearance
                  </div>
                  <button
                    onClick={handleNext}
                    className="bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-primary/25 hover:shadow-lg flex items-center gap-1.5 cursor-pointer text-sm"
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <button
                    onClick={handleBack}
                    className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-semibold py-2.5 px-5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-primary/25 hover:shadow-lg flex items-center gap-1.5 cursor-pointer text-sm"
                  >
                    Confirm Booking
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </>
              )}

              {step === 3 && (
                <button
                  onClick={handleClose}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl transition-all text-sm shadow-md"
                >
                  Return to Home
                </button>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
