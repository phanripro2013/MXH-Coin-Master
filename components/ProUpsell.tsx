
import React from 'react';
import { AppTheme } from '../types';

interface ProUpsellProps {
  onUpgrade: () => void;
  theme: AppTheme;
}

const ProUpsell: React.FC<ProUpsellProps> = ({ onUpgrade, theme }) => {
  const features = [
    { icon: '♾️', text: 'Không giới hạn sự kiện' },
    { icon: '🌙', text: 'Chế độ tối (Dark Mode)' },
    { icon: '📊', text: 'Thống kê & Biểu đồ nâng cao' },
    { icon: '📥', text: 'Xuất dữ liệu CSV / TXT' },
    { icon: '🚫', text: 'Xóa quảng cáo & Watermark' },
  ];

  return (
    <div className={`p-6 rounded-3xl relative overflow-hidden group border-2 border-indigo-500/20 shadow-2xl transition-all ${theme === AppTheme.DARK ? 'bg-slate-800' : 'bg-white'}`}>
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">PRO</span>
          <h3 className="font-bold">Lên đời Trợ Lý Chuyên Nghiệp</h3>
        </div>

        <div className="space-y-3 mb-6">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3 text-xs font-medium">
              <span className="w-5 text-center">{f.icon}</span>
              <span className="opacity-80">{f.text}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={onUpgrade}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-lg transition-all active:scale-95"
        >
          Nâng cấp ngay - Chỉ 199k
        </button>
      </div>
    </div>
  );
};

export default ProUpsell;
