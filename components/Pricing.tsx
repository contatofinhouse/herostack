import React from 'react';
import { PlanType } from '../types';
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Badge } from './ui/DesignSystem';
import { Check, Sparkles, Zap, Database, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingProps {
  onSelectPlan: (plan: PlanType) => void;
}

const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const pricingPlans = [
    {
      id: PlanType.LANDING,
      title: "Landing Page Pro",
      price: "R$ 49,90",
      period: "mês",
      description: "Ideal para profissionais liberais e captura de leads.",
      icon: <Rocket className="w-6 h-6 text-blue-500" />,
      features: [
        "Criação Gratuita (Sem Setup)",
        "Até 5 Seções Estratégicas",
        "Hospedagem Inclusa",
        "Botão WhatsApp Flutuante",
        "Certificado SSL (Cadeado)",
        "Suporte Técnico"
      ],
      highlight: false
    },
    {
      id: PlanType.CMS,
      title: "Institucional + CMS",
      price: "R$ 89,90",
      period: "mês",
      description: "Para empresas que precisam de blog e gestão de conteúdo.",
      icon: <Database className="w-6 h-6 text-blue-600" />,
      features: [
        "Criação Gratuita (Sem Setup)",
        "Páginas Ilimitadas",
        "Painel Administrativo (CMS)",
        "Blog Integrado",
        "Hospedagem Premium Inclusa",
        "Otimização para Google"
      ],
      highlight: true,
      badge: "Melhor Custo-Benefício"
    },
    {
      id: PlanType.SAAS,
      title: "SaaS | E-commerce",
      price: "Sob Demanda",
      period: "",
      description: "Sistemas complexos, áreas de membros e lojas virtuais.",
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      features: [
        "Projeto Personalizado",
        "Autenticação de Usuários",
        "Integração de Pagamentos",
        "Banco de Dados Dedicado",
        "Painel do Cliente",
        "API Própria"
      ],
      highlight: false
    },
    {
      id: PlanType.AUTOMATION,
      title: "Automação",
      price: "Em Breve",
      period: "",
      description: "Otimize processos da sua empresa com inteligência artificial.",
      icon: <Sparkles className="w-6 h-6 text-slate-500" />,
      features: [
        "Consultoria de Processos",
        "Servidor n8n Dedicado",
        "Chatbots com IA",
        "Integração WhatsApp",
        "CRM Sync",
        "Relatórios Automáticos"
      ],
      highlight: false,
      disabled: true
    }
  ];

  return (
    <section className="py-24 relative z-10" id="precos">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Planos Acessíveis</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Modelo de assinatura simples. Sem custos surpresa de desenvolvimento ou infraestrutura.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className={`relative h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-background/50 backdrop-blur-md ${
                  plan.highlight 
                    ? 'border-blue-500/50 shadow-blue-500/20 ring-1 ring-blue-500/50' 
                    : 'hover:border-primary/50'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-blue-800 text-white border-0 px-3 py-1">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader>
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-secondary p-2 w-fit">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-xl">{plan.title}</CardTitle>
                  <CardDescription className="mt-2 min-h-[40px]">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <div className="mb-6 flex items-baseline">
                    <span className="text-3xl font-bold tracking-tight">{plan.price}</span>
                    {plan.period && <span className="ml-1 text-sm text-muted-foreground">/{plan.period}</span>}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-muted-foreground">
                        <Check className={`mr-2 h-4 w-4 shrink-0 ${plan.highlight ? 'text-blue-500' : 'text-primary'}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button 
                    className={`w-full ${
                      plan.highlight 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white border-0 shadow-lg shadow-blue-500/25' 
                        : ''
                    }`}
                    variant={plan.highlight ? 'default' : 'outline'}
                    onClick={() => !plan.disabled && onSelectPlan(plan.id)}
                    disabled={plan.disabled}
                  >
                    {plan.disabled ? 'Aguarde' : plan.price.includes('Sob') ? 'Falar com Consultor' : 'Assinar Plano'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;