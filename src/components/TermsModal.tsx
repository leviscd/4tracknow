import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';

interface TermsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TermsModal = ({ open, onOpenChange }: TermsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] bg-card/95 backdrop-blur-xl border border-primary/30 shadow-neon p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0 relative">
          <DialogTitle className="font-orbitron text-2xl text-foreground">
            <span className="text-primary text-glow">Termos</span> de Uso
          </DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-full p-2 hover:bg-primary/10 transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </DialogClose>
        </DialogHeader>
        
        <ScrollArea className="h-[70vh] px-6 pb-6">
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed pr-4">
            {/* Header */}
            <div className="glass-card p-4 border-l-4 border-primary">
              <p className="font-semibold text-foreground">
                TERMOS E CONDIÇÕES DE USO DA PLATAFORMA 4TRACK
              </p>
              <p className="text-xs mt-1">Última atualização: Novembro de 2024</p>
            </div>

            {/* Section 1 */}
            <section>
              <h3 className="font-orbitron text-base text-foreground mb-3">
                1. DISPOSIÇÕES GERAIS E ACEITAÇÃO
              </h3>
              <p className="mb-2">
                Ao acessar, cadastrar-se ou utilizar a plataforma 4Track, o usuário declara ter lido, compreendido e aceito integralmente os presentes Termos de Uso, vinculando-se às suas disposições de forma irrevogável.
              </p>
              <p>
                A utilização dos serviços constitui manifestação expressa de vontade e concordância com todas as cláusulas aqui dispostas, nos termos do art. 104 do Código Civil Brasileiro (Lei nº 10.406/2002).
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h3 className="font-orbitron text-base text-foreground mb-3">
                2. NATUREZA DO SERVIÇO E RESPONSABILIDADES
              </h3>
              <p className="mb-2">
                A plataforma 4Track disponibiliza ferramentas de consulta e análise de dados provenientes de fontes públicas e legalmente acessíveis, destinadas exclusivamente a finalidades lícitas, tais como: análise de crédito, verificação cadastral, prevenção à fraude e demais usos permitidos pela legislação vigente.
              </p>
              <p className="mb-2">
                <strong className="text-foreground">O usuário é o único e exclusivo responsável:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Pela utilização das informações obtidas através da plataforma;</li>
                <li>Pela veracidade das informações cadastrais fornecidas;</li>
                <li>Por qualquer dano causado a terceiros decorrente do uso indevido;</li>
                <li>Pelo cumprimento de todas as obrigações legais aplicáveis.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h3 className="font-orbitron text-base text-foreground mb-3">
                3. CONDUTAS PROIBIDAS
              </h3>
              <p className="mb-2">
                É expressamente vedado ao usuário, sob pena de responsabilização civil e criminal:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-foreground">Uso ilícito:</strong> Utilizar as informações para fins criminosos, incluindo, mas não se limitando a: stalking, perseguição, ameaça, extorsão, estelionato ou qualquer conduta tipificada no Código Penal Brasileiro;
                </li>
                <li>
                  <strong className="text-foreground">Concorrência desleal e dumping:</strong> Revender, redistribuir, comercializar ou disponibilizar dados ou acessos a terceiros, configurando prática de concorrência desleal (Lei nº 9.279/96);
                </li>
                <li>
                  <strong className="text-foreground">Automação não autorizada:</strong> Utilizar bots, crawlers, scripts, ferramentas de scraping, engenharia reversa ou qualquer método automatizado para acessar, extrair ou manipular dados da plataforma;
                </li>
                <li>
                  <strong className="text-foreground">Compartilhamento de credenciais:</strong> Transferir, emprestar, vender ou compartilhar suas credenciais de acesso com terceiros;
                </li>
                <li>
                  <strong className="text-foreground">Violação de privacidade:</strong> Utilizar dados para fins que violem a privacidade ou dignidade de terceiros.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h3 className="font-orbitron text-base text-foreground mb-3">
                4. FUNDAMENTOS LEGAIS E PENALIDADES
              </h3>
              
              <div className="space-y-4">
                <div className="glass-card p-3">
                  <p className="font-semibold text-accent text-xs mb-2">CÓDIGO PENAL BRASILEIRO</p>
                  <ul className="text-xs space-y-1">
                    <li><strong>Art. 153:</strong> Divulgação de segredo - Pena de detenção de 1 a 6 meses, ou multa;</li>
                    <li><strong>Art. 154:</strong> Violação de segredo profissional - Pena de detenção de 3 meses a 1 ano, ou multa;</li>
                    <li><strong>Art. 154-A:</strong> Invasão de dispositivo informático - Pena de detenção de 3 meses a 1 ano, e multa;</li>
                    <li><strong>Art. 171:</strong> Estelionato - Pena de reclusão de 1 a 5 anos, e multa.</li>
                  </ul>
                </div>

                <div className="glass-card p-3">
                  <p className="font-semibold text-accent text-xs mb-2">MARCO CIVIL DA INTERNET (Lei nº 12.965/2014)</p>
                  <ul className="text-xs space-y-1">
                    <li><strong>Art. 7º:</strong> Garantia dos direitos dos usuários;</li>
                    <li><strong>Art. 10:</strong> Proteção aos registros de conexão e acesso;</li>
                    <li><strong>Art. 11:</strong> Tratamento de dados coletados no Brasil;</li>
                    <li><strong>Art. 15:</strong> Guarda de registros de acesso por 6 meses.</li>
                  </ul>
                </div>

                <div className="glass-card p-3">
                  <p className="font-semibold text-accent text-xs mb-2">LEI GERAL DE PROTEÇÃO DE DADOS (Lei nº 13.709/2018)</p>
                  <p className="text-xs mb-2">
                    O tratamento de dados pessoais está sujeito aos princípios da finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação e responsabilização.
                  </p>
                  <p className="text-xs">
                    <strong>Penalidades administrativas:</strong> Multas de até 2% do faturamento, limitada a R$ 50.000.000,00 por infração.
                  </p>
                </div>

                <div className="glass-card p-3">
                  <p className="font-semibold text-accent text-xs mb-2">CÓDIGO CIVIL BRASILEIRO</p>
                  <ul className="text-xs space-y-1">
                    <li><strong>Art. 186:</strong> Ato ilícito por ação ou omissão que viole direito e cause dano;</li>
                    <li><strong>Art. 187:</strong> Abuso de direito;</li>
                    <li><strong>Art. 927:</strong> Obrigação de reparar o dano causado.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h3 className="font-orbitron text-base text-foreground mb-3">
                5. SANÇÕES E MEDIDAS ADMINISTRATIVAS
              </h3>
              <p className="mb-2">
                Em caso de violação dos presentes Termos, a plataforma 4Track reserva-se o direito de, sem prévia notificação:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Suspender temporariamente o acesso do usuário;</li>
                <li>Cancelar definitivamente a conta, <strong className="text-foreground">sem direito a reembolso</strong> de valores pagos;</li>
                <li>Reportar a conduta às autoridades competentes;</li>
                <li>Adotar medidas judiciais cabíveis para reparação de danos.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h3 className="font-orbitron text-base text-foreground mb-3">
                6. REGISTRO E ARMAZENAMENTO DE LOGS
              </h3>
              <p>
                Em conformidade com o art. 15 do Marco Civil da Internet, a plataforma mantém registro de todas as atividades realizadas pelo usuário, incluindo: IP de acesso, data/hora das consultas, dados consultados e demais informações técnicas necessárias. Estes registros podem ser disponibilizados mediante ordem judicial.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h3 className="font-orbitron text-base text-foreground mb-3">
                7. NATUREZA PESSOAL E INTRANSFERÍVEL DO ACESSO
              </h3>
              <p>
                O acesso à plataforma 4Track é estritamente pessoal e intransferível. Cada credencial de acesso é vinculada a um único usuário, sendo vedada qualquer forma de compartilhamento, cessão ou transferência, sob pena das sanções previstas nestes Termos.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h3 className="font-orbitron text-base text-foreground mb-3">
                8. LIMITAÇÃO DE RESPONSABILIDADE
              </h3>
              <p>
                A plataforma 4Track não se responsabiliza por: (i) decisões tomadas com base nas informações consultadas; (ii) eventuais inconsistências em dados provenientes de fontes públicas; (iii) danos indiretos, incidentais ou consequenciais decorrentes do uso do serviço; (iv) interrupções temporárias para manutenção ou atualizações.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h3 className="font-orbitron text-base text-foreground mb-3">
                9. DISPOSIÇÕES FINAIS
              </h3>
              <p className="mb-2">
                Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de Maringá/PR para dirimir quaisquer controvérsias.
              </p>
              <p>
                A eventual nulidade de qualquer cláusula não afetará a validade das demais disposições. A tolerância quanto ao descumprimento de qualquer obrigação não constituirá novação ou renúncia de direitos.
              </p>
            </section>

            {/* Final notice */}
            <div className="glass-card p-4 border-l-4 border-accent mt-8">
              <p className="text-foreground font-medium text-center">
                AO UTILIZAR A PLATAFORMA 4TRACK, VOCÊ DECLARA ESTAR CIENTE E DE ACORDO COM TODOS OS TERMOS ACIMA DESCRITOS.
              </p>
            </div>
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-border/50">
          <Button 
            variant="hero" 
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Li e Aceito os Termos
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;
