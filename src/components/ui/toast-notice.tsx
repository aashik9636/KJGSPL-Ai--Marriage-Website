"use client";
import React from "react";
import { Check, X } from "lucide-react";

interface ToastNoticeProps {
  toast: string;
  onDismiss: () => void;
}

export const ToastNotice: React.FC<ToastNoticeProps> = ({ toast, onDismiss }) => {
  if (!toast) return null;
  return (
    <div className="toast" role="status">
      <Check size={17} />
      {toast}
      <button onClick={onDismiss} aria-label="Dismiss notification">
        <X size={15} />
      </button>
    </div>
  );
};
