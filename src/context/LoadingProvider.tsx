import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoadingState] = useState(0);

  // Progress is monotonic. React StrictMode mounts the character scene twice in
  // dev, so two independent progress tickers end up writing to this same
  // setter — one can reach 100 while the other is still emitting 92, which
  // dragged the bar backwards and stranded the loader. Never go down.
  const setLoading = useCallback((percent: number) => {
    setLoadingState((current) => (percent > current ? percent : current));
  }, []);

  const value = useMemo(
    () => ({ isLoading, setIsLoading, setLoading }),
    [isLoading, setLoading]
  );

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
