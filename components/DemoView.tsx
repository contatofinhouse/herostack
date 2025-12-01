
import React, { useState, useEffect } from 'react';
import { Template, DraftConfig, SiteSection } from '../types';
import { Button } from './ui/DesignSystem';
import { 
  ArrowLeft, ShoppingBag, 
  Menu, X, Scale, 
  CheckCircle2, Zap, Shield, TrendingUp,
  Briefcase, Camera, PenTool, Layout,
  MessageCircle, MapPin, Mail, Phone, ArrowRight,
  Star, Users, Calendar
} from 'lucide-react';
import { motion as motionOriginal, AnimatePresence } from 'framer-motion';

const motion = motionOriginal as any;

interface DemoViewProps {
  template: Template;
  onBack: () => void;
  onSelect: () => void;
  customConfig?: DraftConfig; 
  isDraftMode?: boolean;
}

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80";

const DemoView: React.FC<DemoViewProps> = ({ template, onBack, onSelect, customConfig, isDraftMode = false }) => {
  const [page, setPage] = useState<'home' | 'services' | 'about' | 'contact'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const container = document.getElementById('demo-container');
    if(container) container.scrollTo(0,0);
  }, [page]);

  const navigate = (p: 'home' | 'services' | 'about' | 'contact') => {
    setPage(p);
    setMobileMenuOpen(false);
  };

  const industry = customConfig?.industry || 'default';
  const isLaw = industry === 'law';
  
  const primaryColor = customConfig?.colors.primary || '#000000';
  const secondaryColor = customConfig?.colors.secondary || '#3b82f6';
  
  const getFontClass = (fontName: string = 'Inter') => {
      if (fontName.includes('Merriweather')) return 'font-serif';
      if (fontName.includes('Space')) return 'font-mono';
      if (fontName.includes('Montserrat')) return 'font-montserrat';
      if (fontName.includes('Open')) return 'font-open-sans';
      return 'font-sans';
  };
  const fontClass = getFontClass(customConfig?.typography);

  const styles = {
      primaryBg: { backgroundColor: primaryColor },
      primaryText: { color: primaryColor },
      secondaryText: { color: secondaryColor },
      secondaryBg: { backgroundColor: secondaryColor },
      lightBg: { backgroundColor: `${primaryColor}10` }, // 10% opacity
      border: { borderColor: primaryColor },
      button: { 
          backgroundColor: primaryColor, 
          color: '#fff',
          borderRadius: isLaw ? '2px' : '8px' 
      }
  };

  const getPageContent = (pageKey: 'home' | 'about' | 'services' | 'contact') => {
      if (customConfig && customConfig.pages && customConfig.pages[pageKey]) {
          return customConfig.pages[pageKey];
      }
      return { title: 'Page', sections: [] };
  };

  const currentPage = getPageContent(page);
  const businessName = customConfig?.businessName || 'Nome da Empresa';
  const contactInfo = customConfig?.contact;

  // Render Logic
  const renderSection = (section: SiteSection, index: number) => {
      const bgClass = index % 2 === 0 ? 'bg-white' : 'bg-slate-50';
      const isEven = index % 2 === 0;

      switch(section.type) {
          case 'hero':
              return (
                <section key={section.id} className={`relative py-24 lg:py-40 overflow-hidden ${isLaw ? 'bg-slate-50' : 'bg-white'}`}>
                    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1 space-y-8 animate-in slide-in-from-left duration-700">
                             {customConfig?.tagline && (
                                <span className={`inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full`} style={styles.lightBg}>
                                    <span style={styles.primaryText}>{customConfig.tagline}</span>
                                </span>
                             )}
                             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-900 tracking-tight">
                                {section.title}
                             </h1>
                             <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                                {section.subtitle}
                             </p>
                             <div className="flex flex-wrap gap-4 pt-4">
                                <Button size="lg" style={styles.button} onClick={() => navigate('contact')}>
                                    {section.content || 'Saiba Mais'}
                                </Button>
                                <Button size="lg" variant="outline" className="bg-transparent border-slate-300 hover:bg-slate-50">
                                    Nossos Serviços
                                </Button>
                             </div>
                        </div>
                        <div className="order-1 lg:order-2 relative animate-in zoom-in duration-700">
                             <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent rounded-3xl z-10"></div>
                             <img 
                                src={section.image || PLACEHOLDER_IMAGE} 
                                alt="Hero" 
                                className={`w-full h-[500px] object-cover shadow-2xl ${isLaw ? 'rounded-sm' : 'rounded-3xl'}`}
                                onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE; }}
                             />
                        </div>
                    </div>
                </section>
              );

          case 'stats':
               return (
                  <section key={section.id} className="py-20" style={styles.primaryBg}>
                       <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                           {section.items?.map((item, i) => (
                               <div key={i} className="text-center text-white space-y-2">
                                   <div className="text-4xl md:text-5xl font-bold">{item.desc}</div>
                                   <div className="text-sm opacity-80 uppercase tracking-wide">{item.title}</div>
                               </div>
                           ))}
                       </div>
                  </section>
               );

          case 'features':
              return (
                  <section key={section.id} className={`py-24 ${bgClass}`}>
                      <div className="max-w-7xl mx-auto px-6">
                          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
                              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{section.title}</h2>
                              {section.subtitle && <p className="text-lg text-slate-600">{section.subtitle}</p>}
                          </div>
                          <div className="grid md:grid-cols-3 gap-8">
                              {section.items?.map((item, i) => (
                                  <div key={i} className={`p-8 border bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${isLaw ? 'rounded-sm' : 'rounded-2xl'}`}>
                                      <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-xl transition-colors group-hover:bg-primary group-hover:text-white" style={styles.lightBg}>
                                          <CheckCircle2 className="w-7 h-7" style={styles.primaryText} />
                                      </div>
                                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                      <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </section>
              );

          case 'pricing':
               return (
                  <section key={section.id} className={`py-24 ${bgClass}`}>
                      <div className="max-w-7xl mx-auto px-6">
                          <div className="text-center mb-16 space-y-4">
                              <h2 className="text-3xl font-bold text-slate-900">{section.title}</h2>
                              <p className="text-slate-600">{section.subtitle}</p>
                          </div>
                          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                              {section.items?.map((item, i) => (
                                  <div key={i} className={`relative p-8 border bg-white flex flex-col ${item.highlight ? 'shadow-2xl ring-2 ring-primary scale-105 z-10' : 'shadow-sm'} ${isLaw ? 'rounded-sm' : 'rounded-2xl'}`}>
                                      {item.highlight && (
                                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider" style={styles.primaryBg}>
                                              Recomendado
                                          </div>
                                      )}
                                      <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                                      <div className="mt-4 mb-6">
                                          <span className="text-4xl font-bold">{item.price}</span>
                                          {item.price !== 'Consulte' && <span className="text-slate-500">/mês</span>}
                                      </div>
                                      <p className="text-sm text-slate-600 mb-6">{item.desc}</p>
                                      <ul className="space-y-3 mb-8 flex-1">
                                          {item.features?.map((feat, fi) => (
                                              <li key={fi} className="flex items-center gap-2 text-sm text-slate-700">
                                                  <CheckCircle2 className="w-4 h-4 text-green-500" /> {feat}
                                              </li>
                                          ))}
                                      </ul>
                                      <Button style={item.highlight ? styles.button : {}} variant={item.highlight ? 'default' : 'outline'} className="w-full">
                                          Escolher Plano
                                      </Button>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </section>
               );
          
          case 'about':
               return (
                  <section key={section.id} className={`py-24 ${bgClass}`}>
                      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                          <div className={isEven ? 'order-1' : 'order-2'}>
                              <div className="relative">
                                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full z-0"></div>
                                  <img 
                                    src={section.image || PLACEHOLDER_IMAGE} 
                                    className={`relative z-10 w-full h-[500px] object-cover shadow-2xl ${isLaw ? 'rounded-sm' : 'rounded-3xl'}`}
                                    onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE; }}
                                  />
                              </div>
                          </div>
                          <div className={`space-y-6 ${isEven ? 'order-2' : 'order-1'}`}>
                              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{section.title}</h2>
                              <div className="w-20 h-1" style={styles.primaryBg}></div>
                              <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap">
                                  {section.content}
                              </p>
                              <div className="pt-4">
                                  <Button variant="outline" className="border-slate-300" onClick={() => navigate('about')}>Conheça Nossa História</Button>
                              </div>
                          </div>
                      </div>
                  </section>
               );

          case 'gallery':
              return (
                  <section key={section.id} className={`py-24 ${bgClass}`}>
                       <div className="max-w-7xl mx-auto px-6">
                           <div className="mb-12 text-center">
                               <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
                               <p className="text-slate-600">{section.subtitle}</p>
                           </div>
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                               {section.items?.map((item, i) => (
                                   <div key={i} className={`group relative overflow-hidden h-64 ${isLaw ? 'rounded-sm' : 'rounded-xl'}`}>
                                       <img src={item.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                           <span className="text-white font-bold">{item.title}</span>
                                       </div>
                                   </div>
                               ))}
                           </div>
                       </div>
                  </section>
              );

           case 'faq':
               return (
                   <section key={section.id} className={`py-24 ${bgClass}`}>
                       <div className="max-w-3xl mx-auto px-6">
                           <h2 className="text-3xl font-bold mb-10 text-center">{section.title || 'Perguntas Frequentes'}</h2>
                           <div className="space-y-4">
                               {section.items?.map((faq, i) => (
                                   <div key={i} className="border p-6 rounded-xl bg-white hover:border-primary/50 transition-colors cursor-pointer">
                                       <h4 className="font-bold mb-2 text-lg">{faq.title}</h4>
                                       <p className="text-slate-600 leading-relaxed">{faq.desc}</p>
                                   </div>
                               ))}
                           </div>
                       </div>
                   </section>
               );
            
            case 'contact-form':
                return (
                    <section key={section.id} className="py-24 bg-white">
                        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
                            <div>
                                <h2 className="text-4xl font-bold mb-6">{section.title}</h2>
                                <p className="text-slate-600 mb-10 text-lg">{section.subtitle}</p>
                                <div className="space-y-8">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-full flex items-center justify-center text-white" style={styles.primaryBg}><Phone className="w-6 h-6" /></div>
                                        <div><p className="font-bold text-lg">Telefone</p><p className="text-slate-600">{contactInfo?.phone}</p></div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-full flex items-center justify-center text-white" style={styles.primaryBg}><Mail className="w-6 h-6" /></div>
                                        <div><p className="font-bold text-lg">Email</p><p className="text-slate-600">{contactInfo?.email}</p></div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-full flex items-center justify-center text-white" style={styles.primaryBg}><MapPin className="w-6 h-6" /></div>
                                        <div><p className="font-bold text-lg">Endereço</p><p className="text-slate-600">{contactInfo?.address}</p></div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 shadow-xl">
                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Nome</label>
                                        <input className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Seu Nome" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email</label>
                                        <input className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Seu Email" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Mensagem</label>
                                        <textarea className="w-full p-4 border rounded-lg h-32 focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Como podemos ajudar?"></textarea>
                                    </div>
                                    <Button className="w-full h-12 text-lg font-bold shadow-lg hover:shadow-xl transition-all" style={styles.button}>Enviar Mensagem</Button>
                                </form>
                            </div>
                        </div>
                    </section>
                );

          default:
              return null;
      }
  };

  const renderHeader = () => (
    <header className={`sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur-md ${fontClass}`}>
       <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="font-bold text-2xl tracking-tighter flex items-center gap-2 cursor-pointer truncate max-w-[200px]"
            onClick={() => navigate('home')}
            style={styles.primaryText}
          >
             {isLaw && <Scale className="w-8 h-8" />}
             {!isLaw && <div className="w-8 h-8 rounded bg-current opacity-20"></div>}
             {businessName}
          </div>

          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
             <button onClick={() => navigate('home')} className={`hover:text-black transition-colors ${page === 'home' ? 'text-black font-bold' : ''}`}>Início</button>
             <button onClick={() => navigate('services')} className={`hover:text-black transition-colors ${page === 'services' ? 'text-black font-bold' : ''}`}>Serviços</button>
             <button onClick={() => navigate('about')} className={`hover:text-black transition-colors ${page === 'about' ? 'text-black font-bold' : ''}`}>Sobre</button>
             <button onClick={() => navigate('contact')} className={`hover:text-black transition-colors ${page === 'contact' ? 'text-black font-bold' : ''}`}>Contato</button>
          </nav>

          <div className="hidden md:flex gap-4">
             <Button style={styles.button} onClick={() => navigate('contact')} className="shadow-lg shadow-primary/20">
                 {isLaw ? 'Agendar Consulta' : 'Falar Conosco'}
             </Button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
       </div>
    </header>
  );

  return (
    <div className={`flex-1 overflow-y-auto bg-white scroll-smooth h-full font-sans ${fontClass}`} id="demo-container">
        {renderHeader()}
        <main className="min-h-screen">
            {currentPage.sections && currentPage.sections.length > 0 ? (
                currentPage.sections.map((section, idx) => renderSection(section, idx))
            ) : (
                <div className="py-40 text-center">
                    <p className="text-muted-foreground text-xl">Esta página ainda não tem seções.</p>
                </div>
            )}
        </main>
        
        {/* Footer Simples */}
        <footer className="bg-slate-900 text-white py-12 px-6">
            <div className="max-w-7xl mx-auto text-center space-y-4">
                <p className="font-bold text-2xl">{businessName}</p>
                <p className="text-slate-400">© 2024 Todos os direitos reservados.</p>
            </div>
        </footer>

        {contactInfo?.phone && (
             <div className="fixed bottom-6 right-6 z-50 animate-bounce">
                 <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl cursor-pointer flex items-center justify-center transition-transform hover:scale-110">
                     <MessageCircle className="w-6 h-6" />
                 </div>
             </div>
        )}
    </div>
  );
};

export default DemoView;
