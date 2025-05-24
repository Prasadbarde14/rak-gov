import { create } from "zustand";
import { initialObjectives } from "../API/APICalls/mockCallApi";
export const useOKRStore = create((set, get) => ({
  okrs: initialObjectives,
  activeQuarter: "Q3 2025",
  showKRModal: false,
  selectedObjectiveId: null,
  editKR: null,
  newKR: { title: "", current: "", target: "", unit: "" },

  setActiveQuarter: (quarter) => set({ activeQuarter: quarter }),

  getObjectives: (role, quarter) => {
    const okrs = get().okrs;
    return okrs[role]?.[quarter] || [];
  },
  resetNewKR: (krValue) =>
  set(() => ({
    newKR:krValue,
  })),


  // Add new objective
  addObjective: (role, quarter, newObjective) =>
    set((state) => {
      const updatedQuarter = [...state.okrs[role][quarter], newObjective];
      return {
        okrs: {
          ...state.okrs,
          [role]: {
            ...state.okrs[role],
            [quarter]: updatedQuarter,
          },
        },
      };
    }),

  setNewKRField: (field, value) =>
    set((state) => ({
      newKR: {
        ...state.newKR,
        [field]: value,
      },
    })),
  closeKRModal: () =>
    set(() => ({
      showKRModal: false,
      selectedObjectiveId: null,
      editKR: null,
      newKR: { title: "", current: "", target: "", unit: "" },
    })),

  addKeyResult: (role, quarter, objectiveId, kr) => {
    set((state) => {
      const updatedOKRs = { ...state.okrs };

      const objectives = updatedOKRs[role][quarter];
      const updatedObjectives = objectives.map((obj) => {
        if (obj.id === objectiveId) {
          return {
            ...obj,
            keyResults: [...obj.keyResults, kr],
          };
        }
        return obj;
      });

      updatedOKRs[role][quarter] = updatedObjectives;

      return { okrs: updatedOKRs };
    });
  },

  // Edit Key Results:
  editKeyResult: (role, quarter, objectiveId, updatedKR) => {
  set((state) => {
    const updatedOKRs = { ...state.okrs };

    const objectives = updatedOKRs[role][quarter];
    const updatedObjectives = objectives.map((obj) => {
      if (obj.id === objectiveId) {
        return {
          ...obj,
          keyResults: obj.keyResults.map((kr) =>
            kr.id === updatedKR.id ? { ...kr, ...updatedKR } : kr
          ),
        };
      }
      return obj;
    });

    updatedOKRs[role][quarter] = updatedObjectives;

    return { okrs: updatedOKRs };
  });
},


  // Delete objective
  deleteObjective: (role, quarter, objectiveId) =>
    set((state) => {
      const updatedQuarter = state.okrs[role][quarter].filter(
        (obj) => obj.id !== objectiveId
      );
      return {
        okrs: {
          ...state.okrs,
          [role]: {
            ...state.okrs[role],
            [quarter]: updatedQuarter,
          },
        },
      };
    }),
    // Delete Key result:
    deleteKeyResult: (role, quarter, objectiveId, krId) => {
      set((state) => {
        const updatedOKRs = { ...state.okrs };
    
        const objectives = updatedOKRs[role][quarter];
        const updatedObjectives = objectives.map((obj) => {
          if (obj.id === objectiveId) {
            return {
              ...obj,
              keyResults: obj.keyResults.filter((kr) => kr.id !== krId),
            };
          }
          return obj;
        });
    
        updatedOKRs[role][quarter] = updatedObjectives;
    
        return { okrs: updatedOKRs };
      });
    },
}));

