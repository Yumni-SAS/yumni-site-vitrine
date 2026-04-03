"use client";

import { createContext, useContext } from "react";
import type { Dictionary, Locale } from "./dictionaries";

type DictionaryContextValue = {
  t: Dictionary;
  locale: Locale;
};

const DictionaryContext = createContext<DictionaryContextValue | null>(null);

export function DictionaryProvider({
  dictionary,
  locale,
  children,
}: {
  dictionary: Dictionary;
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <DictionaryContext.Provider value={{ t: dictionary, locale }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const ctx = useContext(DictionaryContext);
  if (!ctx) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }
  return ctx;
}
