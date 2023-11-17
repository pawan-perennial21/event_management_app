"use client";
import React, { createContext } from "react";
import { useState } from "react";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export default function GlobalProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState(0);
  return (
    <GlobalContext.Provider value={{
      theme,
    }}>
      <GlobalUpdateContext.Provider value={setGlobalState}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  )
}
