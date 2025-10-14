import { create } from 'zustand';

export const useFormStore = create((set, get) => ({
  formData: {},

  setField: (name, value) =>
    set(state => ({
      formData: { ...state.formData, [name]: value }
    })),

  resetForm: () => set({ formData: {} }),

  setFormData: (data) => set({ formData: { ...data } }),

  getField: (name) => get().formData[name],

  getFormData: () => get().formData,
}));
