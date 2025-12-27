
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Session, AppTheme } from '../types';
import { DEFAULT_EVENTS } from '../constants';

interface StatsDashboardProps {
  sessions: Session[];
  t: any;
  isPro: boolean;
  theme: AppTheme;
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ sessions, t, isPro, theme }) => {
  const chartData = useMemo(() => {
    if (sessions.length === 0) return [];
    
    const aggregates: Record<string, number> = {};
    sessions.forEach(s => {
      // Fix: Cast val to number as Object.entries might infer it as unknown in some TypeScript environments
      Object.entries(s.events).forEach(([id, val]) => {
        aggregates[id] = (aggregates[id] || 0) + (val as number);
      });
    });

    return DEFAULT_EVENTS.map(e => ({
      name: e.name,
      value: aggregates[e.id] || 0,
      color: e.color.includes('orange') ? '#f97316' : 
             e.color.includes('pink') ? '#ec4899' :
             e.color.includes('cyan') ? '#06b6d4' : '#eab308'
    })).filter(d => d.value > 0);
  }, [sessions]);

  const timelineData = useMemo(() => {
    return sessions.slice(0, 7).reverse().map(s => ({
      date: new Date(s.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
      spins: s.totalSpins
    }));
  }, [sessions]);

  if (!isPro) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <div className="text-6xl">🔒</div>
        <h2 className="text-xl font-bold">{t.proFeatures}</h2>
        <p className="text-sm opacity-60 max-w-[200px]">Mở khóa biểu đồ và thống kê chi tiết hàng tuần/tháng.</p>
        <button className="bg-indigo-600 text-white font-bold px-6 py-2 rounded-full shadow-lg">Nâng cấp PRO</button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className={`p-4 rounded-3xl shadow-lg ${theme === AppTheme.DARK ? 'bg-slate-800' : 'bg-white'}`}>
        <h3 className="text-sm font-bold opacity-60 uppercase mb-4 px-2">Phân bổ sự kiện</h3>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {chartData.map((d, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px] font-bold">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
              <span className="opacity-60">{d.name}:</span>
              <span>{d.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`p-4 rounded-3xl shadow-lg ${theme === AppTheme.DARK ? 'bg-slate-800' : 'bg-white'}`}>
        <h3 className="text-sm font-bold opacity-60 uppercase mb-4 px-2">Xu hướng Spin (7 phiên)</h3>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="date" tick={{fontSize: 10}} />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="spins" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
