"use client";

import {
  TbAlertCircleFilled,
  TbCircleCheckFilled,
  TbInfoCircleFilled,
} from "react-icons/tb";
import { useEffect, useRef } from "react";
import { useToast } from "@/contexts/ToastContext";

interface ToastProps {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

const Toast: React.FC<ToastProps> = ({ id, type, message }: ToastProps) => {
  const { removeToast } = useToast();

  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toast = toastRef.current;
    if (toast) {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-100%)";

      requestAnimationFrame(() => {
        toast.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
      });
    }

    return () => {
      if (toast) {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-100%)";
      }
    };
  }, []);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <TbCircleCheckFilled className="w-5 h-5 text-hardLime" />;
      case "error":
        return <TbAlertCircleFilled className="w-5 h-5 text-appleRed" />;
      case "info":
        return <TbInfoCircleFilled className="w-5 h-5 text-neutral-600" />;
    }
  };

  return (
    <div
      ref={toastRef}
      role="alert"
      aria-live="assertive"
      onClick={() => removeToast(id)}
      className="flex gap-2 p-3 rounded-full bg-neutral-800"
    >
      {getIcon()}
      <p className="text-white text-sm">{message}</p>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 right-4 xl:bottom-6 xl:right-6 z-50 flex flex-col items-center">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};
