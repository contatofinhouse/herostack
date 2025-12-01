
import React from 'react';
import { Card, CardContent, Badge, Button } from './ui/DesignSystem';
import { Eye } from 'lucide-react';
import { Template } from '../types';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Updated with accurate Portuguese names and matching imagery
const templates: Template[] = [
  {
    id: '1',
    name: 'Dashboard SaaS Pro',
    category: 'SaaS',
    description: 'Ideal para Startups. Interface administrativa poderosa focada em métricas, retenção de usuários e escalabilidade do negócio.',
    // Image: Modern Dashboard/Analytics
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
  },
  {
    id: '2',
    name: 'Studio Design Digital',
    category: 'Institucional',
    description: 'Para Agências e Arquitetos. Um portfólio visualmente imersivo que destaca seus projetos e eleva o valor percebido da marca.',
    // Image: Creative/Artistic
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80'
  },
  {
    id: '3',
    name: 'Advocacia & Associados',
    category: 'Serviços',
    description: 'Para Escritórios Jurídicos. Design sóbrio que transmite autoridade, confiança e facilita o agendamento de consultas.',
    // Image: Law Office/Formal
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80'
  },
  {
    id: '4',
    name: 'Moda & E-commerce',
    category: 'Loja Virtual',
    description: 'Para Varejo e Lifestyle. Experiência de compra fluida, ultrarrápida e otimizada para vender muito mais no celular.',
    // Image: Fashion/Retail
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'
  }
];

interface ShowcaseCardProps {
    template: Template;
    onViewDemo?: (template: Template) => void;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ template, onViewDemo }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for the parallax movement
    const mouseX = useSpring(x, { stiffness: 400, damping: 90 });
    const mouseY = useSpring(y, { stiffness: 400, damping: 90 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const xPos = e.clientX - left - width / 2;
        const yPos = e.clientY - top - height / 2;
        
        // Parallax factor (divide by higher number for subtler effect)
        x.set(xPos / 25);
        y.set(yPos / 25);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleDemoClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event bubbling
        if (onViewDemo) {
            onViewDemo(template);
        }
    };

    return (
        <Card 
            className="overflow-hidden group hover:border-primary transition-all duration-300 bg-card/60 backdrop-blur-md"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative h-72 overflow-hidden">
                <motion.div
                    style={{ x: mouseX, y: mouseY }}
                    className="w-full h-full"
                >
                    <img 
                        src={template.image} 
                        alt={template.name} 
                        // scale-105 prevents white edges from showing during parallax movement
                        // group-hover:scale-125 provides the requested zoom-in effect
                        className="w-full h-full object-cover transition-transform duration-700 scale-105 group-hover:scale-125"
                    />
                </motion.div>
                
                {/* Overlay with Demo Button */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <Button 
                        variant="default" 
                        size="lg"
                        className="gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white text-black hover:bg-white/90"
                        onClick={handleDemoClick}
                    >
                        <Eye className="w-5 h-5" /> Ver Demo Interativo
                    </Button>
                </div>
            </div>
            <CardContent className="p-6 relative bg-card/40 backdrop-blur-sm z-10">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold">{template.name}</h3>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {template.category}
                    </Badge>
                </div>
                <p className="text-muted-foreground text-sm">{template.description}</p>
            </CardContent>
        </Card>
    );
};

interface ShowcaseProps {
    onClose: () => void;
    onViewDemo?: (template: Template) => void;
}

const Showcase: React.FC<ShowcaseProps> = ({ onClose, onViewDemo }) => {
  return (
    // Changed py-24 to py-12 for mobile
    <div className="py-12 sm:py-24 relative z-10 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Templates Premium</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Designs premiados, otimizados para conversão e performance máxima.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {templates.map((template) => (
            <ShowcaseCard 
                key={template.id} 
                template={template} 
                onViewDemo={onViewDemo} 
            />
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
