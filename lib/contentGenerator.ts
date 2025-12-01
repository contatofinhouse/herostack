
import { DraftConfig, FormData, SiteSection } from '../types';

// Image banks for different industries (High Quality Unsplash)
const images = {
  law: {
    hero: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&q=80', // Premium Office
    about: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80', // Handshake
    service1: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80', // Gavel
    service2: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', // Signing
    gallery1: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    gallery2: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80',
  },
  health: {
    hero: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&q=80', // Modern Clinic
    about: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', // Research
    service1: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80', // Doctor
    service2: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80', // Equipment
    gallery1: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    gallery2: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&q=80',
  },
  tech: {
    hero: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80', // Tech Team
    about: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80', // Meeting
    service1: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', // Analytics
    service2: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', // Dashboard
    gallery1: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    gallery2: 'https://images.unsplash.com/photo-1504384308090-c54be3855833?w=800&q=80',
  },
  commerce: {
    hero: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80', // Store
    about: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80', // Fashion
    service1: 'https://images.unsplash.com/photo-1472851294608-4151050e5299?w=800&q=80', // Coffee
    service2: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80', // Shopping
    gallery1: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80',
    gallery2: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80',
  },
  default: {
    hero: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    about: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    service1: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?w=800&q=80',
    service2: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&q=80',
    gallery1: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    gallery2: 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?w=800&q=80',
  }
};

