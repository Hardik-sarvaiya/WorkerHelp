import { useState, useEffect } from "react";
import { toast } from "react-hot-toast"

export default function useToast(autoClose = true, duration = 3000) {
  const [toast, setToast] = useState({ type: "info", text: "" });

  const showToast = (type, text) => setToast({ type, text });
  const clearToast = () => setToast({ type: "info", text: "" });

  useEffect(() => {
    if (autoClose && toast.text) {
      const timer = setTimeout(() => clearToast(), duration);
      return () => clearTimeout(timer);
    }
  }, [toast, autoClose, duration]);

  return { toast, showToast, clearToast };
}