import { useState, useMemo } from 'react';
import { SERVICES } from '../data';
import { Service } from '../types';
import * as Icons from 'lucide-react';
import { Search, ChevronDown, ChevronUp, CalendarRange, Clock, Tag, X } from 'lucide-react';

// Safe Lucide icon mapper for React
const DynamicIcon = ({ name, className = 'w-6 h-6 text-primary' }: { name: string; className?: string }) => {
  // Map icon names safely
  switch (name) {
    case 'Stethoscope': return <Icons.Stethoscope className={className} />;
    case 'ClipboardCheck': return <Icons.ClipboardCheck className={className} />;
    case 'Sparkles': return <Icons.Sparkles className={className} />;
    case 'ShieldCheck': return <Icons.ShieldCheck className={className} />;
    case 'HeartPulse': return <Icons.HeartPulse className={className} />;
    case 'Baby': return <Icons.Baby className={className} />;
    case 'Activity': return <Icons.Activity className={className} />;
    case 'Scissors': return <Icons.Scissors className={className} />;
    case 'Shield': return <Icons.Shield className={className} />;
    case 'Crown': return <Icons.Crown className={className} />;
    case 'Layers': return <Icons.Layers className={className} />;
    case 'Anchor': return <Icons.Anchor className={className} />;
    case 'LayoutGrid': return <Icons.LayoutGrid className={className} />;
    case 'Sun': return <Icons.Sun className={className} />;
    case 'Heart': return <Icons.Heart className={className} />;
    case 'Smile': return <Icons.Smile className={className} />;
    case 'Grid': return <Icons.Grid className={className} />;
    case 'Flame': return <Icons.Flame className={className} />;
    case 'Syringe': return <Icons.Syringe className={className} />;
    case 'Compass': return <Icons.Compass className={className} />;
    default: return <Icons.Activity className={className} />;
  }
};

interface ServicesGridProps {
  onBookService: (serviceId: string) => void;
}

export default function ServicesGrid({ onBookService }: ServicesGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'general' | 'restorative' | 'cosmetic' | 'specialized'>('all');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  // Filter services dynamically
  const filteredServices = useMemo(() => {
    return SERVICES.filter((s) => {
      const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            s.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleLearnMore = (id: string) => {
    setExpandedServiceId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8">
      {/* Search & Category Filter bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50 border border-slate-100 p-4 rounded-2xl">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {(['all', 'general', 'restorative', 'cosmetic', 'specialized'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap uppercase tracking-wider ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white border border-slate-200/60 text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              {cat === 'all' ? 'All Services' : cat}
            </button>
          ))}
        </div>

        {/* Search input bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search clinical procedures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Grid Results */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const isExpanded = expandedServiceId === service.id;
            return (
              <div
                key={service.id}
                className={`group flex flex-col bg-white rounded-3xl border border-slate-100 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 hover:border-slate-200/80 hover:-translate-y-1 relative overflow-hidden ${
                  isExpanded ? 'ring-1 ring-primary/20 bg-slate-50/10' : ''
                }`}
              >
                {/* Visual Category tag */}
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
                  <div className="absolute top-2 right-2 bg-slate-100 text-[9px] font-bold uppercase tracking-widest text-slate-400 px-2.5 py-1 rounded-full border border-slate-50">
                    {service.category}
                  </div>
                </div>

                {/* Card Icon Header */}
                <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <DynamicIcon name={service.icon} className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <h4 className="text-lg font-bold text-slate-800 tracking-tight leading-snug">
                    {service.title}
                  </h4>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Expandable Clinical Details section */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 bg-slate-50/50 p-3 rounded-xl text-xs text-slate-600">
                    <p className="leading-relaxed font-normal">
                      {service.longDescription}
                    </p>
                    <div className="flex flex-col gap-1 text-[10px] font-semibold text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-primary shrink-0" />
                        <span>Approximate Clinical Duration: <strong className="text-slate-700">{service.duration}</strong></span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-secondary shrink-0" />
                        <span>Fee Assessment: <strong className="text-slate-700">{service.priceEstimate}</strong></span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Buttons Action bar */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => toggleLearnMore(service.id)}
                    className="text-slate-500 hover:text-primary font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    {isExpanded ? 'Hide Details' : 'Learn More'}
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <DynamicIcon name="ChevronDown" className="w-3.5 h-3.5" />}
                  </button>
                  
                  <button
                    onClick={() => onBookService(service.id)}
                    className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-xl transition-all shadow-sm hover:shadow text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <CalendarRange className="w-3.5 h-3.5" />
                    Book Choice
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <Icons.Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h4 className="text-slate-700 font-bold">No dental procedures found</h4>
          <p className="text-slate-400 text-xs mt-1">Try refining your keywords or choosing a different category above.</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} 
            className="mt-4 bg-white border border-slate-200 hover:bg-slate-100 text-xs text-primary font-bold px-4 py-2 rounded-xl transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
