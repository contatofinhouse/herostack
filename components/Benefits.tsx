import React from 'react';
import { ShieldCheck, MessageCircle, Server, MousePointerClick } from 'lucide-react';

const Benefits: React.FC = () => {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Por que assinar?</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Mais que um site, uma equipe técnica à sua disposição.
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Ao contrário de agências que entregam o site e somem, ou ferramentas onde você faz tudo sozinho, nós somos seu parceiro contínuo.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                <MessageCircle className="h-5 w-5 flex-none text-green-600" aria-hidden="true" />
                Suporte Humanizado
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                <p className="flex-auto">Dúvidas? Problemas? Chame direto no WhatsApp. Sem tickets, sem robôs, sem espera de dias.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                <Server className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                Hospedagem Inclusa
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                <p className="flex-auto">Utilizamos infraestrutura global de alta performance. Seu site carrega rápido em qualquer lugar do mundo.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                <ShieldCheck className="h-5 w-5 flex-none text-slate-600" aria-hidden="true" />
                Segurança Total
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                <p className="flex-auto">Certificado SSL (cadeado), proteção contra ataques DDoS e backups automáticos. Tudo configurado.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                <MousePointerClick className="h-5 w-5 flex-none text-pink-600" aria-hidden="true" />
                Foco em Conversão
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                <p className="flex-auto">Design pensado para vender. Botões estratégicos, layouts limpos e experiência de usuário fluida.</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Benefits;