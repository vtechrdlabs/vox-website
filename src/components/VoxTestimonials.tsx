"use client"

import { Button } from "@/components/ui/button";
import { Quote, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const VoxTestimonials = () => {
  // Conteúdo estático
  const content = {
    testimonials_title: "Empresários já estão transformando seus negócios com a Vox",
    testimonials_subtitle: "Empresários que já passaram pela Vox e estão colhendo os resultados:",
    testimonial_1_name: "Francisco Lemos",
    testimonial_1_company: "CEO – Frota Car & WG Barbearia",
    testimonial_1_quote: "O Vox Elite chegou exatamente no momento em que precisávamos. Um treinamento empresarial completo, que está impulsionando a evolução das nossas empresas.",
    testimonial_1_photo_url: "",
    testimonial_2_name: "Leonardo & Carla",
    testimonial_2_company: "CEOs – Avitex Aviamentos",
    testimonial_2_quote: "O Vox Elite veio para fortalecer ainda mais as empresas da nossa região, agregando valor real. Ele soma em todas as áreas do negócio: gestão, finanças e planejamento.",
    testimonial_2_photo_url: "",
    testimonial_3_name: "Cléa Silva",
    testimonial_3_company: "CEO Ondas Kids",
    testimonial_3_quote: "Muitas vezes ficamos tão presos à rotina que esquecemos de enxergar novas oportunidades. Esse evento é uma chance real de aprender, na prática, o que é gerir uma empresa. Estarei presente com certeza.",
    testimonial_3_photo_url: "",
    general_cta: "Garantir meu lugar"
  };

  const titleRef = useScrollAnimation<HTMLHeadingElement>();
  const subtitleRef = useScrollAnimation<HTMLParagraphElement>({ delay: 300 });
  const buttonRef = useScrollAnimation<HTMLButtonElement>({ delay: 1000 });

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const testimonials = [
    {
      name: content.testimonial_1_name,
      company: content.testimonial_1_company, 
      quote: content.testimonial_1_quote,
      photo: content.testimonial_1_photo_url
    },
    {
      name: content.testimonial_2_name,
      company: content.testimonial_2_company,
      quote: content.testimonial_2_quote,
      photo: content.testimonial_2_photo_url
    },
    {
      name: content.testimonial_3_name, 
      company: content.testimonial_3_company,
      quote: content.testimonial_3_quote,
      photo: content.testimonial_3_photo_url
    }
  ];

  return (
    <section className="py-20 bg-vox-darker">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef.ref}
            className={`text-3xl sm:text-4xl font-bold text-white mb-6 transition-all duration-800 ${
              titleRef.isVisible ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-60px]'
            }`}
          >
            {content.testimonials_title.split('Vox')[0]}<span className="vox-gradient-text">Vox</span>
          </h2>
          <p 
            ref={subtitleRef.ref}
            className={`text-lg text-gray-300 max-w-3xl mx-auto transition-all duration-800 ${
              subtitleRef.isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-[60px]'
            }`}
          >
            {content.testimonials_subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => {
            const cardRef = useScrollAnimation<HTMLDivElement>({ delay: index * 200 });
            
            return (
              <div 
                key={index}
                ref={cardRef.ref}
                className={`vox-backdrop-blur rounded-2xl p-8 transition-all duration-500 ${
                  cardRef.isVisible 
                    ? index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'
                    : 'opacity-0 translate-y-[30px]'
                } md:hover:scale-105`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Quote className="w-6 h-6 text-vox-secondary" />
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="border-t border-vox-secondary/20 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-vox-secondary/20 flex-shrink-0">
                      {testimonial.photo ? (
                        <img 
                          src={testimonial.photo} 
                          alt={`Foto de ${testimonial.name}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-vox-secondary text-lg font-semibold">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-vox-secondary text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
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