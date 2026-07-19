import { useToast } from '../../context/ToastContext';
import './Toast.css';

export default function ToastViewport() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-viewport" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.tone}`}>
          <span>{toast.text}</span>
          <button
            className="toast__close"
            aria-label="Dismiss notification"
            onClick={() => dismissToast(toast.id)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