export const generateDraft = (form: FormData): DraftConfig => {
  const industry = (form.industry || '').toLowerCase();
  
  // Determine Type
  let type: 'law' | 'health' | 'tech' | 'commerce' | 'default' = 'default';
  if (industry.includes('advocacia') || industry.includes('jurídico')) type = 'law';
  if (industry.includes('saúde') || industry.includes('estética') || industry.includes('odonto')) type = 'health';
  if (industry.includes('tech') || industry.includes('saas') || industry.includes('startup')) type = 'tech';
  if (industry.includes('loja') || industry.includes('commerce') || industry.includes('restaurante')) type = 'commerce';

  const imgs = images[type];
  const name = form.businessName || 'Sua Empresa';

  // --- CONTENT TEMPLATES (WOW FACTOR) ---

  const heroSection: SiteSection = {
    id: 'hero',
    type: 'hero',
    title: type === 'law' ? 'Justiça, Ética e Resultados.' 
         : type === 'health' ? 'Sua Saúde em Primeiro Lugar.'
         : type === 'commerce' ? `Estilo e Qualidade na ${name}.`
         : `Inovação Digital para ${name}.`,
    subtitle: form.businessDescription || 'Transformamos desafios em oportunidades. Conheça nossas soluções e eleve o nível do seu negócio.',
    content: 'Falar com Especialista',
    image: imgs.hero
  };

  const statsSection: SiteSection = {
    id: 'stats',
    type: 'stats',
    title: 'Nossos Números',
    items: [
        { title: 'Clientes Satisfeitos', desc: '+500', icon: 'Users' },
        { title: 'Anos de Experiência', desc: '10+', icon: 'Calendar' },
        { title: 'Projetos Entregues', desc: '+1200', icon: 'CheckCircle' },
        { title: 'Nota Média', desc: '4.9/5', icon: 'Star' },
    ]
  };

  const featuresSection: SiteSection = {
    id: 'features',
    type: 'features',
    title: type === 'law' ? 'Áreas de Atuação' : 'Nossos Serviços',
    subtitle: 'Soluções personalizadas para atender suas necessidades.',
    items: [
      { title: type === 'law' ? 'Direito Civil' : 'Consultoria Premium', desc: 'Análise detalhada e estratégica.', icon: 'Star' },
      { title: type === 'law' ? 'Consultoria' : 'Suporte 24/7', desc: 'Estamos sempre disponíveis para você.', icon: 'Shield' },
      { title: type === 'law' ? 'Contratos' : 'Alta Performance', desc: 'Resultados que superam expectativas.', icon: 'Zap' },
    ]
  };

  const pricingSection: SiteSection = {
    id: 'pricing',
    type: 'pricing',
    title: 'Planos e Preços',
    subtitle: 'Escolha a opção ideal para o seu momento.',
    items: [
        { title: 'Básico', price: 'R$ 99', desc: 'Essencial para começar.', features: ['Recurso A', 'Recurso B', 'Suporte Email'] },
        { title: 'Profissional', price: 'R$ 199', desc: 'Para quem quer crescer.', features: ['Tudo do Básico', 'Prioridade', 'Consultoria'], highlight: true },
        { title: 'Enterprise', price: 'Consulte', desc: 'Grandes operações.', features: ['Atendimento VIP', 'SLA Garantido', 'Gestor de Conta'] },
    ]
  };

  const aboutSection: SiteSection = {
    id: 'about',
    type: 'about',
    title: 'Quem Somos',
    content: `A ${name} é referência no mercado de ${form.industry || 'serviços'}. Fundada com o compromisso de entregar excelência, nossa trajetória é marcada por inovação e resultados sólidos.\n\nAcreditamos que cada cliente é único, e por isso desenvolvemos metodologias exclusivas para garantir a máxima satisfação.`,
    image: imgs.about
  };

  const gallerySection: SiteSection = {
      id: 'gallery',
      type: 'gallery',
      title: 'Galeria',
      subtitle: 'Conheça nossa estrutura e trabalhos recentes.',
      items: [
          { title: 'Projeto 1', image: imgs.service1 },
          { title: 'Ambiente', image: imgs.hero },
          { title: 'Equipe', image: imgs.service2 },
          { title: 'Detalhes', image: imgs.gallery1 },
      ]
  };

  // --- PAGES GENERATION ---

  return {
    colors: form.brandColors,
    typography: form.typography,
    businessName: name,
    tagline: type === 'law' ? 'Excelência e Confiança' : 'Inovação Constante',
    industry: type, 
    logoUrl: undefined, 
    contact: {
      email: form.email,
      phone: form.phone,
      address: 'Av. Paulista, 1000 - São Paulo, SP',
      whatsapp: form.phone
    },
    pages: {
      home: {
        title: 'Início',
        slug: '/',
        sections: [heroSection, statsSection, featuresSection, pricingSection, gallerySection, aboutSection]
      },
      about: {
        title: 'Sobre',
        slug: '/sobre',
        sections: [
          { 
            id: 'about-hero', type: 'hero', 
            title: 'Nossa História', 
            subtitle: 'Tradição e modernidade caminhando juntas.', 
            image: imgs.gallery2 
          },
          {
            id: 'about-text', type: 'about',
            title: 'Missão, Visão e Valores',
            content: 'Nossa missão é transformar o mercado através de soluções inteligentes e éticas. Valorizamos a transparência nas relações e o foco total no sucesso do cliente.',
            image: imgs.service1
          }
        ]
      },
      services: {
        title: type === 'commerce' ? 'Produtos' : 'Serviços',
        slug: '/servicos',
        sections: [
           { 
            id: 'services-list', type: 'features', 
            title: type === 'commerce' ? 'Catálogo Completo' : 'O Que Oferecemos',
            items: [
                { title: 'Solução A', desc: 'Descrição completa do serviço A.', icon: 'Check' },
                { title: 'Solução B', desc: 'Descrição completa do serviço B.', icon: 'Check' },
                { title: 'Solução C', desc: 'Descrição completa do serviço C.', icon: 'Check' },
                { title: 'Solução D', desc: 'Descrição completa do serviço D.', icon: 'Check' },
            ]
          }
        ]
      },
      contact: {
        title: 'Contato',
        slug: '/contato',
        sections: [
          { id: 'contact-form', type: 'contact-form', title: 'Vamos Conversar?', subtitle: 'Preencha o formulário abaixo ou nos chame no WhatsApp.' }
        ]
      }
    }
  };
};
