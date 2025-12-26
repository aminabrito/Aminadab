
import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  TooltipProps
} from 'recharts';
import { GenreComponent } from '../types';
import { Info } from 'lucide-react';

interface AnalysisChartsProps {
  genres: GenreComponent[];
}

const COLORS = ['#b026ff', '#00f3ff', '#ff0055', '#ffe600', '#00ff9d'];

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl max-w-[240px] animate-fade-in">
        <div className="flex items-center gap-2 mb-1">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: payload[0].color || payload[0].fill }}
          />
          <span className="text-white font-bold text-sm">{data.subject || data.name}</span>
          <span className="text-neon-cyan font-mono text-xs ml-auto">{payload[0].value}%</span>
        </div>
        <p className="text-slate-400 text-xs leading-tight mt-2 flex gap-2">
          <Info size={12} className="shrink-0 mt-0.5 text-slate-500" />
          {data.description || "Influência rítmica e tonal detectada nesta composição."}
        </p>
      </div>
    );
  }
  return null;
};

export const GenreRadar: React.FC<AnalysisChartsProps> = ({ genres }) => {
  // Normalize data for Radar chart
  const data = genres.map(g => ({
    subject: g.name,
    A: g.percentage,
    description: g.description,
    fullMark: 100,
  }));

  return (
    <div className="h-64 w-full relative">
      <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 text-center">Espectro de Gênero</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#1e293b" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Gênero"
            dataKey="A"
            stroke="#00f3ff"
            strokeWidth={2}
            fill="#00f3ff"
            fillOpacity={0.2}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#334155', strokeWidth: 1 }} />
        </RadarChart>
      </ResponsiveContainer>
      <div className="absolute top-0 right-0 p-2 opacity-20">
        <Info size={14} className="text-slate-500" />
      </div>
    </div>
  );
};

export const GenreBar: React.FC<AnalysisChartsProps> = ({ genres }) => {
  return (
    <div className="h-64 w-full mt-4">
      <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 text-center">Composição</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={genres} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <Tooltip 
             cursor={{fill: 'rgba(255,255,255,0.03)'}}
             content={<CustomTooltip />}
          />
          <Bar dataKey="percentage" radius={[0, 4, 4, 0]} barSize={24}>
            {genres.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
