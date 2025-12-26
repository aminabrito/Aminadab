import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  title: string;
  content: string | string[];
  icon: LucideIcon;
  color?: string;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, content, icon: Icon, color = "text-cyan-400", className = "" }) => {
  return (
    <div className={`bg-card-bg border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all duration-300 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg bg-slate-900/50 ${color}`}>
          <Icon size={20} />
        </div>
        <h3 className="text-slate-300 font-medium text-sm uppercase tracking-wider">{title}</h3>
      </div>
      
      <div className="text-slate-100 text-sm leading-relaxed">
        {Array.isArray(content) ? (
          <div className="flex flex-wrap gap-2">
            {content.map((item, idx) => (
              <span key={idx} className="px-3 py-1 bg-slate-800/80 rounded-full text-xs border border-slate-700 text-slate-300">
                {item}
              </span>
            ))}
          </div>
        ) : (
          <p>{content}</p>
        )}
      </div>
    </div>
  );
};