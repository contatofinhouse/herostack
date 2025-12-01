import React, { useState } from 'react';
import { motion as motionOriginal, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const motion = motionOriginal as any;

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-6 text-left focus:outline-none group"
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-blue-600' : 'text-foreground group-hover:text-blue-600'}`}>
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Realmente não pago nada pelo desenvolvimento do site?",
      answer: "Exatamente. Nosso modelo de negócio é 'SaaS' (Software como Serviço). Diferente de agências tradicionais que cobram milhares de reais na entrada + mensalidade, nós diluímos todo o custo na assinatura mensal. Você paga apenas o valor fixo do plano escolhido e recebe o site pronto, hospedado e com manutenção inclusa."
    },
    {
      question: "O que acontece se eu cancelar a assinatura?",
      answer: "Caso decida cancelar, você leva o código-fonte e todo o conteúdo (textos e imagens) fornecido por você continua sendo sua propriedade. Nós facilitamos a migração caso queira hospedar o projeto em outro servidor por conta própria."
    },
    {
      question: "Posso usar meu próprio domínio (ex: minhamarca.com.br)?",
      answer: "Com certeza! Se você já possui um domínio registrado, nós fazemos a configuração técnica (apontamento de DNS) para você. Caso ainda não tenha, nossa equipe te orienta passo a passo em como registrar um (o custo do domínio é pago diretamente ao registro.br ou similar, cerca de R$ 40/ano)."
    },
    {
      question: "Quanto tempo demora para o site ficar pronto?",
      answer: "Somos rápidos. Para Landing Pages (Plano Pro), o prazo médio é de 3 a 5 dias úteis após recebermos o material. Para Sites Institucionais e Blogs, o prazo gira em torno de 7 a 10 dias úteis. Projetos de E-commerce ou SaaS sob demanda têm cronogramas específicos combinados na proposta."
    },
    {
      question: "O site vai aparecer no Google?",
      answer: "Sim! Toda a nossa estrutura é construída com Next.js, a tecnologia favorita do Google atualmente. Entregamos o site com SEO Técnico otimizado: carregamento ultrarrápido, meta-tags dinâmicas, sitemap XML e estrutura semântica correta, o que facilita muito o ranqueamento orgânico."
    },
    {
      question: "Como funciona o suporte e as atualizações?",
      answer: "Nosso suporte é via WhatsApp direto com a equipe técnica. Precisa mudar um telefone, trocar uma foto ou ajustar um texto? É só pedir. Pequenas alterações estão inclusas no plano e geralmente são feitas no mesmo dia. Para criação de novas páginas inteiras ou funcionalidades complexas, fazemos um orçamento pontual justo."
    }
  ];

  return (
    <section className="py-12 sm:py-24 bg-background relative z-10" id="faq">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Perguntas Frequentes</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tire suas dúvidas sobre como a HeroStack revoluciona a criação de sites.
          </p>
        </div>

        <div className="divide-y divide-border rounded-2xl border bg-card/50 backdrop-blur-sm p-6 sm:p-10 shadow-sm">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;