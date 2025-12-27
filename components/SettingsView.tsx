
import React from 'react';
import { AppTheme, AppLanguage } from '../types';

interface SettingsViewProps {
  isPro: boolean;
  theme: AppTheme;
  language: AppLanguage;
  onThemeChange: (theme: AppTheme) => void;
  onLangChange: (lang: AppLanguage) => void;
  onUpgrade: () => void;
  t: any;
}

const SettingsView: React.FC<SettingsViewProps> = ({ isPro, theme, language, onThemeChange, onLangChange, onUpgrade, t }) => {
  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-xl font-black uppercase tracking-tight px-2">{t.settings}</h2>

      <div className={`rounded-3xl shadow-md overflow-hidden ${theme === AppTheme.DARK ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className="text-lg">🌍</span>
                <span className="text-sm font-bold">Ngôn ngữ / Language</span>
            </div>
            <select 
                value={language} 
                onChange={(e) => onLangChange(e.target.value as AppLanguage)}
                className="bg-slate-50 dark:bg-slate-700 text-xs font-bold p-2 rounded-lg outline-none"
            >
                <option value={AppLanguage.VI}>Tiếng Việt</option>
                <option value={AppLanguage.EN}>English</option>
            </select>
        </div>

        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className="text-lg">🌓</span>
                <span className="text-sm font-bold">{t.darkMode}</span>
            </div>
            <button 
                disabled={!isPro}
                onClick={() => onThemeChange(theme === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT)}
                className={`w-12 h-6 rounded-full relative transition-all ${!isPro ? 'opacity-40 grayscale cursor-not-allowed bg-slate-200' : (theme === AppTheme.DARK ? 'bg-indigo-600' : 'bg-slate-200')}`}
            >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${theme === AppTheme.DARK ? 'right-1' : 'left-1'}`}></div>
                {!isPro && <span className="absolute -top-1 -right-1 text-[8px]">🔒</span>}
            </button>
        </div>

        <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className="text-lg">💾</span>
                <span className="text-sm font-bold">{t.exportData}</span>
            </div>
            <button 
                disabled={!isPro}
                className={`text-[10px] font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg ${!isPro ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
                CSV / TXT
            </button>
        </div>
      </div>

      <div className={`p-6 rounded-3xl shadow-md ${theme === AppTheme.DARK ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">🚀</div>
            <div>
                <h3 className="font-bold text-indigo-500">Event Spin Counter Pro</h3>
                <p className="text-[10px] opacity-60 uppercase font-black tracking-widest">Version 1.0.0 (Build 2025)</p>
            </div>
        </div>
        <p className="text-xs opacity-60 leading-relaxed mb-6">
            {t.legalNotice} Ứng dụng này cung cấp công cụ đếm thủ công giúp người chơi theo dõi tiến trình sự kiện hiệu quả hơn.
        </p>
        {!isPro ? (
            <button 
                onClick={onUpgrade}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-sm shadow-xl active:scale-95 transition-all"
            >
                MỞ KHÓA PRO - 199.000đ (Vĩnh viễn)
            </button>
        ) : (
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl border border-indigo-100 dark:border-indigo-800 text-center">
                <p className="text-indigo-600 dark:text-indigo-400 font-bold text-xs">Cảm ơn bạn đã ủng hộ phiên bản PRO!</p>
            </div>
        )}
      </div>

      <div className="text-center py-4 space-y-1">
        <p className="text-[10px] font-black opacity-30 uppercase tracking-[4px]">Designed for Gamers</p>
        <div className="flex justify-center gap-4 opacity-40">
            <span className="text-xs hover:underline cursor-pointer">Chính sách</span>
            <span className="text-xs hover:underline cursor-pointer">Hỗ trợ</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
