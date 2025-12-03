import React from 'react';
import * as Lucide from 'lucide-react';


type Props = {
title: string;
icon: string;
desc: string;
badge?: string | null;
};


function toPascal(name: string) {
return name
.split(/[-_]/)
.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
.join('');
}


const ModuleCard: React.FC<Props> = ({ title, icon, desc, badge }) => {
const IconName = toPascal(icon);
const Icon = (Lucide as any)[IconName] || Lucide.Box;


return (
<div className="glass-card group relative rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
<div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div className="relative z-10">
<div className="flex justify-between items-start mb-4">
<div className="relative flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 dark:bg-purple-900/20 text-slate-600 dark:text-purple-400 border border-slate-200 dark:border-purple-500/30 group-hover:border-purple-500 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300">
<Icon className="w-6 h-6" />
</div>
{badge ? (
<span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-100 dark:text-purple-200 dark:bg-purple-500/20 border border-purple-200 dark:border-purple-500/30 shadow-glow-sm">{badge}</span>
) : null}
</div>
<h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{title}</h3>
<p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{desc}</p>
</div>
</div>
);
};


export default ModuleCard;