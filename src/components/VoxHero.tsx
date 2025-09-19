"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useScrollAnimation, useParallax } from "@/hooks/useScrollAnimation";
import Image from "next/image";

export const VoxHero = () => {
  // Conteúdo estático
  const content = {
    hero_title:
      "O encontro que vai transformar empresários em líderes de alto nível",
    hero_subtitle:
      "Dois dias de imersão com mentores renomados de todo o Brasil para acelerar sua gestão e multiplicar resultados",
    hero_date: "04 e 05 de outubro",
    general_cta: "Garantir meu lugar",
    video_url: "https://www.youtube.com/watch?v=dlaqJSJrB_8",
    hero_image: "",
  };

  const [showVideo, setShowVideo] = useState(false); // inicia como false
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  // Imagens
  const newHeroImage =
    "/lovable-uploads/d18daa21-6047-48fc-87b2-d19055dd9b10.png";
  const videoThumbnail = "/vox-elite-video-thumbnail.png";

  // Hooks de animação
  const logoRef = useScrollAnimation<HTMLDivElement>({ delay: 100 });
  const titleRef = useScrollAnimation<HTMLHeadingElement>({ delay: 300 });
  const subtitleRef = useScrollAnimation<HTMLParagraphElement>({ delay: 500 });
  const videoContainerRef = useScrollAnimation<HTMLDivElement>({ delay: 700 });
  const buttonRef = useScrollAnimation<HTMLButtonElement>({ delay: 900 });
  const parallaxRef = useParallax<HTMLDivElement>(0.2);

  // Efeito para iniciar o vídeo automaticamente quando o container ficar visível
  useEffect(() => {
    if (videoContainerRef.isVisible && !videoLoaded) {
      // Pequeno delay para garantir que a animação termine
      const timer = setTimeout(() => {
        setShowVideo(true);
        setVideoLoaded(true);
      }, 800); // Aguarda a animação do container terminar

      return () => clearTimeout(timer);
    }
  }, [videoContainerRef.isVisible, videoLoaded]);

  const scrollToForm = () => {
    const formElement = document.getElementById("contact-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePlayClick = () => {
    if (!content.video_url) {
      alert("Adicione uma URL de vídeo no painel administrativo primeiro!");
      return;
    }
    setShowVideo(true);
  };

  const isYouTubeUrl = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  const isVimeoUrl = (url: string) => {
    return url.includes("vimeo.com");
  };

  const getEmbedUrl = (url: string) => {
    if (isYouTubeUrl(url)) {
      const videoId = url.includes("youtu.be")
        ? url.split("youtu.be/")[1]?.split("?")[0]
        : url.split("v=")[1]?.split("&")[0];
      // Adicionado autoplay=1 para iniciar automaticamente
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&mute=1`;
    }

    if (isVimeoUrl(url)) {
      const videoId = url.split("/").pop()?.split("?")[0];
      // Adicionado autoplay=1 e muted=1 para iniciar automaticamente
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&badge=0&autopause=0&playsinline=1&muted=1`;
    }

    return url;
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 vox-hero-bg" />

      {/* Hero Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 sm:opacity-20"
        style={{ backgroundImage: `url(${content.hero_image || newHeroImage})` }}
      />

      {/* Parallax decorative elements */}
      <div
        ref={parallaxRef.ref}
        className="absolute inset-0 opacity-30"
        style={{ transform: `translateY(${parallaxRef.offset}px)` }}
      >
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-vox-secondary/10 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-vox-primary/10 rounded-full blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
          {/* Logo */}
          <div
            ref={logoRef.ref}
            className={`mt-16 mb-8 transition-all duration-800 ${
              logoRef.isVisible ? "animate-scale-in" : "opacity-0 scale-90"
            }`}
          >
            <Image
              src="/lovable-uploads/b7c0ef70-756b-46fe-8952-75217a609b83.png"
              alt="Vox Logo"
              width={160}
              height={160}
              className="h-20 sm:h-24 lg:h-28 w-auto mx-auto"
              priority
            />
          </div>

          {/* Title */}
          <h1
            ref={titleRef.ref}
            className={`text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight uppercase transition-all duration-700 ${
              titleRef.isVisible
                ? "animate-float-up"
                : "opacity-0 translate-y-[50px] sm:translate-y-[100px] scale-95 sm:scale-80"
            }`}
          >
            {content.hero_title}
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef.ref}
            className={`text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed transition-all duration-600 ${
              subtitleRef.isVisible
                ? "animate-slide-in-left"
                : "opacity-0 translate-x-[-30px] sm:translate-x-[-60px]"
            }`}
          >
            {content.hero_subtitle}
          </p>

          {/* Video */}
          <div className="max-w-4xl mx-auto mt-8">
            <div
              ref={videoContainerRef.ref}
              className={`relative aspect-video bg-vox-darker rounded-2xl overflow-hidden vox-card-shadow transition-all duration-600 ${
                videoContainerRef.isVisible
                  ? "animate-scale-in md:hover:scale-105"
                  : "opacity-0 scale-95"
              }`}
            >
              <div ref={videoRef}>
                {!showVideo ? (
                  // Thumbnail com botão play (só aparece até o vídeo carregar)
                  <div className="absolute inset-0">
                    <Image
                      src={videoThumbnail}
                      alt="Conheça o Vox Elite - Vídeo de apresentação"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      priority={false}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <button
                        onClick={handlePlayClick}
                        className="w-20 h-20 bg-vox-secondary rounded-full flex items-center justify-center md:hover:scale-110 transition-transform duration-300 shadow-vox-glow"
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </button>
                    </div>
                  </div>
                ) : (
                  // Vídeo incorporado com autoplay
                  <div className="absolute inset-0">
                    {isYouTubeUrl(content.video_url) || isVimeoUrl(content.video_url) ? (
                      <iframe
                        src={getEmbedUrl(content.video_url)}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Vox Elite Video"
                      />
                    ) : (
                      <video
                        src={content.video_url}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        muted
                        playsInline
                        preload="metadata"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8">
            <Button
              ref={buttonRef.ref}
              variant="vox"
              size="xxl"
              className={buttonRef.isVisible ? "animate-scale-in modern-hover" : "opacity-0 scale-90"}
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