"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
  }
}

const VoxContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    monthlyRevenue: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { ref: elementRef, isVisible } = useScrollAnimation<HTMLDivElement>();

  const revenueOptions = [
    "De R$ 10 mil a R$ 50 mil",
    "De R$ 50 mil a R$ 200 mil", 
    "De R$ 200 mil a R$ 500 mil",
    "De R$ 500 mil a R$ 1 milhão",
    "Acima de R$ 1 milhão"
  ];

  // 👉 Máscara de telefone
  const formatPhoneNumber = (value: string) => {
    let digits = value.replace(/\D/g, "");
    if (digits.length > 11) digits = digits.slice(0, 11);

    if (digits.length <= 2) {
      return `(${digits}`;
    } else if (digits.length <= 3) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits[2]}.${digits.slice(3)}`;
    } else if (digits.length <= 11) {
      return `(${digits.slice(0, 2)}) ${digits[2]}.${digits.slice(3, 7)}-${digits.slice(7)}`;
    }

    return value;
  };

  // 👉 Validação de e-mail
  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const trackLeadEvent = (leadData: typeof formData) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'lead_generated',
        lead_name: leadData.name,
        lead_email: leadData.email,
        lead_phone: leadData.whatsapp,
        lead_revenue: leadData.monthlyRevenue,
        form_name: 'vox_elite_contact_form',
        page_location: window.location.href
      });
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'lead_generated', {
        event_category: 'Lead',
        event_label: 'Vox Elite Contact Form',
        custom_parameter_name: leadData.name,
        custom_parameter_email: leadData.email
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.name || !formData.whatsapp || !formData.email || !formData.monthlyRevenue) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, insira um e-mail válido.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const webhookResponse = await fetch('https://webhooks.vtechoficial.com/webhook/captacao/voxelite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          whatsapp: formData.whatsapp,
          email: formData.email,
          monthlyRevenue: formData.monthlyRevenue,
          source: 'vox_elite_website',
          timestamp: new Date().toISOString(),
          page_url: typeof window !== 'undefined' ? window.location.href : ''
        })
      });

      if (webhookResponse.ok) {
        trackLeadEvent(formData);
        setIsSubmitted(true);
        toast({
          title: "Formulário enviado com sucesso!",
          description: "Em breve nossa equipe de consultores entrará em contato com você.",
        });
        setFormData({ name: "", whatsapp: "", email: "", monthlyRevenue: "" });
      } else {
        throw new Error(`Erro ${webhookResponse.status}: ${webhookResponse.statusText}`);
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar formulário",
        description: "Tente novamente em alguns minutos ou entre em contato conosco.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 👉 Tela de Obrigado
  if (isSubmitted) {
    return (
      <section className="py-20 bg-vox-darker relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-vox-dark/50 to-vox-darker"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-vox-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-vox-secondary/5 rounded-full blur-3xl animate-float"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="contact-form">
          <div className="max-w-2xl mx-auto">
            <div className="bg-vox-dark/60 backdrop-blur-sm border border-vox-secondary/20 rounded-2xl p-8 shadow-2xl text-center">
              <div className="text-center mb-8">
                <img 
                  src="/lovable-uploads/df7a250b-5aaa-4638-bda3-b22f21047b7d.png" 
                  alt="Vox Elite Logo" 
                  className="w-32 h-32 mx-auto object-contain"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Formulário enviado com sucesso!
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Em breve nossa equipe de consultores especializados entrará em contato com você para agendar uma conversa exclusiva sobre como o Vox Elite pode transformar o seu negócio.
              </p>
              <p className="text-lg text-vox-secondary">
                Fique atento ao seu WhatsApp e e-mail!
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 👉 Formulário
  return (
    <section className="py-20 bg-vox-darker relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-vox-dark/50 to-vox-darker"></div>
      <div className="absolute top-20 left-20 w-96 h-96 bg-vox-primary/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-vox-secondary/5 rounded-full blur-3xl animate-float"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="contact-form">
        <div 
          ref={elementRef}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Preencha o formulário abaixo e nosso time de consultores entrará em contato com você
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-vox-dark/60 backdrop-blur-sm border border-vox-secondary/20 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <img 
                  src="/lovable-uploads/df7a250b-5aaa-4638-bda3-b22f21047b7d.png" 
                  alt="Vox Elite Logo" 
                  className="w-32 h-32 mx-auto object-contain"
                />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">Qual seu nome?</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Qual seu nome?"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-vox-darker/50 border-vox-secondary/30 text-white placeholder:text-gray-500 focus:border-vox-primary h-12"
                    disabled={isLoading}
                  />
                </div>

                {/* WhatsApp */}
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-gray-300">Qual seu WhatsApp com DDD?</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="(81) 9.9853-6015"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange("whatsapp", formatPhoneNumber(e.target.value))}
                    className="bg-vox-darker/50 border-vox-secondary/30 text-white placeholder:text-gray-500 focus:border-vox-primary h-12"
                    disabled={isLoading}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Seu melhor E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Seu melhor E-mail"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-vox-darker/50 border-vox-secondary/30 text-white placeholder:text-gray-500 focus:border-vox-primary h-12"
                    disabled={isLoading}
                  />
                </div>

                {/* Faturamento */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Faturamento Médio no Mês</Label>
                  <Select onValueChange={(value) => handleInputChange('monthlyRevenue', value)} disabled={isLoading}>
                    <SelectTrigger className="bg-vox-darker/50 border-vox-secondary/30 text-white focus:border-vox-primary h-12">
                      <SelectValue placeholder="Faturamento Médio no Mês" />
                    </SelectTrigger>
                    <SelectContent className="bg-vox-darker border-vox-secondary/30">
                      {revenueOptions.map((option) => (
                        <SelectItem key={option} value={option} className="text-white hover:bg-vox-primary/20">
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Botão */}
                <Button
                  type="submit"
                  variant="vox-form"
                  size="xxl"
                  disabled={isLoading}
                  className="w-full text-sm sm:text-base md:text-xl"
                >
                  {isLoading ? 'ENVIANDO...' : 'QUERO GARANTIR MINHA VAGA'}
                </Button>

                {/* Aviso */}
                <div className="text-center text-sm text-gray-400 mt-6">
                  <p>
                    Ao me cadastrar, autorizo o recebimento de comunicações
                    <br />
                    (WhatsApp, SMS, e-mail e ligação).{" "}
                    <span className="text-red-400 cursor-pointer hover:underline">[Saiba mais]</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoxContactForm;
