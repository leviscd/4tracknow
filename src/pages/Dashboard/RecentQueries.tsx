import React from 'react';


const recentQueries = [
{ status: 'success', value: '123.456.789-00', module: 'Consulta CPF', time: '14s ago' },
{ status: 'error', value: 'ABC-1234', module: 'Consulta Veicular', time: '42s ago' },
{ status: 'success', value: 'Carlos A. Silva', module: 'Consulta Nome', time: '2m ago' },
{ status: 'success', value: '(11) 99888-7777', module: 'Consulta Telefone', time: '5m ago' },
{ status: 'success', value: '45.123.001/0001-99', module: 'Consulta CNPJ', time: '12m ago' }
];


const RecentQueries: React.FC = () => {
return (
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-slate-200 dark:border-purple-500/10 bg-slate-50/50 dark:bg-purple-900/5">
<th className="p-4 pl-6">Status</th>
<th className="p-4">Busca Realizada</th>
<th className="p-4">Módulo</th>
<th className="p-4 text-right pr-6">Timestamp</th>
</tr>
</thead>
<tbody className="text-sm divide-y divide-slate-100 dark:divide-purple-500/5">
{recentQueries.map((query, index) => {
const statusDot = query.status === 'success' ? (
<div className="flex items-center gap-2"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span><span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">RETORNADO</span></div>
) : (
<div className="flex items-center gap-2"><span className="relative flex h-2 w-2"><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span><span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">ERRO</span></div>
);


const bgClass = index % 2 === 0 ? 'bg-transparent' : 'bg-slate-50/50 dark:bg-white/[0.02]';


return (
<tr key={index} className={`${bgClass} hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors`}>
<td className="p-4 pl-6">{statusDot}</td>
<td className="p-4"><span className="font-mono text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-black/30 px-2 py-1 rounded border border-slate-200 dark:border-white/10">{query.value}</span></td>
<td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-400">{query.module}</td>
<td className="p-4 text-right pr-6 text-xs text-slate-400 font-mono">{query.time}</td>
</tr>
);
})}
</tbody>
</table>
</div>
);
};


export default RecentQueries;