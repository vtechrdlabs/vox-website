"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const VoxFAQ = () => {
  // Conteúdo estático
  const content = {
    faq_title: "Perguntas Frequentes",
    faq_1_question: "O que é a Vox Elite?",
    faq_1_answer: "O Vox Elite é um programa de mentoria estratégica que ajuda empresários a elevarem seus negócios. Em uma imersão exclusiva com os melhores mentores do Brasil, você terá visão de negócio, gestão aprimorada e networking qualificado para gerar resultados reais. Tudo isso com conteúdo prático direcionado à realidade do Polo de Confecções e outros segmentos.",
    faq_2_question: "Quem pode participar?",
    faq_2_answer: "Empresários, gestores e líderes que buscam estratégia, crescimento e conexões de alto nível para acelerar seus resultados.",
    faq_3_question: "Onde acontecem os encontros?",
    faq_3_answer: "Na sede da Vox Educação, em Santa Cruz do Capibaribe – PE, em formato totalmente presencial.",
    faq_4_question: "Quanto tempo dura a imersão?",
    faq_4_answer: "São 2 dias intensos, cheios de prática e networking — 04 e 05 de outubro.",
    faq_5_question: "Qual a diferença da Vox Elite para outros cursos?",
    faq_5_answer: "A Vox Elite é prática, estratégica e aplicada à realidade local. Você aprende com mentores experientes, amplia seu networking e sai pronto para aplicar no seu negócio.",
    faq_6_question: "Preciso ter uma empresa para participar?",
    faq_6_answer: "É voltado principalmente para quem já empreende, mas também é uma excelente oportunidade para quem está estruturando o negócio e quer começar do jeito certo.",
    faq_7_question: "Há alguma certificação após a finalização da formação?",
    faq_7_answer: "Sim. Você recebe um certificado executivo de 18h presenciais, validando sua participação e conclusão da imersão.",
    faq_8_question: "Como faço para garantir minha vaga?",
    faq_8_answer: "As vagas são limitadas! Entre em contato pelo WhatsApp (81) 99107-0205 e agende uma reunião para entendermos a realidade do seu negócio e como a Vox Elite pode ajudar você a crescer.",
    general_cta: "Garantir meu lugar"
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const faqs = [
    {
      question: content.faq_1_question,
      answer: content.faq_1_answer
    },
    {
      question: content.faq_2_question,
      answer: content.faq_2_answer
    },
    {
      question: content.faq_3_question,
      answer: content.faq_3_answer
    },
    {
      question: content.faq_4_question,
      answer: content.faq_4_answer
    },
    {
      question: content.faq_5_question,
      answer: content.faq_5_answer
    },
    {
      question: content.faq_6_question,
      answer: content.faq_6_answer
    },
    {
      question: content.faq_7_question,
      answer: content.faq_7_answer
    },
    {
      question: content.faq_8_question,
      answer: content.faq_8_answer
    }
  ];

  return (
    <section className="py-20 bg-vox-darker">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="vox-backdrop-blur rounded-3xl p-12 animate-scale-in">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              {content.faq_title.split('Frequentes')[0]}<span className="vox-gradient-text">Frequentes</span>
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="vox-backdrop-blur rounded-xl px-6 border-vox-secondary/20"
              >
                <AccordionTrigger className="text-white hover:text-vox-secondary text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="text-center">
            <Button 
              variant="vox" 
              size="xxl" 
              className="shadow-vox-glow animate-subtle-pulse"
              onClick={scrollToForm}
            >
              {content.general_cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};