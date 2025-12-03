import React from 'react';
import ModuleCard from './ModuleCard';


const modules = [
{ title: 'Consulta CPF', icon: 'fingerprint', desc: 'Dados cadastrais completos via CPF.', badge: '2 Fontes' },
{ title: 'Consulta CNPJ', icon: 'building-2', desc: 'Dados empresariais Receita Federal.', badge: 'Receita' },
{ title: 'Consulta Nome', icon: 'user', desc: 'Busca assertiva por nome completo.', badge: null },
{ title: 'Consulta Telefone', icon: 'phone', desc: 'Vínculos de telefonia atualizados.', badge: null },
{ title: 'Consulta Fotos', icon: 'camera', desc: 'Reconhecimento facial e arquivos.', badge: '10 Fontes' },
{ title: 'Consulta Veicular', icon: 'car', desc: 'Histórico completo do veículo.', badge: 'DETRAN' },
{ title: 'Foto CNH', icon: 'id-card', desc: 'Foto base original CNH/DETRAN.', badge: null },
{ title: 'Funcionários', icon: 'users', desc: 'Quadro societário e funcionários.', badge: null },
{ title: 'Consulta Chassi', icon: 'scan-barcode', desc: 'Decodificação de chassi BIN.', badge: null },
{ title: 'Consulta Renavam', icon: 'bar-chart-3', desc: 'Débitos e restrições Renavam.', badge: null },
{ title: 'Consulta Motor', icon: 'settings', desc: 'Numeração e cadastro de motor.', badge: null },
{ title: 'Radar Nacional', icon: 'radar', desc: 'Infrações em tempo real.', badge: 'Novo' }
];


const DashboardModules: React.FC = () => {
return (
<div id="modules-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
{modules.map((m) => (
<ModuleCard key={m.title} {...m} />
))}
</div>
);
};


export default DashboardModules;