"use client";
import { NoteContext } from "@/context/NoteContext";
import { useContext } from "react";

//* Este hook combina el useContext de react con el provider de NoteContext para poder usar el estado global de las notas en cualquier componente

export function useNotes() {
  const context = useContext(NoteContext);

  if (!context) {
    throw new Error("useNotes debe estar dentro del proveedor NoteContext");
  }
  return context;
}
