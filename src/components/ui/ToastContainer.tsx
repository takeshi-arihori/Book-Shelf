import { useToastState } from '../../store/contexts/ToastContext';

export function ToastContainer() {
  const toasts = useToastState();
  const typeClasses = {
    success: 'bg-green-500', error: 'bg-red-500', info: 'bg-gray-700'
  };

  return (
    <div id="toast-container" className="fixed bottom-5 right-5 z-50 space-y-2">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${typeClasses[toast.type]} text-white text-sm font-semibold py-3 px-5 rounded-lg shadow-xl`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
