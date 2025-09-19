"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Volume2, VolumeX } from "lucide-react";
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

  const [showVideo, setShowVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Imagens
  const newHeroImage = "/lovable-uploads/d18daa21-6047-48fc-87b2-d19055dd9b10.png";
  const videoThumbnail = "/vox-elite-video-thumbnail.png";

  // Hooks de animação
  const logoRef = useScrollAnimation<HTMLDivElement>({ delay: 100 });
  const titleRef = useScrollAnimation<HTMLHeadingElement>({ delay: 300 });
  const subtitleRef = useScrollAnimation<HTMLParagraphElement>({ delay: 500 });
  const videoContainerRef = useScrollAnimation<HTMLDivElement>({ delay: 700 });
  const buttonRef = useScrollAnimation<HTMLButtonElement>({ delay: 900 });
  const parallaxRef = useParallax<HTMLDivElement>(0.2);

  // Função para obter URL embed do YouTube
  const getYouTubeEmbedUrl = (url: string, muted: boolean = true) => {
    const videoId = url.includes("youtu.be")
      ? url.split("youtu.be/")[1]?.split("?")[0]
      : url.split("v=")[1]?.split("&")[0];

    const params = new URLSearchParams({
      autoplay: '1',
      mute: muted ? '1' : '0',
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      controls: '1',
      enablejsapi: '1',
      loop: '1', // Adiciona loop infinito
      playlist: videoId // Necessário para o loop funcionar
    });

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  };

  // Toggle de áudio (recarrega iframe com novo parâmetro)
  const toggleAudio = () => {
    if (!iframeRef.current) return;
    
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Recarrega iframe com novo estado de áudio
    const currentTime = getCurrentTime();
    const newUrl = getYouTubeEmbedUrl(content.video_url, newMutedState);
    
    // Se conseguiu obter o tempo atual, adiciona parâmetro de início
    if (currentTime > 0) {
      const url = new URL(newUrl);
      url.searchParams.set('start', Math.floor(currentTime).toString());
      iframeRef.current.src = url.toString();
    } else {
      iframeRef.current.src = newUrl;
    }
    
    console.log(newMutedState ? '🔇 Áudio desativado' : '🔊 Áudio ativado');
  };

  // Função para tentar obter tempo atual (limitado pela política CORS)
  const getCurrentTime = () => {
    try {
      // Esta função pode não funcionar devido a CORS, mas tentamos
      return 0;
    } catch {
      return 0;
    }
  };

  // Efeito para iniciar o vídeo quando container fica visível
  useEffect(() => {
    if (videoContainerRef.isVisible && !videoLoaded) {
      const timer = setTimeout(() => {
        setShowVideo(true);
        setVideoLoaded(true);
      }, 800);
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

  return (
    <>
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
                {!showVideo ? (
                  // Thumbnail com botão play
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
                  // YouTube Iframe
                  <div className="absolute inset-0">
                    <iframe
                      ref={iframeRef}
                      src={getYouTubeEmbedUrl(content.video_url, isMuted)}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Vox Elite Video"
                      onLoad={() => {
                        console.log('🎬 Vídeo do YouTube carregado');
                      }}
                    />
                  </div>
                )}
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

      {/* Botão de Áudio Global Fixo - fundo transparente */}
      {showVideo && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={toggleAudio}
            className={`
              group relative w-16 h-16 rounded-full flex items-center justify-center
              backdrop-blur-sm border-2 transition-all duration-300 transform hover:scale-110
              ${isMuted 
                ? 'bg-red-500/20 border-red-500/60 text-red-300 hover:bg-red-500/30 hover:border-red-400 animate-pulse' 
                : 'bg-green-500/20 border-green-500/60 text-green-300 hover:bg-green-500/30 hover:border-green-400'
              }
              shadow-lg hover:shadow-xl
            `}
            title={isMuted ? 'Ativar som do vídeo' : 'Desativar som do vídeo'}
          >
            {isMuted ? (
              <VolumeX className="w-7 h-7 drop-shadow-lg" />
            ) : (
              <Volume2 className="w-7 h-7 drop-shadow-lg" />
            )}
            
            {/* Tooltip com fundo semi-transparente */}
            <div className="absolute bottom-20 right-0 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg border border-gray-700/50">
              {isMuted ? 'Clique para ativar o som' : 'Clique para desativar o som'}
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90"></div>
            </div>
          </button>
        </div>
      )}
    </>
  );
};