"use client";

import { useState } from "react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [message, setMessage] = useState("");

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Por favor insira um e-mail válido.");
      return;
    }

    // Aqui você pode disparar um envio real para o backend/webhook
    setStatus("success");
    setMessage("Obrigado! Avisaremos quando a página estiver no ar.");
    setEmail("");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-vox-darker text-white px-6">
      <div className="w-full max-w-3xl">
        <div className="rounded-2xl bg-vox-dark/60 backdrop-blur-sm border border-vox-secondary/20 p-12 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="/lovable-uploads/b7c0ef70-756b-46fe-8952-75217a609b83.png"
              alt="Logo"
              className="h-20 w-auto object-contain"
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center leading-tight mb-4">
            Página em construção
          </h1>

          {/* Subtitle */}
          <p className="text-center text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Estamos preparando algo incrível para você. Volte em breve — enquanto isso,
            inscreva-se para ser avisado quando lançarmos.
          </p>

          {/* CTA / Capture */}
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto mt-6 flex flex-col sm:flex-row gap-3 items-center"
            noValidate
          >
            <label htmlFor="email" className="sr-only">
              Seu melhor e-mail
            </label>

            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== "idle") {
                  setStatus("idle");
                  setMessage("");
                }
              }}
              className={`w-full sm:flex-1 h-12 px-4 rounded-md bg-vox-darker/40 border ${
                status === "error"
                  ? "border-red-500 ring-1 ring-red-500/40"
                  : "border-vox-secondary/30 focus:border-vox-primary"
              } text-white placeholder:text-gray-400 transition-shadow outline-none`}
            />

            <button
              type="submit"
              className="h-12 px-5 rounded-md bg-vox-primary hover:brightness-105 transition inline-flex items-center justify-center text-sm font-semibold"
            >
              Avise-me
            </button>
          </form>

          {/* Status message */}
          {status !== "idle" && (
            <div
              role="status"
              className={`mt-4 max-w-xl mx-auto text-center text-sm ${
                status === "error" ? "text-red-400" : "text-vox-secondary"
              }`}
            >
              {message}
            </div>
          )}

          {/* Extras: timeline / social / small note */}
          <div className="mt-8 max-w-xl mx-auto text-center text-sm text-gray-400">
            <p>
              Enquanto isso, siga-nos para atualizações rápidas:
            </p>
            <div className="mt-3 flex items-center justify-center gap-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <span className="text-gray-600">•</span>
              <a
                href="https://www.instagram.com/vox.educacao"
                className="text-gray-300 hover:text-white transition"
                aria-label="Instagram"
              >
                Instagram
              </a>
            </div>

            <p className="mt-6 text-xs text-gray-500">
              © {new Date().getFullYear()} Vox — Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
