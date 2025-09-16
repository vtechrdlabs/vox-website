"use client"

import { Button } from "@/components/ui/button";
import { CheckCircle, Coffee, Users, TrendingUp, DollarSign, BarChart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const VoxBenefits = () => {
  // Conteúdo estático
  const content = {
    benefits_title: "Sua experiência no Vox Elite",
    benefits_subtitle: "Dois dias de imersão presencial com acesso exclusivo a:",
    general_cta: "Garantir meu lugar"
  };

  const titleRef = useScrollAnimation<HTMLHeadingElement>();
  const subtitleRef = useScrollAnimation<HTMLParagraphElement>({ delay: 200 });
  const buttonRef = useScrollAnimation<HTMLButtonElement>({ delay: 1200 });

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  const benefits = [
    { icon: CheckCircle, text: "Workshops de alto impacto com resultados aplicáveis ao seu negócio" },
    { icon: Users, text: "Networking estratégico com líderes e empresários que impulsionam a região" },
    { icon: BarChart, text: "Painéis com especialistas de mercado e gestão" },
    { icon: TrendingUp, text: "Os 4 pilares que sustentam empresas de alto nível: Gestão • Estratégia • Cultura • Finanças" },
    { icon: DollarSign, text: "Transformação empresarial: eficiência, previsibilidade e independência para decisões seguras" },
    { icon: Coffee, text: "Experiência completa: coffee break, almoço executivo e happy hour" }
  ];

  return (
    <section className="py-20 bg-vox-darker">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef.ref}
            className={`text-3xl sm:text-4xl font-bold text-white mb-6 transition-all duration-600 ${
              titleRef.isVisible ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-30px]'
            }`}
          >
            Sua experiência no <span className="vox-gradient-text">Vox Elite</span>
          </h2>
          <p 
            ref={subtitleRef.ref}
            className={`text-lg text-gray-300 max-w-3xl mx-auto transition-all duration-600 ${
              subtitleRef.isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-[30px]'
            }`}
          >
            {content.benefits_subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const cardRef = useScrollAnimation<HTMLDivElement>({ delay: index * 100 });
            
            return (
              <div 
                key={index}
                ref={cardRef.ref}
                className={`vox-backdrop-blur rounded-xl p-6 flex flex-col items-center text-center gap-4 min-h-[160px] transition-all duration-500 ${
                  cardRef.isVisible 
                    ? 'animate-float-up' 
                    : 'opacity-0 translate-y-[50px] sm:translate-y-[100px] scale-90 sm:scale-75'
                } md:hover:scale-105`}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-vox-secondary/20 rounded-lg flex items-center justify-center">
                    <Icon className="w-8 h-8 text-vox-secondary" />
                  </div>
                </div>
                <div className="flex-1 flex items-center">
                  <p className="text-white font-medium text-base sm:text-lg leading-relaxed">{benefit.text}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center">
          <Button 
            ref={buttonRef.ref}
            variant="vox" 
            size="xxl"
            className={`animate-subtle-pulse transition-all duration-500 ${
              buttonRef.isVisible ? 'animate-scale-in' : 'opacity-0 scale-90'
            } md:hover:scale-105`}
            onClick={scrollToForm}
          >
            {content.general_cta}
          </Button>
        </div>
      </div>
    </section>
  );
};