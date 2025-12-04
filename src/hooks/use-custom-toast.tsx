import { useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import '../components/ui/toast-custom.css';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  title: string;
  description?: string;
  duration?: number;
  type?: ToastType;
}

const ToastIcons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

let toastContainer: HTMLDivElement | null = null;

const getToastContainer = () => {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
};

export const showToast = (options: ToastOptions) => {
  const {
    title,
    description,
    duration = 5000,
    type = 'info',
  } = options;

  const container = getToastContainer();
  const toastElement = document.createElement('div');
  toastElement.className = `custom-toast ${type}`;

  const Icon = ToastIcons[type];

  const root = createRoot(toastElement);

  const handleClose = () => {
    toastElement.classList.add('closing');
    setTimeout(() => {
      root.unmount();
      toastElement.remove();
    }, 300);
  };

  root.render(
    <>
      <div className="toast-icon">
        <Icon size={20} />
      </div>
      <div className="toast-content">
        <div className="toast-title">{title}</div>
        {description && <div className="toast-description">{description}</div>}
      </div>
      <button className="toast-close" onClick={handleClose}>
        <X size={16} />
      </button>
      <div className="toast-progress" style={{ animationDuration: `${duration}ms` }} />
    </>
  );

  container.appendChild(toastElement);

  // Auto-remove após duração
  const timer = setTimeout(handleClose, duration);

  // Cleanup ao clicar
  toastElement.addEventListener('click', () => {
    clearTimeout(timer);
  });
};

export const useCustomToast = () => {
  return {
    success: (title: string, description?: string) => 
      showToast({ title, description, type: 'success' }),
    error: (title: string, description?: string) => 
      showToast({ title, description, type: 'error', duration: 6000 }),
    warning: (title: string, description?: string) => 
      showToast({ title, description, type: 'warning' }),
    info: (title: string, description?: string) => 
      showToast({ title, description, type: 'info' }),
  };
};