
import React, { useState, useRef, useEffect } from 'react';
import { Session } from '../types';
import { DEFAULT_EVENTS } from '../constants';

interface FloatingAssistantProps {
  onClose: () => void;
  isPro: boolean;
  activeSession: Session;
  onUpdate: (session: Session) => void;
}

const FloatingAssistant: React.FC<FloatingAssistantProps> = ({ onClose, isPro, activeSession, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    offsetRef.current = { x: clientX - position.x, y: clientY - position.y };
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      const newX = Math.max(0, Math.min(window.innerWidth - (isExpanded ? 240 : 60), clientX - offsetRef.current.x));
      const newY = Math.max(0, Math.min(window.innerHeight - (isExpanded ? 180 : 60), clientY - offsetRef.current.y));
      
      setPosition({ x: newX, y: newY });
    };

    const handleUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, isExpanded]);

  const handleIncrement = (id: string) => {
    const currentVal = activeSession.events[id] || 0;
    onUpdate({
      ...activeSession,
      totalSpins: activeSession.totalSpins + 1,
      events: { ...activeSession.events, [id]: currentVal + 1 }
    });
  };

  return (
    <div 
      className={`fixed z-[9999] shadow-2xl transition-all duration-300 ${isExpanded ? 'w-[240px] rounded-2xl bg-slate-900/90 backdrop-blur-md p-3' : 'w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center cursor-pointer'}`}
      style={{ left: position.x, top: position.y }}
    >
      {!isExpanded ? (
        <div 
          className="w-full h-full flex flex-col items-center justify-center text-white"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onClick={() => setIsExpanded(true)}
        >
          <span className="text-xl leading-none">🎯</span>
          <span className="text-[10px] font-black">{activeSession.totalSpins}</span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div 
            className="flex items-center justify-between border-b border-white/10 pb-2 drag-handle"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Assistant</span>
              {isPro && <span className="bg-amber-400 text-slate-900 text-[8px] px-1 rounded font-black">PRO</span>}
            </div>
            <div className="flex gap-2">
                <button onClick={() => setIsExpanded(false)} className="text-white opacity-60 hover:opacity-100">➖</button>
                <button onClick={onClose} className="text-white opacity-60 hover:opacity-100">✖️</button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {DEFAULT_EVENTS.map(event => (
              <button
                key={event.id}
                onClick={() => handleIncrement(event.id)}
                className={`flex flex-col items-center p-2 rounded-xl transition-all active:scale-90 bg-gradient-to-br ${event.color} text-white`}
              >
                <span className="text-xl">{event.icon}</span>
                <span className="text-[10px] font-bold">{activeSession.events[event.id] || 0}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-white bg-white/5 p-2 rounded-lg">
            <span className="text-[10px] font-bold opacity-60">TOTAL SPINS</span>
            <span className="text-sm font-black text-cyan-400">{activeSession.totalSpins}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingAssistant;
