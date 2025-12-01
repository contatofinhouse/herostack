import React from 'react';
import { Button } from './ui/DesignSystem';
import { ChevronRight, Code2, LayoutTemplate, Zap } from 'lucide-react';
import { motion as motionOriginal } from 'framer-motion';

const motion = motionOriginal as any;

interface HeroProps {
  onStart: () => void;
  onShowcase: () => void;
  onPricing: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart, onShowcase, onPricing }) => {
  return (
    // Removed dark:bg-zinc-950 so the global background and particles are visible
    <div className="relative isolate pt-14 min-h-screen flex flex-col justify-center overflow-hidden">
      
      {/* Animated Top Gradient Blob - Adjusted to Blue/Teal (Cooler colors) */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            rotate: [30, 60, 30],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 35, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#0f172a] to-[#334155] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" 
          style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} 
        />
      </div>

      {/* Animated Bottom Gradient Blob - Adjusted to Slate/Gray */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <motion.div 
          animate={{ 
            x: [0, -50, 0],
            rotate: [-10, 20, -10],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#1e293b] to-[#475569] opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" 
          style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} 
        />
      </div>
      
      {/* Changed py-24 to py-12 for mobile */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-32 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-white/10 dark:hover:ring-white/20 bg-background/50 backdrop-blur-sm">
              Modelo de assinatura inteligente. 
              <button onClick={onPricing} className="font-semibold text-blue-600 inline-flex items-center ml-1 focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                Ver planos mensais <span aria-hidden="true" className="ml-1">&rarr;</span>
              </button>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
          >
            Site Profissional.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Sem Custo de Desenvolvimento.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            Tenha sua Landing Page ou Site Institucional com tecnologia de ponta. Criamos, hospedamos e mantemos. Assinatura única com tudo incluso.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Button size="lg" onClick={onStart} className="gap-2 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 border-0">
              Criar Site <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="lg" onClick={onShowcase}>
              Ver Exemplos
            </Button>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-16 max-w-7xl sm:mt-24 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 gap-y-16 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
             <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="mb-4 p-3 rounded-full bg-blue-500/10 text-blue-500">
                  <LayoutTemplate className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Design Premium</h3>
                <p className="mt-2 text-muted-foreground">Layouts modernos e responsivos, criados para transmitir autoridade e converter visitantes em clientes.</p>
             </div>
             <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="mb-4 p-3 rounded-full bg-blue-500/10 text-blue-500">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Tecnologia Moderna</h3>
                <p className="mt-2 text-muted-foreground">Utilizamos React, as mesmas tecnologias usadas pelas maiores startups do Vale do Silício.</p>
             </div>
             <div className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="mb-4 p-3 rounded-full bg-blue-500/10 text-blue-500">
                  <Code2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Sem Dor de Cabeça</h3>
                <p className="mt-2 text-muted-foreground">Esqueça configurações de servidor ou plugins quebrados. Nós cuidamos de toda a parte técnica para você.</p>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;