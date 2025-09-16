"use client"

import { toast as sonnerToast } from "sonner";

// Tipos para manter compatibilidade com o código antigo
interface ToastOptions {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
}

// Função wrapper para manter compatibilidade
function toast({ title, description, variant = "default" }: ToastOptions) {
  const message = title || "";
  const desc = description || "";
  const fullMessage = desc ? `${message}\n${desc}` : message;

  switch (variant) {
    case "destructive":
      return sonnerToast.error(fullMessage);
    case "success":
      return sonnerToast.success(fullMessage);
    default:
      return sonnerToast.info(fullMessage);
  }
}

// Hook que mantém a API original para compatibilidade
function useToast() {
  return {
    toast,
    dismiss: (toastId?: string) => sonnerToast.dismiss(toastId),
  };
}

export { useToast, toast };