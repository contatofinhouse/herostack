import React from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from './ui/DesignSystem';
import { ChevronLeft, ShieldCheck, Zap, Smartphone, Search, Lock, Scale, FileText, MousePointerClick, RefreshCw, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

interface LegalDocsProps {
  type: 'terms' | 'privacy' | 'guide';
  onBack: () => void;
}

const LegalDocs: React.FC<LegalDocsProps> = ({ type, onBack }) => {
  
  // Renderiza o Guia de Sites Modernos (Rich Content)
  if (type === 'guide') {
    return (
      <div className="min-h-screen bg-background animate-in fade-in duration-500">
         {/* Hero Header do Guia */}
        <div className="relative py-24 bg-gradient-to-b from-primary/5 to-background border-b overflow-hidden">
           {/* Abstract Background Shape */}
           <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

           <div className="max-w-4xl mx-auto px-6 relative z-10">
              <Button variant="ghost" onClick={onBack} className="mb-8 gap-2 pl-0 hover:bg-transparent hover:text-primary">
                <ChevronLeft className="w-4 h-4" /> Voltar para Home
              </Button>
              <div className="flex gap-2 mb-6">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">HeroStack Academy</Badge>
                <Badge variant="outline">Leitura: 5 min</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                O Guia Definitivo para <br className="hidden md:block" />Sites de Alta Performance
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                A internet mudou. Descubra por que a tecnologia por trás do seu site (Next.js) é a arma secreta para ultrapassar concorrentes que ainda usam ferramentas antigas.
              </p>
           </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-24">
            
            {/* Seção 1: Velocidade */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                   <div className="p-3 rounded-lg bg-blue-100 text-blue-700 w-fit mb-4 dark:bg-blue-900/30 dark:text-blue-400">
                      <Zap className="w-6 h-6" />
                   </div>
                   <h2 className="text-3xl font-bold mb-4">1. A Velocidade é Rei</h2>
                   <p className="text-muted-foreground leading-relaxed mb-4">
                     Estudos do Google (Core Web Vitals) mostram que <strong>53% dos usuários abandonam um site</strong> se ele levar mais de 3 segundos para carregar.
                   </p>
                   <p className="text-muted-foreground leading-relaxed">
                     Na HeroStack, usamos <strong>Renderização Estática (SSG)</strong>. Diferente de sites comuns que precisam "montar" a página a cada clique (consultando banco de dados), nós entregamos páginas pré-prontas via CDN Global. É instantâneo.
                   </p>
                </div>
                <Card className="bg-secondary/30 border-none shadow-none overflow-hidden">
                    <CardContent className="p-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-muted-foreground">Wordpress / Wix (Média)</span>
                                    <span className="text-red-500 font-bold">4.5s</span>
                                </div>
                                <div className="h-3 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-red-400 w-[80%] rounded-full"></div>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-foreground">HeroStack (Next.js)</span>
                                    <span className="text-green-500 font-bold">0.8s</span>
                                </div>
                                <div className="h-3 bg-muted rounded-full overflow-hidden relative">
                                    <div className="h-full bg-green-500 w-[15%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground pt-2 border-t mt-4">
                                *Baseado em métricas de Time to First Byte (TTFB).
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Seção 2: Mobile First */}
            <section className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                <div className="md:order-2">
                   <div className="p-3 rounded-lg bg-pink-100 text-pink-700 w-fit mb-4 dark:bg-pink-900/30 dark:text-pink-400">
                      <Smartphone className="w-6 h-6" />
                   </div>
                   <h2 className="text-3xl font-bold mb-4">2. Responsividade Real</h2>
                   <p className="text-muted-foreground leading-relaxed mb-4">
                     Não basta o site "caber" na tela. Ele precisa ser <strong>tátil</strong>. Menus que abrem fácil, botões grandes para o polegar e fontes legíveis.
                   </p>
                   <ul className="space-y-3 mt-6">
                      <li className="flex items-start gap-3 text-sm text-foreground/80">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        <span><strong>Mais de 70%</strong> do tráfego web no Brasil é Mobile. Se seu site é ruim no celular, você perde 70% dos clientes.</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-foreground/80">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        <span><strong>Imagens Otimizadas:</strong> Convertemos automaticamente imagens para formato WebP, economizando dados 4G do seu cliente.</span>
                      </li>
                   </ul>
                </div>
                <div className="md:order-1 flex justify-center">
                    <div className="border-[6px] border-slate-800 rounded-[2.5rem] p-2 bg-background w-[260px] h-[480px] shadow-2xl relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-800 rounded-b-xl z-20"></div>
                        <div className="h-full w-full bg-secondary/20 rounded-[1.8rem] overflow-hidden flex flex-col relative z-10">
                             {/* Mockup Screen content */}
                             <div className="h-32 bg-gradient-to-br from-primary/80 to-violet-600 w-full flex items-center justify-center p-4">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full"></div>
                             </div>
                             <div className="p-4 space-y-3">
                                 <div className="w-3/4 h-4 bg-muted-foreground/20 rounded"></div>
                                 <div className="w-full h-2 bg-muted-foreground/10 rounded"></div>
                                 <div className="w-full h-2 bg-muted-foreground/10 rounded"></div>
                                 <div className="w-2/3 h-2 bg-muted-foreground/10 rounded"></div>
                                 <div className="pt-4 grid grid-cols-2 gap-2">
                                    <div className="h-20 bg-muted-foreground/10 rounded-lg"></div>
                                    <div className="h-20 bg-muted-foreground/10 rounded-lg"></div>
                                 </div>
                             </div>
                             <div className="mt-auto p-4">
                                <div className="w-full h-10 bg-primary rounded-lg shadow-lg shadow-primary/20"></div>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* Seção 3: Conversão e UX */}
             <section className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                   <div className="p-3 rounded-lg bg-yellow-100 text-yellow-700 w-fit mb-4 dark:bg-yellow-900/30 dark:text-yellow-400">
                      <MousePointerClick className="w-6 h-6" />
                   </div>
                   <h2 className="text-3xl font-bold mb-4">3. Design que Vende</h2>
                   <p className="text-muted-foreground leading-relaxed mb-4">
                     Um site bonito que não vende é apenas arte digital. Nossos templates são desenhados com base em <strong>psicologia do consumidor</strong> e hierarquia visual.
                   </p>
                   <div className="space-y-4">
                        <div className="flex gap-4 p-4 border rounded-lg bg-background hover:border-primary/50 transition-colors">
                            <div className="font-bold text-2xl text-muted-foreground/50">A</div>
                            <div>
                                <h4 className="font-bold text-sm">Call-to-Action (CTA) Claro</h4>
                                <p className="text-xs text-muted-foreground mt-1">Botões posicionados onde o olho humano busca naturalmente.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-4 border rounded-lg bg-background hover:border-primary/50 transition-colors">
                            <div className="font-bold text-2xl text-muted-foreground/50">B</div>
                            <div>
                                <h4 className="font-bold text-sm">Eliminação de Fricção</h4>
                                <p className="text-xs text-muted-foreground mt-1">Formulários simplificados e navegação intuitiva para reduzir desistências.</p>
                            </div>
                        </div>
                   </div>
                </div>
                <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl blur-lg opacity-50"></div>
                    <Card className="relative bg-background/80 backdrop-blur">
                         <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-6">
                             <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                                <ArrowRight className="w-8 h-8 text-green-600" />
                             </div>
                             <div>
                                 <h3 className="text-2xl font-bold text-foreground">Conversão</h3>
                                 <p className="text-sm text-muted-foreground">O objetivo final de todo pixel.</p>
                             </div>
                             <div className="w-full bg-muted rounded-lg p-4 text-left text-sm space-y-2">
                                 <div className="flex justify-between">
                                     <span>Visitantes</span>
                                     <span>1.000</span>
                                 </div>
                                 <div className="flex justify-between border-b pb-2">
                                     <span>Taxa Média</span>
                                     <span className="text-red-400">1.5%</span>
                                 </div>
                                 <div className="flex justify-between font-bold pt-1">
                                     <span>HeroStack Otimizado</span>
                                     <span className="text-green-600">3.8%</span>
                                 </div>
                             </div>
                         </CardContent>
                    </Card>
                </div>
            </section>

            {/* Seção 4: Manutenção e Escalabilidade */}
            <section className="bg-secondary/20 rounded-3xl p-8 md:p-12 border border-border/50">
                <div className="max-w-3xl mx-auto text-center mb-12">
                     <h2 className="text-3xl font-bold mb-4">O Fim da "Manutenção Pesadelo"</h2>
                     <p className="text-muted-foreground">Esqueça o medo de atualizar um plugin e o site sair do ar.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="bg-background">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-lg">
                                <RefreshCw className="w-5 h-5 text-orange-500" />
                                O Jeito Antigo (Wordpress)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li className="flex gap-2"><span className="text-red-500">×</span> Plugins conflitantes que quebram o layout.</li>
                                <li className="flex gap-2"><span className="text-red-500">×</span> Falhas de segurança constantes (banco de dados SQL).</li>
                                <li className="flex gap-2"><span className="text-red-500">×</span> Servidor cai se tiver muitos acessos simultâneos.</li>
                                <li className="flex gap-2"><span className="text-red-500">×</span> Lentidão progressiva com o tempo.</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="bg-background border-primary/20 shadow-lg shadow-primary/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-lg">
                                <Layers className="w-5 h-5 text-blue-500" />
                                O Jeito HeroStack
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-sm text-foreground/80">
                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> <strong>Imutável:</strong> O site não "quebra" sozinho.</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> <strong>Serverless:</strong> Aguenta 10 ou 1 milhão de visitas sem cair.</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> <strong>Segurança Nível Enterprise:</strong> Sem porta de entrada para injeção SQL.</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> <strong>Sempre Atualizado:</strong> Usamos a versão mais recente do React.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Seção 5: SEO e Segurança (Resumo) */}
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Search className="w-6 h-6 text-violet-500" />
                            SEO Técnico Avançado
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            O Google prioriza sites com boa estrutura de código. Geramos sitemaps XML, meta tags dinâmicas e dados estruturados (Schema.org) automaticamente. Seu negócio merece ser encontrado.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Lock className="w-6 h-6 text-green-500" />
                            Segurança Blindada (SSL)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Todos os planos incluem certificado SSL (o cadeado verde). Além de proteger os dados do cliente, é um fator fundamental de ranqueamento no Google e confiança da marca.
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Checklist Final */}
            <section className="bg-muted rounded-2xl p-8">
                <h3 className="font-bold text-xl mb-6">Checklist: Seu site atual passa no teste?</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                    {[
                        "Carrega em menos de 2 segundos no 4G?",
                        "Tem certificado de segurança SSL ativo?",
                        "O formulário de contato funciona sempre?",
                        "As imagens não estão pixeladas ou pesadas?",
                        "O layout se adapta perfeitamente ao celular?",
                        "Tem botão de WhatsApp flutuante?"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-background p-3 rounded border">
                            <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
                                <div className="w-2.5 h-2.5 rounded-full bg-primary/20"></div>
                            </div>
                            <span className="text-sm font-medium">{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-br from-primary to-violet-700 text-primary-foreground rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">Pare de perder dinheiro com sites amadores.</h3>
                    <p className="mb-10 text-primary-foreground/90 max-w-xl mx-auto text-lg">
                        Tenha acesso à mesma tecnologia das maiores startups do mundo, por um preço de assinatura mensal acessível.
                    </p>
                    <Button variant="secondary" size="lg" onClick={onBack} className="font-bold text-primary h-14 px-8 text-lg shadow-xl hover:scale-105 transition-transform">
                        Criar Meu Projeto Profissional
                    </Button>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // Renderiza Documentos Legais (Layout Jurídico)
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      <div className="max-w-4xl mx-auto">
         <Button variant="ghost" onClick={onBack} className="mb-8 gap-2 pl-0 hover:bg-transparent hover:text-primary">
            <ChevronLeft className="w-4 h-4" /> Voltar
         </Button>

         <Card className="border shadow-sm">
            <CardHeader className="border-b bg-secondary/20 pb-8">
                <div className="flex items-center gap-3 mb-2 text-muted-foreground">
                    {type === 'terms' ? <Scale className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                    <span className="uppercase tracking-widest text-xs font-bold">Documento Legal</span>
                </div>
                <CardTitle className="text-3xl font-bold">
                    {type === 'terms' ? 'Termos e Condições de Uso' : 'Política de Privacidade'}
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                    Última atualização: 24 de Outubro de 2024 • Versão 1.0
                </p>
            </CardHeader>
            <CardContent className="p-8 md:p-12 prose prose-slate dark:prose-invert max-w-none">
                
                {type === 'terms' ? (
                    <div className="space-y-8">
                        <section>
                            <h3 className="text-xl font-bold text-foreground mb-4">1. Visão Geral do Contrato</h3>
                            <p className="text-muted-foreground">
                                Bem-vindo à <strong>HeroStack</strong> ("nós", "nosso"). Ao assinar nossos planos, você ("cliente") concorda em cumprir estes Termos de Serviço. A HeroStack fornece serviços de desenvolvimento web, hospedagem e manutenção sob modelo de assinatura mensal.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-foreground mb-4">2. Modelo de Assinatura e Propriedade Intelectual</h3>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                <li><strong>Licença de Uso:</strong> Enquanto a assinatura estiver ativa, o cliente tem direito de uso irrestrito do site e hospedagem.</li>
                                <li><strong>Propriedade do Código:</strong> O código-fonte estrutural (Next.js/React) e componentes de design permanecem propriedade intelectual da HeroStack.</li>
                                <li><strong>Conteúdo do Cliente:</strong> Todo texto, imagem, logomarca e dados fornecidos pelo cliente permanecem propriedade exclusiva do cliente.</li>
                                <li><strong>Buyout (Compra Definitiva):</strong> Caso o cliente deseje migrar o site para outro servidor, poderá ser negociada uma taxa de "buyout" para liberação do código-fonte compilado.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-foreground mb-4">3. Pagamentos e Inadimplência</h3>
                            <p className="text-muted-foreground mb-2">
                                Os pagamentos são recorrentes e mensais. Aceitamos cartão de crédito e PIX.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                <li><strong>Atrasos:</strong> Após 5 dias de atraso no pagamento, o serviço poderá ser suspenso temporariamente (site offline).</li>
                                <li><strong>Reajustes:</strong> Os valores da assinatura podem sofrer reajuste anual baseado no índice IGPM/IPCA, mediante aviso prévio de 30 dias.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-foreground mb-4">4. Cancelamento</h3>
                            <p className="text-muted-foreground">
                                A HeroStack preza pela liberdade. <strong>Não exigimos fidelidade contratual</strong> nos planos padrão. O cliente pode cancelar a qualquer momento solicitando via painel ou suporte, com aviso prévio de 30 dias para encerramento do ciclo de faturamento. Após o cancelamento, o site será retirado do ar.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-foreground mb-4">5. Garantia de Disponibilidade (SLA)</h3>
                            <p className="text-muted-foreground">
                                Utilizamos infraestrutura de nuvem global (Vercel/AWS). Garantimos um uptime de 99.9%. Manutenções programadas serão avisadas com antecedência.
                            </p>
                        </section>
                    </div>
                ) : (
                    <div className="space-y-8">
                         <section>
                            <h3 className="text-xl font-bold text-foreground mb-4">1. Coleta de Informações</h3>
                            <p className="text-muted-foreground">
                                A HeroStack coleta o mínimo necessário de dados para a prestação do serviço. Isso inclui:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mt-2">
                                <li>Dados de Identificação: Nome, CPF/CNPJ, E-mail, Telefone.</li>
                                <li>Dados do Projeto: Textos e imagens para a construção do site.</li>
                                <li>Logs de Acesso: Para fins de segurança e auditoria da plataforma.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-foreground mb-4">2. Uso das Informações</h3>
                            <p className="text-muted-foreground">
                                Utilizamos seus dados estritamente para:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mt-2">
                                <li>Processar pagamentos e emitir notas fiscais.</li>
                                <li>Entrar em contato para suporte técnico ou alinhamento de projeto.</li>
                                <li>Melhorar a performance dos nossos servidores.</li>
                            </ul>
                            <p className="text-muted-foreground mt-4 font-semibold">
                                Nós NÃO vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-foreground mb-4">3. Cookies e Rastreamento</h3>
                            <p className="text-muted-foreground">
                                Utilizamos cookies essenciais para o funcionamento da área do cliente (manter você logado). Em sites criados para clientes, podemos implementar Google Analytics ou Pixel do Facebook mediante solicitação, sendo de responsabilidade do cliente a gestão de consentimento de seus usuários finais.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-foreground mb-4">4. Segurança de Dados</h3>
                            <p className="text-muted-foreground">
                                Adotamos práticas de segurança alinhadas à LGPD (Lei Geral de Proteção de Dados). Seus dados são armazenados em servidores criptografados. O acesso interno é restrito apenas a funcionários que necessitam das informações para executar seu trabalho.
                            </p>
                        </section>

                         <section>
                            <h3 className="text-xl font-bold text-foreground mb-4">5. Seus Direitos</h3>
                            <p className="text-muted-foreground">
                                Você tem o direito de solicitar, a qualquer momento, o acesso, correção ou exclusão dos seus dados pessoais de nossa base, exceto aqueles que somos obrigados a manter por lei (ex: registros fiscais). Para exercer seus direitos, entre em contato via e-mail ou WhatsApp.
                            </p>
                        </section>
                    </div>
                )}

            </CardContent>
            <CardContent className="bg-muted/30 border-t p-6 text-center">
                <p className="text-sm text-muted-foreground mb-4">Dúvidas sobre este documento?</p>
                <Button variant="outline" className="gap-2">
                    <FileText className="w-4 h-4" /> Entrar em contato com o Jurídico
                </Button>
            </CardContent>
         </Card>
      </div>
    </div>
  );
};

const CheckIcon = () => <CheckCircle2 className="w-4 h-4 text-primary" />;

export default LegalDocs;