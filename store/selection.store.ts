import { create } from "zustand";

interface SelectionStore {
  selectedType: string;
  selectedName: string | null;
  showOnlyCatched: boolean;
  handleTypeChange: (type: string) => void;
  handleNameChange: (name: string | null) => void;
  handleOnlyCatchedChange: (showOnlyCatched: boolean) => void;
}

export const useSelectionStore = create<SelectionStore>((set) => ({
  selectedType: "",
  selectedName: null,
  showOnlyCatched: false,
  handleTypeChange: (type: string) => {
    set(() => ({
      selectedType: type,
      selectedName: null,
    }));
  },
  handleNameChange: (name: string | null) => {
    set(() => ({
      selectedName: name,
    }));
  },
  handleOnlyCatchedChange: (showOnlyCatched: boolean) => {
    set(() => ({
      showOnlyCatched,
    }));
  },
}));
