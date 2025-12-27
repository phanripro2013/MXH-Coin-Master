
import React from 'react';
import { Session, AppTheme } from '../types';
import { DEFAULT_EVENTS } from '../constants';

interface HistoryLogProps {
  sessions: Session[];
  t: any;
  isPro: boolean;
  theme: AppTheme;
}

const HistoryLog: React.FC<HistoryLogProps> = ({ sessions, t, isPro, theme }) => {
  const visibleSessions = isPro ? sessions : sessions.slice(0, 3);

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-black uppercase tracking-tight">{t.history}</h2>
        {!isPro && <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-full font-bold">GIỚI HẠN 3 NGÀY</span>}
      </div>

      {visibleSessions.length === 0 ? (
        <div className="py-20 text-center opacity-40">Chưa có dữ liệu nào được lưu.</div>
      ) : (
        <div className="space-y-4">
          {visibleSessions.map(session => (
            <div 
              key={session.id} 
              className={`p-4 rounded-3xl shadow-md transition-all ${theme === AppTheme.DARK ? 'bg-slate-800' : 'bg-white'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">
                    {new Date(session.date).toLocaleDateString('vi-VN', { weekday: 'long' })}
                  </p>
                  <p className="text-sm font-bold">
                    {new Date(session.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{t.totalSpins}</p>
                  <p className="text-xl font-black text-indigo-500 tabular-nums">{session.totalSpins}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {DEFAULT_EVENTS.map(event => {
                  const count = session.events[event.id] || 0;
                  if (count === 0) return null;
                  return (
                    <div key={event.id} className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-lg">
                      <span>{event.icon}</span>
                      <span className="text-xs font-bold tabular-nums">{count}</span>
                    </div>
                  );
                })}
              </div>

              {session.note && (
                <div className="mt-3 p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-xs opacity-60 italic">
                  "{session.note}"
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryLog;
