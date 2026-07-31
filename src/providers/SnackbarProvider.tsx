import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { Snackbar } from '../components/chrome/Snackbar';
import type { IconName } from '../components/base/iconNames';
import { SNACKBAR } from '../theme/tokens';

interface Toast {
  message: string;
  icon: IconName;
  /** Force le remontage a message identique, pour rejouer l'animation. */
  key: number;
}

interface SnackbarContextValue {
  show: (message: string, icon?: IconName) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const counter = useRef(0);

  const show = useCallback((message: string, icon: IconName = 'check_circle') => {
    if (timer.current) clearTimeout(timer.current);
    counter.current += 1;
    setToast({ message, icon, key: counter.current });
    timer.current = setTimeout(() => setToast(null), SNACKBAR.duration);
  }, []);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const value = useMemo(() => ({ show }), [show]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {toast ? <Snackbar key={toast.key} message={toast.message} icon={toast.icon} /> : null}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar(): SnackbarContextValue {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error('useSnackbar doit etre utilise a l\'interieur de <SnackbarProvider>');
  return ctx;
}
