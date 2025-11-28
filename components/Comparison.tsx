import React from 'react';
import { Check, X } from 'lucide-react';

const Comparison: React.FC = () => {
  return (
    <div className="py-24 sm:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Diferenciais HeroStack</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Entenda por que nosso modelo de assinatura com tecnologia moderna é superior aos construtores visuais e agências tradicionais.
          </p>
        </div>
        
        <div className="mt-16 overflow-hidden rounded-xl border bg-background shadow-sm">
            <div className="grid grid-cols-4 border-b bg-muted/50 p-4 text-sm font-medium text-muted-foreground">
                <div className="col-span-2 sm:col-span-1">Recurso</div>
                <div className="text-center">Construtor (Wix/Squarespace)</div>
                <div className="text-center">Agência Tradicional</div>
                <div className="text-center font-bold text-primary">HeroStack</div>
            </div>
            
            <div className="divide-y">
                {[
                    { name: 'Custo de Desenvolvimento', wix: 'Zero (DIY)', trad: 'Alto (R$ 2k+)', us: 'Zero' },
                    { name: 'Gestão Técnica', wix: 'Você faz tudo', trad: 'Cobrado à parte', us: 'Inclusa' },
                    { name: 'Tecnologia (Next.js)', wix: false, trad: 'Raro', us: true },
                    { name: 'Suporte via WhatsApp', wix: false, trad: true, us: true },
                    { name: 'Hospedagem Premium', wix: 'Paga à parte', trad: 'Paga à parte', us: 'Inclusa' },
                    { name: 'Sem Fidelidade', wix: true, trad: false, us: true },
                ].map((item, idx) => (
                    <div key={idx} className="grid grid-cols-4 p-4 items-center">
                        <div className="col-span-2 sm:col-span-1 text-sm font-medium">{item.name}</div>
                        <div className="flex justify-center text-muted-foreground text-sm">
                             {item.wix === true ? <Check className="w-5 h-5 text-green-500" /> : item.wix === false ? <X className="w-5 h-5 text-red-400" /> : item.wix}
                        </div>
                        <div className="flex justify-center text-muted-foreground text-sm">
                            {item.trad === true ? <Check className="w-5 h-5 text-green-500" /> : item.trad === false ? <X className="w-5 h-5 text-red-400" /> : item.trad}
                        </div>
                        <div className="flex justify-center text-primary font-bold text-sm">
                             {item.us === true ? <Check className="w-6 h-6 text-blue-600" /> : item.us}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Comparison;