"use client"

import { Button } from "@/components/ui/button";
import { Clock, Users, Calendar } from "lucide-react";
import { useScrollAnimation, useParallax } from "@/hooks/useScrollAnimation";

export const VoxUrgency = () => {
  // Conteúdo estático
  const content = {
    urgency_title: "Primeira turma: 04 e 05 de outubro",
    urgency_text_1: "Essa é a sua chance de fazer parte do maior encontro de empresários do Polo de Confecções Pernambucano.",
    urgency_text_2: "As vagas são limitadas e a procura já começou.",
    general_cta: "Garantir meu lugar"
  };

  const containerRef = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const titleRef = useScrollAnimation<HTMLHeadingElement>({ delay: 200 });
  const iconsRef = useScrollAnimation<HTMLDivElement>({ delay: 400 });
  const textRef = useScrollAnimation<HTMLDivElement>({ delay: 600 });
  const buttonRef = useScrollAnimation<HTMLButtonElement>({ delay: 800 });
  const parallaxRef = useParallax<HTMLDivElement>(0.3);

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-20 bg-vox-dark relative overflow-hidden">
      {/* Parallax background elements */}
      <div 
        ref={parallaxRef.ref}
        className="absolute inset-0 opacity-20"
        style={{ transform: `translateY(${parallaxRef.offset}px)` }}
      >
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-vox-secondary/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-vox-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={containerRef.ref}
          className={`vox-backdrop-blur rounded-3xl p-12 text-center transition-all duration-1000 ${
            containerRef.isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
          }`}
        >
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 
                ref={titleRef.ref}
                className={`text-3xl sm:text-4xl font-bold text-white transition-all duration-800 ${
                  titleRef.isVisible ? 'animate-float-up' : 'opacity-0 translate-y-[50px]'
                }`}
              >
                {content.urgency_title.split(':')[0]}:<span className="vox-gradient-text">{content.urgency_title.split(':')[1]}</span>
              </h2>
            </div>
            
            <div 
              ref={iconsRef.ref}
              className={`grid md:grid-cols-3 gap-6 mb-8 transition-all duration-800 ${
                iconsRef.isVisible ? 'animate-stagger-fade' : 'opacity-0 translate-y-[40px]'
              }`}
            >
              <div className="flex items-center justify-center gap-3 text-yellow-400">
                <Calendar className="w-6 h-6" />
                <span className="font-semibold">Vagas limitadas</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-red-400">
                <Clock className="w-6 h-6" />
                <span className="font-semibold">A procura já começou</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-vox-secondary">
                <Users className="w-6 h-6" />
                <span className="font-semibold">Exclusivo</span>
              </div>
            </div>
          </div>
          
          <div 
            ref={textRef.ref}
            className={`space-y-4 mb-8 transition-all duration-800 ${
              textRef.isVisible ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-60px]'
            }`}
          >
            <p className="text-lg text-gray-300">
              {content.urgency_text_1}
            </p>
            <p className="text-lg text-gray-300">
              {content.urgency_text_2}
            </p>
          </div>
          
          <Button 
            ref={buttonRef.ref}
            variant="vox" 
            size="xl" 
            className={`shadow-vox-glow transition-all duration-800 ${
              buttonRef.isVisible ? 'animate-scale-in modern-hover' : 'opacity-0 scale-90'
            }`}
            onClick={scrollToForm}
          >
            {content.general_cta}
          </Button>
        </div>
      </div>
    </section>
  );
};