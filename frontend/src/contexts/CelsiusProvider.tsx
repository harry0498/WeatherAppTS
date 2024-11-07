import useLocalStorage from "@/lib/useLocalStorage";
import React, { useContext, useState } from "react";

type CelsiusContextProps = {
  children: React.ReactNode;
};

type CelsiusContext = {
  celsius: boolean;
  toggleCelsius: () => void;
};

const CelsiusContext = React.createContext<CelsiusContext | null>(null);

export function useCelsius() {
  const context = useContext(CelsiusContext);
  if (!context) {
    throw new Error("useCelsius must be used within a CelsiusProvider");
  }
  return context;
}

export default function CelsiusProvider({ children }: CelsiusContextProps) {
  const { getItem, setItem } = useLocalStorage("celsius");
  const [celsius, setCelsius] = useState<boolean>(getItem() ?? true);

  function toggleCelsius() {
    setCelsius((prev) => {
      setItem(!prev);
      return !prev;
    });
  }

  return (
    <CelsiusContext.Provider value={{ celsius, toggleCelsius }}>
      {children}
    </CelsiusContext.Provider>
  );
}
