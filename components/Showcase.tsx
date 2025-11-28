import React from 'react';
import { Card, CardContent, Badge, Button } from './ui/DesignSystem';
import { ExternalLink, Eye } from 'lucide-react';
import { Template } from '../types';

// Updated with accurate Portuguese names and matching imagery
const templates: Template[] = [
  {
    id: '1',
    name: 'Dashboard SaaS Pro',
    category: 'SaaS',
    description: 'Interface administrativa moderna focada em métricas e conversão para startups.',
    // Image: Modern Dashboard/Analytics
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
  },
  {
    id: '2',
    name: 'Studio Design Digital',
    category: 'Institucional',
    description: 'Portfolio minimalista e artístico para agências e criativos.',
    // Image: Creative/Artistic
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80'
  },
  {
    id: '3',
    name: 'Advocacia & Associados',
    category: 'Serviços',
    description: 'Layout sóbrio e elegante que transmite confiança e autoridade.',
    // Image: Law Office/Formal
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80'
  },
  {
    id: '4',
    name: 'Moda & E-commerce',
    category: 'Loja Virtual',
    description: 'Vitrine de alta velocidade focada em experiência mobile e vendas.',
    // Image: Fashion/Retail
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'
  }
];

interface ShowcaseProps {
    onClose: () => void;
    onViewDemo?: (template: Template) => void;
}

const Showcase: React.FC<ShowcaseProps> = ({ onClose, onViewDemo }) => {
  
  const handleDemoClick = (e: React.MouseEvent, template: Template) => {
    e.stopPropagation(); // Prevent event bubbling
    if (onViewDemo) {
        onViewDemo(template);
    }
  };

  return (
    <div className="py-24 relative z-10 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Templates Premium</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Designs premiados, otimizados para conversão e performance máxima.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden group hover:border-primary transition-all duration-300 bg-card/60 backdrop-blur-md">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay with Demo Button */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <Button 
                        variant="default" 
                        size="lg"
                        className="gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white text-black hover:bg-white/90"
                        onClick={(e) => handleDemoClick(e, template)}
                    >
                        <Eye className="w-5 h-5" /> Ver Demo Interativo
                    </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{template.name}</h3>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {template.category}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">{template.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
             <Button onClick={onClose} size="lg" variant="outline">Voltar para Início</Button>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
