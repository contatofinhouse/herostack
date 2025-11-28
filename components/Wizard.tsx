import React, { useState } from 'react';
import { PlanType, ServicePlan, FormData } from '../types';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label, Badge } from './ui/DesignSystem';
import { Check, Send, ChevronLeft, Upload, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const plans: ServicePlan[] = [
  {
    id: PlanType.LANDING,
    title: "Landing Page Pro",
    price: "R$ 49,90/mês",
    description: "Ideal para capturar leads e vender produtos únicos. Design de alta conversão.",
    features: ["Criação Grátis", "Hospedagem Inclusa", "Até 5 seções", "Formulário de Contato", "Suporte WhatsApp"]
  },
  {
    id: PlanType.CMS,
    title: "Site Institucional + CMS",
    price: "R$ 89,90/mês",
    description: "Gerencie seu blog e conteúdo sem tocar em código. Painel administrativo incluso.",
    features: ["Criação Grátis", "Hospedagem Premium", "Páginas Ilimitadas", "CMS Integrado", "Blog"]
  },
  {
    id: PlanType.SAAS,
    title: "SaaS & App Web",
    price: "Sob Consulta",
    description: "Seu software como serviço. Sistema de login, pagamentos e dashboard prontos.",
    features: ["Autenticação", "Pagamentos", "Dashboard", "Banco de Dados", "Consultoria Técnica"]
  },
  {
    id: PlanType.AUTOMATION,
    title: "Automação & n8n",
    price: "Sob Consulta",
    description: "Integrações complexas e fluxos de trabalho automatizados para sua empresa.",
    features: ["Servidor n8n", "Webhooks Customizados", "Integração WhatsApp", "CRM Sync", "Bot IA"]
  }
];

const fontOptions = [
  { id: 'Inter', name: 'Inter', family: 'sans-serif', desc: 'Moderna, limpa e padrão da indústria tech.', usedBy: 'Notion, Vercel, Stripe' },
  { id: 'Open Sans', name: 'Open Sans', family: 'sans-serif', desc: 'Amigável, neutra e extremamente legível.', usedBy: 'Google, IKEA, WordPress' },
  { id: 'Montserrat', name: 'Montserrat', family: 'sans-serif', desc: 'Geométrica, sofisticada e impactante.', usedBy: 'Marcas de Luxo, Startups Urbanas' },
  { id: 'Merriweather', name: 'Merriweather', family: 'serif', desc: 'Clássica, confiável e ótima para leitura.', usedBy: 'Harvard, Medium, Washington Post' },
  { id: 'Space Grotesk', name: 'Space Grotesk', family: 'monospace', desc: 'Excêntrica, tecnológica e futurista.', usedBy: 'Projetos Web3, Design Studios' },
];

const industryOptions = [
  "Advocacia / Jurídico",
  "Saúde / Odontologia / Estética",
  "Consultoria / Coaching",
  "E-commerce / Loja Virtual",
  "Tecnologia / SaaS / Startup",
  "Restaurante / Delivery",
  "Construção / Arquitetura",
  "Educação / Cursos",
  "Outros"
];

interface WizardProps {
  onCancel: () => void;
  initialPlan?: PlanType | null;
}

const Wizard: React.FC<WizardProps> = ({ onCancel, initialPlan }) => {
  const [step, setStep] = useState(initialPlan ? 2 : 1);
  const [formData, setFormData] = useState<FormData>({
    selectedPlan: initialPlan || null,
    brandColors: { primary: '#000000', secondary: '#ffffff' },
    typography: 'Inter',
    businessName: '',
    businessDescription: '',
    email: '',
    industry: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customIndustry, setCustomIndustry] = useState('');
  const [selectedIndustrySelect, setSelectedIndustrySelect] = useState('');

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const updateForm = (key: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleIndustryChange = (val: string) => {
    setSelectedIndustrySelect(val);
    if (val !== 'Outros') {
      updateForm('industry', val);
      setCustomIndustry('');
    } else {
      updateForm('industry', '');
    }
  };

  const handleCustomIndustryChange = (val: string) => {
    setCustomIndustry(val);
    updateForm('industry', val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setStep(5);
    setIsSubmitting(false);
  };

  const selectedFontData = fontOptions.find(f => f.id === formData.typography) || fontOptions[0];

  return (
    <div className="min-h-screen bg-secondary/30 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative z-20">
      <div className="w-full max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Button variant="ghost" onClick={onCancel} className="gap-2">
            <ChevronLeft className="w-4 h-4" /> Cancelar
          </Button>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(i => (
              <div 
                key={i} 
                className={`h-2 w-12 rounded-full transition-all duration-300 ${i <= step ? 'bg-primary' : 'bg-muted-foreground/20'}`} 
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold">Escolha seu plano de assinatura</h2>
                <p className="text-muted-foreground mt-2">Sem custo de setup. Cancele quando quiser.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plans.map(plan => (
                  <Card 
                    key={plan.id} 
                    className={`cursor-pointer transition-all hover:border-primary hover:shadow-md ${formData.selectedPlan === plan.id ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : ''}`}
                    onClick={() => updateForm('selectedPlan', plan.id)}
                  >
                    <CardHeader>
                      <CardTitle className="flex justify-between items-start">
                        {plan.title}
                        <Badge variant="secondary">{plan.price}</Badge>
                      </CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <Check className="w-4 h-4 mr-2 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                 <Button onClick={handleNext} disabled={!formData.selectedPlan} size="lg">
                    Próximo Passo: Design
                 </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Identidade Visual</CardTitle>
                  <CardDescription>Defina as cores e o estilo tipográfico da sua marca.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Cor Primária</Label>
                      <div className="flex gap-2">
                        <Input 
                          type="color" 
                          className="w-12 h-10 p-1" 
                          value={formData.brandColors.primary}
                          onChange={(e) => setFormData(prev => ({ ...prev, brandColors: { ...prev.brandColors, primary: e.target.value } }))}
                        />
                        <Input 
                          value={formData.brandColors.primary} 
                          onChange={(e) => setFormData(prev => ({ ...prev, brandColors: { ...prev.brandColors, primary: e.target.value } }))}
                          className="font-mono uppercase"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Cor Secundária</Label>
                      <div className="flex gap-2">
                        <Input 
                          type="color" 
                          className="w-12 h-10 p-1"
                          value={formData.brandColors.secondary}
                          onChange={(e) => setFormData(prev => ({ ...prev, brandColors: { ...prev.brandColors, secondary: e.target.value } }))}
                        />
                         <Input 
                          value={formData.brandColors.secondary} 
                          onChange={(e) => setFormData(prev => ({ ...prev, brandColors: { ...prev.brandColors, secondary: e.target.value } }))}
                          className="font-mono uppercase"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Estilo de Fonte</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {fontOptions.map((font) => (
                        <div 
                          key={font.id}
                          className={`border rounded-lg p-3 text-center cursor-pointer hover:bg-muted transition-all ${formData.typography === font.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : ''}`}
                          onClick={() => updateForm('typography', font.id)}
                        >
                          <span 
                            className="text-2xl block mb-1" 
                            style={{ fontFamily: font.name === 'Space Grotesk' ? '"Space Grotesk", monospace' : font.name }}
                          >
                            Ag
                          </span>
                          <p className="text-[10px] sm:text-xs font-medium text-muted-foreground truncate">{font.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                   <div className="space-y-2 mt-6">
                      <Label>Preview Rápido</Label>
                      <div 
                        className="rounded-lg p-6 border shadow-sm transition-colors duration-300 relative overflow-hidden bg-white text-slate-900"
                        style={{ 
                          fontFamily: selectedFontData.name === 'Space Grotesk' ? '"Space Grotesk", monospace' : selectedFontData.name 
                        }}
                      >
                         {/* Description Overlay - Light text on white background needs to be dark */}
                         <div className="absolute top-0 right-0 p-4 w-full md:w-1/2 text-right pointer-events-none opacity-20 md:opacity-100">
                             <p className="text-xs font-bold uppercase tracking-wider mb-1 text-slate-800">Sobre esta fonte</p>
                             <p className="text-xs text-slate-500 mb-2">{selectedFontData.desc}</p>
                             <p className="text-xs font-bold uppercase tracking-wider mb-1 text-slate-800">Usada por</p>
                             <p className="text-xs text-slate-500">{selectedFontData.usedBy}</p>
                         </div>

                         <h3 style={{ color: formData.brandColors.primary }} className="text-3xl font-bold mb-3 max-w-sm">Sua Marca Incrível</h3>
                         <p className="text-slate-600 text-sm max-w-md leading-relaxed mb-6">
                            Este é um exemplo de como seu conteúdo ficará. A tipografia <strong>{selectedFontData.name}</strong> transmite a personalidade certa para o seu negócio.
                         </p>
                         <button 
                            className="px-6 py-2.5 rounded text-white text-sm font-medium transition-transform active:scale-95 shadow-lg"
                            style={{ backgroundColor: formData.brandColors.primary }}
                          >
                            Saiba Mais
                         </button>
                      </div>
                   </div>

                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>Voltar</Button>
                  <Button onClick={handleNext}>Próximo: Conteúdo</Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

           {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Sobre o Negócio</CardTitle>
                  <CardDescription>Conte-nos mais para prepararmos a estrutura inicial.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nome da Empresa / Projeto</Label>
                    <Input 
                      placeholder="Ex: TechSolutions Ltda" 
                      value={formData.businessName}
                      onChange={(e) => updateForm('businessName', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Setor de Atuação</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={selectedIndustrySelect}
                      onChange={(e) => handleIndustryChange(e.target.value)}
                    >
                      <option value="" disabled>Selecione uma categoria...</option>
                      {industryOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    
                    {selectedIndustrySelect === 'Outros' && (
                       <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pt-2"
                       >
                         <Input 
                            placeholder="Digite seu setor de atuação..."
                            value={customIndustry}
                            onChange={(e) => handleCustomIndustryChange(e.target.value)}
                            autoFocus
                         />
                       </motion.div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Descrição Curta do Negócio</Label>
                    <textarea 
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Descreva o que sua empresa faz e qual problema resolve... (Vamos propor um conteúdo e seções produzidos por IA com viés de marketing já para você revisar)"
                      value={formData.businessDescription}
                      onChange={(e) => updateForm('businessDescription', e.target.value)}
                    />
                  </div>
                  <div className="pt-4 border-t">
                      <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg border-dashed border-2">
                        <Upload className="w-8 h-8 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">Logo e Imagens</p>
                            <p className="text-xs text-muted-foreground">Você receberá um link seguro para upload após o cadastro.</p>
                        </div>
                      </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleBack}>Voltar</Button>
                  <Button onClick={handleNext} disabled={!formData.businessName || !formData.industry}>Próximo: Finalizar</Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {step === 4 && (
             <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-xl mx-auto"
            >
               <Card>
                 <CardHeader>
                   <CardTitle>Vamos Iniciar o Desenvolvimento</CardTitle>
                   <CardDescription>Confirme seus dados para recebermos o briefing.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg text-sm space-y-2 mb-6">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Plano Selecionado:</span>
                            <span className="font-medium">{plans.find(p => p.id === formData.selectedPlan)?.title}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Custo de Setup:</span>
                            <span className="font-medium text-green-600">GRÁTIS</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Assinatura Mensal:</span>
                            <span className="font-medium text-foreground">{plans.find(p => p.id === formData.selectedPlan)?.price}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md text-xs items-start border border-blue-100 dark:border-blue-800">
                        <Info className="w-4 h-4 shrink-0 mt-0.5" />
                        <p><strong>Fique tranquilo:</strong> A cobrança da assinatura mensal inicia somente <strong>após</strong> a aprovação da prévia do site e configuração final do domínio.</p>
                    </div>

                    <div className="space-y-2">
                        <Label>Seu E-mail Profissional</Label>
                        <Input 
                          type="email" 
                          placeholder="voce@empresa.com" 
                          value={formData.email}
                          onChange={(e) => updateForm('email', e.target.value)}
                          required
                        />
                    </div>
                    
                    <Button className="w-full mt-4" size="lg" onClick={handleSubmit} disabled={isSubmitting || !formData.email}>
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                Processando...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Send className="w-4 h-4" /> Enviar Solicitação
                            </span>
                        )}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-4">
                        Ao clicar, você concorda que entraremos em contato via WhatsApp/E-mail para alinhar os detalhes e ativar sua assinatura.
                    </p>
                 </CardContent>
                 <CardFooter>
                    <Button variant="ghost" onClick={handleBack} className="w-full">Voltar</Button>
                 </CardFooter>
               </Card>
             </motion.div>
          )}

          {step === 5 && (
             <motion.div
              key="step5"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center max-w-lg mx-auto py-10"
            >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Solicitação Recebida!</h2>
                <p className="text-muted-foreground text-lg mb-8">
                    Nossa equipe já está analisando o projeto da <strong>{formData.businessName}</strong>. 
                    <br/><br/>
                    Em breve você receberá uma mensagem no WhatsApp para confirmar os detalhes e colocar seu site no ar.
                </p>
                <Button onClick={onCancel} variant="outline">Voltar para Home</Button>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wizard;