import React, { useState, useEffect } from 'react';
import { Template } from '../types';
import { Button } from './ui/DesignSystem';
import { 
  ArrowLeft, Monitor, Smartphone, Tablet, ShoppingBag, 
  BarChart, Globe, Menu, X, Star, Users, ArrowRight, 
  Mail, MapPin, CheckCircle2, Zap, Shield, TrendingUp,
  Scale, Gavel, Briefcase, Camera, PenTool, Layout,
  CreditCard, Truck, RefreshCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoViewProps {
  template: Template;
  onBack: () => void;
  onSelect: () => void;
}

// Curated high-quality images to replace unstable random generators
const stockImages = {
  saas: [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', // Dashboard
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', // Analytics
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80', // Meeting
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80', // Code
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80', // Team
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', // Brainstorm
  ],
  ecommerce: [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', // Store
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80', // Fashion Model 1
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80', // Fashion Model 2
    'https://images.unsplash.com/photo-1529139574466-a302d20525a2?w=800&q=80', // Accessory
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80', // Coat
    'https://images.unsplash.com/photo-1485230946086-1d99d50525b1?w=800&q=80', // Jewelry
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', // Red Shoe
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80', // Blue Shoe
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80', // Fashion Dark
  ],
  law: [
    'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80', // Gavel
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', // Suit
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80', // Handshake
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', // Office
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', // Signing
    'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=800&q=80', // Books
  ],
  portfolio: [
    'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&q=80', // Abstract
    'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80', // Architecture
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&q=80', // Creative Code
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80', // Art
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80', // Laptop
    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80', // UI Design
  ]
};

const DemoView: React.FC<DemoViewProps> = ({ template, onBack, onSelect }) => {
  const [page, setPage] = useState<'home' | 'services' | 'about' | 'contact'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to top when page changes inside the demo
  useEffect(() => {
    const container = document.getElementById('demo-container');
    if(container) container.scrollTo(0,0);
  }, [page]);

  const navigate = (p: 'home' | 'services' | 'about' | 'contact') => {
    setPage(p);
    setMobileMenuOpen(false);
  };

  // --- CATEGORY DETECTION ---
  const isSaaS = template.category === 'SaaS';
  const isEcommerce = template.category === 'Loja Virtual';
  const isLaw = template.category === 'Serviços'; // Advocacia
  const isPortfolio = template.category === 'Institucional'; // Design/Criativo

  // --- THEME CONFIGURATION ---
  const getTheme = () => {
      if (isSaaS) return {
          primary: 'bg-blue-600', text: 'text-blue-600', light: 'bg-blue-50', 
          font: 'font-sans', radius: 'rounded-lg', button: 'rounded-lg'
      };
      if (isEcommerce) return {
          primary: 'bg-zinc-900', text: 'text-zinc-900', light: 'bg-zinc-100', 
          font: 'font-sans', radius: 'rounded-none', button: 'rounded-none uppercase tracking-widest'
      };
      if (isLaw) return {
          primary: 'bg-slate-800', text: 'text-slate-800', light: 'bg-slate-100', 
          font: 'font-serif', radius: 'rounded-sm', button: 'rounded-sm'
      };
      // Portfolio - Changed from Violet to Emerald
      return {
          primary: 'bg-emerald-600', text: 'text-emerald-600', light: 'bg-emerald-50', 
          font: 'font-sans', radius: 'rounded-2xl', button: 'rounded-full'
      };
  };

  const theme = getTheme();

  // --- IMAGERY HELPERS ---
  const getCategoryImages = () => {
      if (isSaaS) return stockImages.saas;
      if (isEcommerce) return stockImages.ecommerce;
      if (isLaw) return stockImages.law;
      return stockImages.portfolio;
  };

  const images = getCategoryImages();

  // --- COMPONENT PARTS ---

  const renderHeader = () => (
    <header className={`sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur-md ${theme.font}`}>
       <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="font-bold text-2xl tracking-tighter flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('home')}
          >
             {isLaw && <Scale className="w-8 h-8 text-slate-700" />}
             {isSaaS && <div className={`w-8 h-8 rounded ${theme.primary}`}></div>}
             {isEcommerce && <span className="font-serif italic text-3xl">Vogue.</span>}
             {isPortfolio && <div className="w-8 h-8 rounded-full border-2 border-emerald-600"></div>}
             
             {!isEcommerce && template.name.split(' ')[0]}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
             <button onClick={() => navigate('home')} className={`hover:${theme.text} transition-colors ${page === 'home' ? 'text-black font-bold' : ''}`}>Início</button>
             <button onClick={() => navigate('services')} className={`hover:${theme.text} transition-colors ${page === 'services' ? 'text-black font-bold' : ''}`}>
                 {isEcommerce ? 'Coleção' : isLaw ? 'Atuação' : isPortfolio ? 'Projetos' : 'Soluções'}
             </button>
             <button onClick={() => navigate('about')} className={`hover:${theme.text} transition-colors ${page === 'about' ? 'text-black font-bold' : ''}`}>Sobre</button>
             <button onClick={() => navigate('contact')} className={`hover:${theme.text} transition-colors ${page === 'contact' ? 'text-black font-bold' : ''}`}>Contato</button>
          </nav>

          <div className="hidden md:flex gap-4">
             {isEcommerce && <Button variant="ghost" size="icon"><ShoppingBag className="w-5 h-5" /></Button>}
             <Button className={`${theme.primary} ${theme.button} text-white border-0 hover:opacity-90 px-6`}>
                 {isEcommerce ? 'Ver Ofertas' : isLaw ? 'Agendar Consulta' : 'Fale Conosco'}
             </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
       </div>

       {/* Mobile Nav */}
       <AnimatePresence>
         {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-b overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                <button onClick={() => navigate('home')} className="text-left font-medium">Início</button>
                <button onClick={() => navigate('services')} className="text-left font-medium">
                    {isEcommerce ? 'Coleção' : isLaw ? 'Atuação' : isPortfolio ? 'Projetos' : 'Soluções'}
                </button>
                <button onClick={() => navigate('about')} className="text-left font-medium">Sobre</button>
                <button onClick={() => navigate('contact')} className="text-left font-medium">Contato</button>
              </div>
            </motion.div>
         )}
       </AnimatePresence>
    </header>
  );

  const renderFooter = () => (
    <footer className={`${isLaw ? 'bg-slate-900' : isEcommerce ? 'bg-black' : 'bg-slate-900'} text-white py-16 ${theme.font}`}>
       <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
             <span className="font-bold text-2xl block">{template.name.split(' ')[0]}</span>
             <p className="text-sm opacity-70 leading-relaxed">
               {isLaw ? 'Excelência jurídica e compromisso com a justiça desde 1990.' : 
                isEcommerce ? 'Moda atemporal para quem busca elegância e conforto.' :
                'Transformando ideias em realidade digital.'}
             </p>
          </div>
          <div>
             <h4 className="font-bold mb-6">Navegação</h4>
             <ul className="space-y-3 text-sm opacity-70">
                <li><button onClick={() => navigate('home')} className="hover:text-white transition-colors">Início</button></li>
                <li><button onClick={() => navigate('services')} className="hover:text-white transition-colors">
                    {isEcommerce ? 'Produtos' : isLaw ? 'Áreas' : 'Serviços'}
                </button></li>
                <li><button onClick={() => navigate('about')} className="hover:text-white transition-colors">Sobre</button></li>
                <li><button onClick={() => navigate('contact')} className="hover:text-white transition-colors">Contato</button></li>
             </ul>
          </div>
          <div>
             <h4 className="font-bold mb-6">Contato</h4>
             <ul className="space-y-3 text-sm opacity-70">
                <li>contato@{template.name.toLowerCase().split(' ')[0]}.com</li>
                <li>+55 (11) 99999-9999</li>
                <li>Av. Paulista, 1000 - SP</li>
             </ul>
          </div>
          <div>
             <h4 className="font-bold mb-6">Newsletter</h4>
             <div className="flex gap-2">
                <input className="bg-white/10 rounded px-4 py-2 text-sm w-full border border-white/20 focus:border-white outline-none" placeholder="Email..." />
                <Button size="sm" className="bg-white text-black hover:bg-gray-200">OK</Button>
             </div>
          </div>
       </div>
       <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-sm opacity-50">
          <p>© 2024 {template.name}. Criado com <strong>HeroStack</strong>.</p>
       </div>
    </footer>
  );

  // --- HOME VIEW LOGIC (Polymorphic) ---
  const HomeView = () => (
    <div className={`animate-in fade-in slide-in-from-bottom-4 duration-500 ${theme.font}`}>
        
        {/* HERO SECTION VARIANTS */}
        <section className={`relative pt-20 pb-32 overflow-hidden ${isLaw ? 'bg-slate-50' : 'bg-white'}`}>
           <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 order-2 lg:order-1">
                 {isEcommerce ? (
                     <>
                        <p className="tracking-[0.2em] text-sm font-medium text-gray-500 uppercase">Nova Coleção 2024</p>
                        <h1 className="text-6xl font-serif italic mb-6">Elegância que <br/>transcende.</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-md">Descubra peças exclusivas desenhadas para o homem e mulher modernos.</p>
                        <Button className={`${theme.primary} ${theme.button} text-white px-10 py-6 text-lg`}>Comprar Agora</Button>
                     </>
                 ) : isLaw ? (
                     <>
                        <div className="flex items-center gap-2 text-slate-600 font-bold tracking-wide uppercase text-xs">
                            <div className="h-px w-8 bg-slate-400"></div> Excelência Jurídica
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-slate-900 font-serif">
                           Defendendo seus direitos com integridade.
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-lg border-l-4 border-slate-300 pl-6 italic">
                           "A justiça não consiste em ser neutro entre o certo e o errado, mas em descobrir o certo e sustentá-lo."
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Button className={`${theme.primary} ${theme.button} text-white px-8 py-6 text-lg`}>Consulta Gratuita</Button>
                        </div>
                     </>
                 ) : (
                     // SaaS & Portfolio Default
                     <>
                        <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide ${theme.light} ${theme.text}`}>
                            {isSaaS ? 'Plataforma #1 em Gestão' : 'Design Premiado'}
                        </span>
                        <h1 className="text-5xl sm:text-7xl font-bold leading-tight tracking-tight text-slate-900">
                            {template.description.split('.')[0]}.
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                            {isSaaS 
                                ? 'Automatize processos, aumente vendas e gerencie sua equipe em um só lugar.'
                                : 'Criamos experiências digitais que conectam marcas a pessoas.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className={`${theme.primary} ${theme.button} text-white border-0 h-14 px-8 text-lg hover:opacity-90`} onClick={() => navigate('contact')}>
                                {isSaaS ? 'Começar Teste Grátis' : 'Iniciar Projeto'}
                            </Button>
                            {isSaaS && <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-lg">Ver Demo</Button>}
                        </div>
                     </>
                 )}
              </div>
              
              <div className="relative order-1 lg:order-2">
                 {isEcommerce ? (
                     <div className="grid grid-cols-2 gap-4">
                        <img src={stockImages.ecommerce[1]} className="rounded-none shadow-xl mt-12 w-full h-[400px] object-cover" alt="Fashion 1" />
                        <img src={stockImages.ecommerce[2]} className="rounded-none shadow-xl w-full h-[400px] object-cover" alt="Fashion 2" />
                     </div>
                 ) : (
                     <>
                        <div className={`absolute -inset-4 rounded-full blur-3xl opacity-20 ${theme.primary}`}></div>
                        <img 
                            src={template.image} 
                            alt="Hero" 
                            className={`relative shadow-2xl w-full object-cover transform hover:scale-[1.02] transition-transform duration-500 ${theme.radius}`} 
                        />
                     </>
                 )}
              </div>
           </div>
        </section>

        {/* LOGOS / TRUST */}
        {!isEcommerce && (
            <section className="py-10 border-y bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">
                        {isLaw ? 'Reconhecimento Nacional' : 'Empresas que confiam na gente'}
                    </p>
                    <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
                        {['OAB SP', 'Tribunal', 'Legal 500', 'Chambers'].map((logo, i) => (
                            <div key={i} className={`text-xl font-bold ${isLaw ? 'font-serif' : 'font-sans'} text-slate-800 flex items-center gap-2`}>
                                <div className="w-6 h-6 bg-slate-800 rounded-full"></div> {isLaw ? logo : ['Acme', 'Bolt', 'Nexa', 'Global'][i]}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )}

        {/* FEATURES / PRODUCTS */}
        <section className="py-24 bg-white">
           <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16 max-w-2xl mx-auto">
                 <h2 className="text-3xl font-bold mb-4 text-slate-900">
                    {isEcommerce ? 'Mais Vendidos' : isLaw ? 'Áreas de Atuação' : 'Por que escolher a gente?'}
                 </h2>
                 <p className="text-slate-600">
                    {isEcommerce ? 'As peças favoritas da nossa comunidade.' : 'Excelência e dedicação em cada detalhe.'}
                 </p>
              </div>

              {isEcommerce ? (
                  // E-COMMERCE GRID
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      {[
                        { name: "Jaqueta Bomber", price: "299", img: stockImages.ecommerce[4] },
                        { name: "Sapatilha Lux", price: "189", img: stockImages.ecommerce[6] },
                        { name: "Bolsa Tote", price: "450", img: stockImages.ecommerce[3] },
                        { name: "Tênis Runner", price: "320", img: stockImages.ecommerce[7] }
                      ].map((prod, i) => (
                          <div key={i} className="group cursor-pointer">
                              <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-gray-100">
                                  <img 
                                    src={prod.img} 
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                  />
                                  <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform bg-white/90 backdrop-blur">
                                      <Button className="w-full bg-black text-white rounded-none h-10 text-xs uppercase">Adicionar</Button>
                                  </div>
                              </div>
                              <h3 className="font-bold text-sm uppercase tracking-wide">{prod.name}</h3>
                              <p className="text-gray-500 text-sm">R$ {prod.price},00</p>
                          </div>
                      ))}
                  </div>
              ) : (
                  // STANDARD GRID (Law, SaaS, Portfolio)
                  <div className="grid md:grid-cols-3 gap-8">
                     {[
                        { 
                            icon: isLaw ? Scale : isPortfolio ? PenTool : Zap, 
                            title: isLaw ? 'Direito Civil' : 'Performance', 
                            desc: isLaw ? 'Resolução de conflitos e contratos.' : 'Carregamento instantâneo.' 
                        },
                        { 
                            icon: isLaw ? Shield : isPortfolio ? Layout : Shield, 
                            title: isLaw ? 'Direito Trabalhista' : 'Segurança', 
                            desc: isLaw ? 'Defesa dos direitos do trabalhador e empresas.' : 'Proteção total de dados.' 
                        },
                        { 
                            icon: isLaw ? Briefcase : isPortfolio ? Camera : TrendingUp, 
                            title: isLaw ? 'Direito Empresarial' : 'Crescimento', 
                            desc: isLaw ? 'Consultoria jurídica para sua corporação.' : 'Ferramentas para escalar.' 
                        }
                     ].map((item, i) => (
                        <div key={i} className={`group p-8 border border-slate-100 bg-white hover:shadow-xl transition-all hover:-translate-y-1 ${theme.radius}`}>
                           <div className={`w-14 h-14 ${theme.light} ${theme.text} ${theme.radius} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                              <item.icon className="w-7 h-7" />
                           </div>
                           <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                           <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                        </div>
                     ))}
                  </div>
              )}
           </div>
        </section>

        {/* CTA Section */}
        <section className={`py-24 ${isLaw ? 'bg-slate-900 text-white' : 'bg-slate-50'} text-center`}>
            <div className="max-w-4xl mx-auto px-6 space-y-8">
                <h2 className={`text-4xl font-bold ${isLaw ? 'text-white' : 'text-slate-900'}`}>
                    {isEcommerce ? 'Renove seu guarda-roupa hoje.' : 'Pronto para começar?'}
                </h2>
                <div className="flex justify-center gap-4">
                     <Button size="lg" className={`${theme.primary} ${theme.button} text-white hover:opacity-90 px-8 h-12 text-lg`} onClick={() => navigate('contact')}>
                        {isEcommerce ? 'Ver Ofertas' : 'Falar com Especialista'}
                     </Button>
                </div>
            </div>
        </section>
    </div>
  );

  // --- SERVICES VIEW LOGIC (Polymorphic) ---
  const ServicesView = () => (
    <div className={`animate-in slide-in-from-right-8 duration-500 ${theme.font}`}>
        
        {/* Header */}
        <div className={`py-20 ${theme.light}`}>
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">
                    {isEcommerce ? 'Coleção Outono/Inverno' : 
                     isLaw ? 'Áreas de Atuação' : 
                     isSaaS ? 'Funcionalidades' : 
                     'Nosso Portfolio'}
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    {isEcommerce ? 'Peças exclusivas com design italiano.' : 
                     isLaw ? 'Compromisso com a excelência em diversas áreas do direito.' : 
                     'Conheça o que fazemos de melhor.'}
                </p>
            </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-6 py-20">
            {isLaw ? (
                // LAWYER SERVICES LAYOUT
                <div className="space-y-16">
                    {['Direito Empresarial', 'Direito Tributário', 'Direito de Família', 'Direito Penal'].map((area, i) => (
                        <div key={i} className="grid md:grid-cols-2 gap-12 items-center group">
                             <div className={`order-2 ${i % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                                <h3 className="text-3xl font-bold mb-4 font-serif text-slate-800 flex items-center gap-3">
                                    <Scale className="w-8 h-8 text-slate-400" /> {area}
                                </h3>
                                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                    Oferecemos assessoria completa em {area.toLowerCase()}, garantindo segurança jurídica e defesa implacável dos seus interesses. Nossa equipe possui mais de 20 anos de experiência nesta cadeira.
                                </p>
                                <Button variant="outline" className="rounded-sm border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white">Saiba Mais</Button>
                             </div>
                             <div className={`order-1 ${i % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                                <img 
                                    src={stockImages.law[i % stockImages.law.length]} 
                                    className="w-full h-80 object-cover shadow-lg rounded-sm grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                             </div>
                        </div>
                    ))}
                </div>
            ) : isEcommerce ? (
                // ECOMMERCE GRID LAYOUT
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                     {['Jaqueta Couro', 'Vestido Seda', 'Tênis Urban', 'Bolsa Tote', 'Óculos Solar', 'Relógio Gold'].map((item, i) => (
                         <div key={i} className="group">
                             <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                                 <img 
                                    src={stockImages.ecommerce[i % stockImages.ecommerce.length]} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                 />
                                 {i === 2 && <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 uppercase font-bold">Sold Out</span>}
                             </div>
                             <div className="flex justify-between items-start">
                                 <div>
                                     <h3 className="text-lg font-bold uppercase tracking-wide">{item}</h3>
                                     <p className="text-gray-500 text-sm">Coleção 2024</p>
                                 </div>
                                 <span className="font-serif italic text-lg">R$ {(i + 2) * 120},00</span>
                             </div>
                         </div>
                     ))}
                </div>
            ) : (
                // SAAS & PORTFOLIO LAYOUT (Cards)
                <div className="grid md:grid-cols-3 gap-8">
                    {[0, 1, 2, 3, 4, 5].map((idx) => (
                        <div key={idx} className={`group border ${theme.radius} overflow-hidden hover:shadow-xl transition-all`}>
                            <div className="h-56 bg-slate-200 overflow-hidden relative">
                                 <img 
                                    src={images[idx % images.length]} 
                                    alt="Service" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                 />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">
                                    {isPortfolio ? `Projeto Criativo ${idx + 1}` : `Funcionalidade ${idx + 1}`}
                                </h3>
                                <p className="text-slate-500 text-sm mb-4">
                                    {isPortfolio 
                                        ? 'Identidade visual e branding completo para startup de tecnologia.' 
                                        : 'Integração completa via API com documentação detalhada.'}
                                </p>
                                <Button size="sm" variant="outline" className={theme.button} onClick={() => navigate('contact')}>
                                    {isPortfolio ? 'Ver Case' : 'Detalhes'}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );

  const AboutView = () => (
    <div className={`animate-in slide-in-from-right-8 duration-500 ${theme.font}`}>
         <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
             <div>
                 <h4 className={`font-bold uppercase tracking-widest mb-2 ${theme.text}`}>Quem Somos</h4>
                 <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                    {isLaw ? 'Tradição e excelência.' : 'Criando o futuro.'}
                 </h1>
                 <div className="space-y-4 text-slate-600 leading-relaxed">
                     <p>
                         {isLaw 
                            ? 'Fundado em 1995, nosso escritório se consolidou como referência na defesa de grandes causas corporativas.'
                            : 'Somos movidos pela inovação e pelo desejo de transformar a maneira como as pessoas interagem com a tecnologia.'}
                     </p>
                 </div>
                 
                 {/* Stats */}
                 <div className="mt-8 flex gap-8 border-t pt-8">
                     <div>
                         <span className="block text-3xl font-bold text-slate-900">10k+</span>
                         <span className="text-sm text-slate-500">Clientes</span>
                     </div>
                     <div>
                         <span className="block text-3xl font-bold text-slate-900">15</span>
                         <span className="text-sm text-slate-500">Prêmios</span>
                     </div>
                 </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                 <img src={images[0]} className={`rounded-lg shadow-lg mt-8 w-full h-64 object-cover`} alt="About 1" />
                 <img src={images[1]} className={`rounded-lg shadow-lg w-full h-64 object-cover`} alt="About 2" />
             </div>
         </div>
    </div>
  );

  const ContactView = () => (
    <div className={`animate-in slide-in-from-right-8 duration-500 min-h-[calc(100vh-80px)] ${theme.font}`}>
         <div className={`${isLaw ? 'bg-slate-900' : isEcommerce ? 'bg-black' : 'bg-slate-900'} text-white py-20`}>
             <div className="max-w-7xl mx-auto px-6 text-center">
                 <h1 className="text-4xl font-bold mb-4">Fale Conosco</h1>
                 <p className="opacity-80">Estamos prontos para atender você.</p>
             </div>
         </div>
         <div className="max-w-6xl mx-auto px-6 -mt-10 mb-20">
             <div className={`bg-white ${theme.radius} shadow-xl overflow-hidden grid md:grid-cols-2`}>
                 <div className="p-8 md:p-12 space-y-8">
                     <div className="space-y-4">
                         <div className="grid grid-cols-2 gap-4">
                             <input className={`w-full p-3 border ${theme.radius} bg-slate-50 focus:border-blue-500 outline-none`} placeholder="Nome" />
                             <input className={`w-full p-3 border ${theme.radius} bg-slate-50 focus:border-blue-500 outline-none`} placeholder="Sobrenome" />
                         </div>
                         <input className={`w-full p-3 border ${theme.radius} bg-slate-50 focus:border-blue-500 outline-none`} placeholder="Email" />
                         <textarea className={`w-full p-3 border ${theme.radius} bg-slate-50 focus:border-blue-500 outline-none h-32`} placeholder="Mensagem" />
                         <Button className={`w-full ${theme.primary} ${theme.button} text-white border-0 py-6 text-lg hover:opacity-90`}>
                             Enviar
                         </Button>
                     </div>
                 </div>
                 <div className={`${theme.light} p-8 md:p-12 flex flex-col justify-center space-y-8`}>
                     <div>
                         <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                             <Mail className={`w-5 h-5 ${theme.text}`} /> Email
                         </h4>
                         <p className="text-slate-600">contato@{template.name.toLowerCase().split(' ')[0]}.com</p>
                     </div>
                     <div>
                         <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                             <MapPin className={`w-5 h-5 ${theme.text}`} /> Endereço
                         </h4>
                         <p className="text-slate-600">Av. Paulista, 1000 - SP</p>
                     </div>
                 </div>
             </div>
         </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* 1. External Control Bar */}
      <div className="bg-slate-950 text-white px-4 h-16 flex items-center justify-between shadow-2xl shrink-0 z-50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-400 hover:text-white hover:bg-slate-800">
            <ArrowLeft className="w-4 h-4 mr-2" /> Sair do Preview
          </Button>
          <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
          <span className="font-medium hidden sm:block text-sm text-gray-200">
            Visualizando: <span className="text-white font-bold">{template.name}</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="hidden md:flex bg-slate-900 rounded-lg p-1 items-center border border-slate-800">
              <div className="p-2 bg-slate-800 rounded text-white shadow-sm"><Monitor className="w-4 h-4" /></div>
              <div className="p-2 text-gray-500 hover:text-gray-300 cursor-not-allowed"><Tablet className="w-4 h-4" /></div>
              <div className="p-2 text-gray-500 hover:text-gray-300 cursor-not-allowed"><Smartphone className="w-4 h-4" /></div>
           </div>
           
           <Button onClick={onSelect} className="bg-green-600 hover:bg-green-500 text-white border-0 font-bold shadow-lg shadow-green-900/20">
             Quero este Design
           </Button>
        </div>
      </div>

      {/* 2. The Website Simulation Container */}
      <div id="demo-container" className="flex-1 overflow-y-auto bg-white scroll-smooth">
         {renderHeader()}
         
         <main className="min-h-screen">
             {page === 'home' && <HomeView />}
             {page === 'services' && <ServicesView />}
             {page === 'about' && <AboutView />}
             {page === 'contact' && <ContactView />}
         </main>

         {renderFooter()}
      </div>
    </div>
  );
};

export default DemoView;