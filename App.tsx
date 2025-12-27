
import React, { useState, useEffect, useCallback } from 'react';
import { AppTheme, AppLanguage, Session, EventType } from './types';
import { DEFAULT_EVENTS, TRANSLATIONS } from './constants';
import FloatingAssistant from './components/FloatingAssistant';
import StatsDashboard from './components/StatsDashboard';
import HistoryLog from './components/HistoryLog';
import SettingsView from './components/SettingsView';
import ProUpsell from './components/ProUpsell';

const App: React.FC = () => {
  // State
  const [isPro, setIsPro] = useState<boolean>(false);
  const [theme, setTheme] = useState<AppTheme>(AppTheme.LIGHT);
  const [language, setLanguage] = useState<AppLanguage>(AppLanguage.VI);
  const [isAssistantVisible, setIsAssistantVisible] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'stats' | 'settings'>('home');
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSession, setActiveSession] = useState<Session>({
    id: Date.now().toString(),
    date: new Date().toISOString(),
    totalSpins: 0,
    events: {}
  });

  const t = TRANSLATIONS[language];

  // Load persistence
  useEffect(() => {
    const savedSessions = localStorage.getItem('esc_sessions');
    if (savedSessions) setSessions(JSON.parse(savedSessions));
    
    const savedPro = localStorage.getItem('esc_is_pro');
    if (savedPro === 'true') {
      setIsPro(true);
      const savedTheme = localStorage.getItem('esc_theme') as AppTheme;
      if (savedTheme) setTheme(savedTheme);
    }
  }, []);

  const handleTogglePro = () => {
    const newPro = !isPro;
    setIsPro(newPro);
    localStorage.setItem('esc_is_pro', String(newPro));
  };

  const handleUpdateActiveSession = useCallback((newSession: Session) => {
    setActiveSession(newSession);
  }, []);

  const saveCurrentSession = () => {
    const updated = [activeSession, ...sessions.slice(0, isPro ? 100 : 2)];
    setSessions(updated);
    localStorage.setItem('esc_sessions', JSON.stringify(updated));
    // Reset active
    setActiveSession({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      totalSpins: 0,
      events: {}
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === AppTheme.DARK ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Background Simulation Layer */}
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col p-4">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl shadow-lg flex items-center justify-center text-white text-xl">
              🎯
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Event Spin Counter</h1>
              <p className="text-xs font-medium opacity-60">Manual Assistant</p>
            </div>
          </div>
          {isPro ? (
            <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-amber-200">
              PRO UNLOCKED
            </span>
          ) : (
            <button 
              onClick={() => setActiveTab('settings')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase transition-all shadow-md active:scale-95"
            >
              FREE VERSION
            </button>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {activeTab === 'home' && (
            <div className="space-y-6">
              <div className={`p-6 rounded-3xl shadow-xl transition-all ${theme === AppTheme.DARK ? 'bg-slate-800' : 'bg-white'}`}>
                <div className="text-center space-y-2 mb-8">
                  <span className="text-sm font-semibold opacity-60 uppercase tracking-widest">{t.totalSpins}</span>
                  <div className="text-6xl font-black text-indigo-500 tracking-tighter tabular-nums">
                    {activeSession.totalSpins}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {DEFAULT_EVENTS.map(event => (
                    <button
                      key={event.id}
                      onClick={() => {
                        const currentVal = activeSession.events[event.id] || 0;
                        handleUpdateActiveSession({
                          ...activeSession,
                          totalSpins: activeSession.totalSpins + 1,
                          events: { ...activeSession.events, [event.id]: currentVal + 1 }
                        });
                      }}
                      className={`relative overflow-hidden group p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all active:scale-95 shadow-lg bg-gradient-to-br ${event.color} text-white`}
                    >
                      <span className="text-3xl transform group-active:scale-125 transition-transform">{event.icon}</span>
                      <span className="font-bold text-sm">{event.name}</span>
                      <span className="absolute top-2 right-2 bg-white/20 px-2 py-0.5 rounded-lg text-xs font-mono">
                        {activeSession.events[event.id] || 0}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 mt-8">
                  <button 
                    onClick={() => {
                      if (activeSession.totalSpins > 0) {
                        handleUpdateActiveSession({
                          ...activeSession,
                          totalSpins: Math.max(0, activeSession.totalSpins - 1)
                        });
                      }
                    }}
                    className="flex-1 py-3 rounded-2xl bg-slate-100 dark:bg-slate-700 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    {t.undo}
                  </button>
                  <button 
                    onClick={saveCurrentSession}
                    className="flex-1 py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold text-sm hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                  >
                    {t.reset}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-600 text-white shadow-lg overflow-hidden relative">
                <div className="flex-1 z-10">
                  <h3 className="font-bold text-sm">{t.floatingAssistant}</h3>
                  <p className="text-xs opacity-80">{t.activeAssistant} overlay</p>
                </div>
                <button 
                  onClick={() => setIsAssistantVisible(!isAssistantVisible)}
                  className={`w-12 h-6 rounded-full relative transition-colors z-10 ${isAssistantVisible ? 'bg-white' : 'bg-white/30'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${isAssistantVisible ? 'right-1 bg-indigo-600' : 'left-1 bg-white'}`}></div>
                </button>
                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
                  <div className="text-9xl">🎈</div>
                </div>
              </div>

              {!isPro && <ProUpsell onUpgrade={handleTogglePro} theme={theme} />}
            </div>
          )}

          {activeTab === 'history' && (
            <HistoryLog sessions={sessions} t={t} isPro={isPro} theme={theme} />
          )}

          {activeTab === 'stats' && (
            <StatsDashboard sessions={sessions} t={t} isPro={isPro} theme={theme} />
          )}

          {activeTab === 'settings' && (
            <SettingsView 
              isPro={isPro} 
              theme={theme} 
              language={language}
              onThemeChange={setTheme}
              onLangChange={setLanguage}
              onUpgrade={handleTogglePro}
              t={t}
            />
          )}
        </main>

        {/* Navigation Bar */}
        <nav className={`fixed bottom-0 left-0 right-0 p-3 pb-8 flex justify-around items-center border-t transition-colors ${theme === AppTheme.DARK ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} z-50`}>
          <NavButton active={activeTab === 'home'} icon="🏠" label={t.reset} onClick={() => setActiveTab('home')} />
          <NavButton active={activeTab === 'history'} icon="📜" label={t.history} onClick={() => setActiveTab('history')} />
          <NavButton active={activeTab === 'stats'} icon="📊" label={t.stats} onClick={() => setActiveTab('stats')} />
          <NavButton active={activeTab === 'settings'} icon="⚙️" label={t.settings} onClick={() => setActiveTab('settings')} />
        </nav>
      </div>

      {/* Floating Overlay Component */}
      {isAssistantVisible && (
        <FloatingAssistant 
          onClose={() => setIsAssistantVisible(false)} 
          isPro={isPro}
          activeSession={activeSession}
          onUpdate={handleUpdateActiveSession}
        />
      )}
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; icon: string; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${active ? 'scale-110 text-indigo-500' : 'opacity-40 hover:opacity-100'}`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </button>
);

export default App;
