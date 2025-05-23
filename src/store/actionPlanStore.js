// src/store/useActionPlanStore.js
import { create } from 'zustand'
import {actionPlans} from '../API/APICalls/mockCallApi';

export const useActionPlanStore = create((set, get) => ({
  actionPlans: actionPlans,

  getPlansByRole: (role) => get().actionPlans[role],
  getPlansByRoleAndStatus: (role, status) => {
    const plans = get().actionPlans[role] || []
    return status === "" ? plans : plans.filter((plan) => plan.status === status)
  },

  updateStatus: (role, id, newStatus) => {
    set((state) => ({
      actionPlans: {
        ...state.actionPlans,
        [role]: state.actionPlans[role].map((plan) =>
          plan.id === id ? { ...plan, status: newStatus } : plan
        )
      }
    }))
  },

  addActionPlan: (role, plan) => {
    set((state) => ({
      actionPlans: {
        ...state.actionPlans,
        [role]: [...state.actionPlans[role], plan]
      }
    }))
  },

  removeActionPlan: (role, id) => {
    set((state) => ({
      actionPlans: {
        ...state.actionPlans,
        [role]: state.actionPlans[role].filter((plan) => plan.id !== id)
      }
    }))
  }
}))
