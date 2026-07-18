import { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';
import { BEFORE_AFTER_CASES } from '../data';
import { Eye, ArrowLeftRight, Sparkles } from 'lucide-react';

export default function InteractiveBeforeAfter() {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCase = BEFORE_AFTER_CASES[activeCaseIndex];

  // Handle position update
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  // Add global mouse up listener to stop dragging if cursor leaves container
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-100 p-6 md:p-10 shadow-xl shadow-slate-100/40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Info Column (Left) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Before & After Gallery
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
            Real Results, Beautiful Smiles
          </h3>
          
          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            Slide the handle to view the remarkable, biological transformation our team achieved. Click the case studies below to explore different cosmetic treatments.
          </p>

          {/* Case Study Buttons */}
          <div className="space-y-3 pt-2">
            {BEFORE_AFTER_CASES.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveCaseIndex(index);
                  setSliderPosition(50);
                }}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between border ${
                  activeCaseIndex === index
                    ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary'
                    : 'border-slate-100 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <div>
                  <p className={`text-xs font-semibold ${activeCaseIndex === index ? 'text-primary' : 'text-slate-500'}`}>
                    {item.category}
                  </p>
                  <h4 className="font-bold text-slate-800 text-sm md:text-base mt-0.5">{item.title}</h4>
                </div>
                <div className={`p-2 rounded-lg ${activeCaseIndex === index ? 'bg-primary text-white' : 'bg-white text-slate-400 border border-slate-100'}`}>
                  <Eye className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mt-4">
            <h5 className="font-semibold text-slate-700 text-sm flex items-center gap-1.5">
              Clinical Assessment
            </h5>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {activeCase.description} All procedures were completed in our specialized Metropolis studio with high-grade medical composites and custom porcelain.
            </p>
          </div>
        </div>

        {/* Dynamic Comparison Slider (Right) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          
          {/* Comparison Container */}
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="relative w-full aspect-4/3 rounded-2xl overflow-hidden select-none cursor-ew-resize shadow-lg shadow-slate-200 border border-slate-200"
          >
            {/* After Image (Background) */}
            <img 
              src={activeCase.afterImage} 
              alt={`${activeCase.title} - After`}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 right-4 bg-primary text-white font-semibold text-xs tracking-wider uppercase px-3 py-1 rounded-full shadow-md z-10">
              After Treatment
            </div>

            {/* Before Image (Foreground, clipped) */}
            <div 
              className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src={activeCase.beforeImage} 
                alt={`${activeCase.title} - Before`}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ width: containerRef.current?.getBoundingClientRect().width || '100vw', maxWidth: 'none' }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-slate-900/90 text-white font-semibold text-xs tracking-wider uppercase px-3 py-1 rounded-full shadow-md z-10">
                Before Treatment
              </div>
            </div>

            {/* Slider Divider bar and handle */}
            <div 
              className="absolute inset-y-0 w-1 bg-white cursor-ew-resize flex items-center justify-center z-20"
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={handleMouseDown}
            >
              {/* Slider Handle Button */}
              <div 
                className="w-10 h-10 rounded-full bg-white border-2 border-primary shadow-xl flex items-center justify-center transition-transform hover:scale-115 active:scale-95 cursor-grab"
                style={{ marginLeft: '-18px' }}
              >
                <ArrowLeftRight className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 text-xs text-slate-400 font-medium">
            <ArrowLeftRight className="w-3.5 h-3.5 animate-pulse" />
            Drag or swipe the white handle to compare
          </div>

        </div>
      </div>
    </div>
  );
}
