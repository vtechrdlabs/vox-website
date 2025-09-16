"use client"

import { Button } from "@/components/ui/button";
import { Play, Star } from "lucide-react";

export const VoxProofEarly = () => {
  // Conteúdo estático
  const content = {
    proof_title: "Empresários já estão transformando seus negócios com a Vox",
    proof_testimonial_1: "Depois do Vox, consegui estruturar meu financeiro e hoje tenho previsibilidade no faturamento.",
    general_cta: "Garantir meu lugar"
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-20 bg-vox-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {content.proof_title.split('Vox')[0]}<span className="vox-gradient-text">Vox</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Video testimonial placeholders */}
          {[1, 2, 3].map((index) => (
            <div 
              key={index}
              className="vox-backdrop-blur rounded-2xl overflow-hidden animate-fade-in hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video bg-vox-darker relative">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-vox-primary/20 to-vox-secondary/20">
                  <button className="w-12 h-12 bg-vox-secondary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm italic mb-3">
                  "{content.proof_testimonial_1}"
                </p>
                <div className="border-t border-vox-secondary/20 pt-3">
                  <p className="text-white font-semibold text-sm">Empresário {index}</p>
                  <p className="text-vox-secondary text-xs">Confecções do Polo</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            variant="vox" 
            size="lg"
            onClick={scrollToForm}
          >
            {content.general_cta}
          </Button>
        </div>
      </div>
    </section>
  );
};