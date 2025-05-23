// src/stores/useKRStore.js
import { create } from "zustand";

const useOKRStore = create((set) => ({
  showKRModal: false,
  selectedObjectiveId: null,
  editKR: null,
  newKR: { title: "", current: "", target: "", unit: "" },

  openKRModal: (objectiveId, kr = null) =>
    set(() => ({
      showKRModal: true,
      selectedObjectiveId: objectiveId,
      editKR: kr,
      newKR: kr
        ? { ...kr }
        : { title: "", current: "", target: "", unit: "" },
    })),

  closeKRModal: () =>
    set(() => ({
      showKRModal: false,
      selectedObjectiveId: null,
      editKR: null,
      newKR: { title: "", current: "", target: "", unit: "" },
    })),

  setNewKRField: (field, value) =>
    set((state) => ({
      newKR: { ...state.newKR, [field]: value },
    })),
}));

export default useOKRStore;
