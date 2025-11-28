import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Comparison from './components/Comparison';
import Wizard from './components/Wizard';
import Showcase from './components/Showcase';
import DemoView from './components/DemoView';
import Pricing from './components/Pricing';
import Benefits from './components/Benefits';
import LegalDocs from './components/LegalDocs';
import { Button } from './components/ui/DesignSystem';
import MouseParticles from './components/ui/MouseParticles';
import { Moon, Sun, Linkedin, MessageCircle, Send } from 'lucide-react';
import { Template, PlanType } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'wizard' | 'showcase' | 'demo' | 'terms' | 'privacy' | 'guide'>('home');
  const [isDark, setIsDark] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<PlanType | null>(null);

  // Initialize theme
  useEffect(() => {
    document.documentElement.classList.add('dark');
    setIsDark(true);
  }, []);

  // Scroll to top whenever view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  const handleViewDemo = (template: Template) => {
    setSelectedTemplate(template);
    setView('demo');
  };

  const handleStartProject = () => {
    setSelectedPlanId(null); // Reset plan if starting from scratch
    setView('wizard');
  };

  const handleSelectPlan = (planId: PlanType) => {
    setSelectedPlanId(planId);
    setView('wizard');
  };

  // If in demo view, we render the DemoView component covering everything
  if (view === 'demo' && selectedTemplate) {
    return (
      <DemoView 
        template={selectedTemplate} 
        onBack={() => setView('showcase')} 
        onSelect={handleStartProject}
      />
    );
  }

  // HeroStack Logo Component (Paper Plane) - Updated to Grey, No Background
  const Logo = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center justify-center ${className}`}>
        <Send className="text-slate-600 dark:text-slate-300 w-8 h-8 transform -rotate-45 mb-1 mr-1" strokeWidth={2.5} />
    </div>
  );

  return (
    // Removed bg-background to allow particles to show through from body or fixed layer
    <div className="min-h-screen text-foreground transition-colors duration-300 relative selection:bg-primary selection:text-white">
      
      {/* Background Particles - Z-index 0 */}
      <MouseParticles />

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/5511955842951" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </a>

      {/* Navbar - Z-index 50 */}
      <nav className="fixed w-full z-50 top-0 left-0 border-b border-border/40 bg-background/60 backdrop-blur-xl transition-all duration-300 supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center cursor-pointer group gap-1" onClick={() => setView('home')}>
              <Logo />
              <span className="font-bold text-xl tracking-tight text-slate-700 dark:text-slate-200">HeroStack</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <button onClick={() => setView('home')} className="text-sm font-medium hover:text-primary transition-colors">Início</button>
              <button onClick={() => setView('showcase')} className="text-sm font-medium hover:text-primary transition-colors">Portfólio</button>
              <button onClick={() => setView('guide')} className="text-sm font-medium hover:text-primary transition-colors">Guia</button>
              {view === 'home' && <a href="#precos" className="text-sm font-medium hover:text-primary transition-colors">Planos</a>}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button 
                onClick={toggleTheme}
                className="border-0 bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                size="icon"
                aria-label="Alternar tema"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              
              <Button 
                size="sm" 
                onClick={handleStartProject} 
                className={view === 'wizard' ? 'hidden' : 'shadow-lg shadow-primary/30 font-semibold'}
              >
                Criar Site
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area - Z-index 10 (Above particles) */}
      <main className="relative z-10 pt-16">
        {view === 'home' && (
          <>
            <Hero onStart={handleStartProject} onShowcase={() => setView('showcase')} />
            <div id="compare">
                <Comparison />
            </div>
            <Benefits />
            <div id="showcase-preview">
               <Showcase onClose={() => setView('home')} onViewDemo={handleViewDemo} />
            </div>
            <div id="precos">
               <Pricing onSelectPlan={handleSelectPlan} />
            </div>
          </>
        )}

        {view === 'wizard' && (
          <Wizard 
            onCancel={() => setView('home')} 
            initialPlan={selectedPlanId}
          />
        )}

        {view === 'showcase' && (
           <Showcase 
             onClose={() => setView('home')} 
             onViewDemo={handleViewDemo}
           />
        )}

        {(view === 'terms' || view === 'privacy' || view === 'guide') && (
            <LegalDocs type={view} onBack={() => setView('home')} />
        )}

        <footer className="border-t py-12 bg-background/40 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <Logo className="scale-75 origin-left" />
                        <span className="font-bold text-lg text-slate-700 dark:text-slate-200">HeroStack</span>
                    </div>
                    <p className="text-sm text-muted-foreground">© 2024 HeroStack. Todos os direitos reservados.</p>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">CNPJ: 60.806.192/0001-50</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 text-sm text-muted-foreground items-center">
                    <button onClick={() => setView('guide')} className="hover:text-primary transition-colors font-medium">Guia para Criar Sites Modernos</button>
                    <div className="h-4 w-px bg-border hidden md:block"></div>
                    <button onClick={() => setView('terms')} className="hover:text-foreground transition-colors">Termos e Condições</button>
                    <button onClick={() => setView('privacy')} className="hover:text-foreground transition-colors">Privacidade</button>
                    <a href="https://www.linkedin.com/in/rafaelfinhouse" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors flex items-center gap-1" aria-label="LinkedIn">
                        <Linkedin className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
      </main>
    </div>
  );
};

export default App;