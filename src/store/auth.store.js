import { create } from "zustand";

const useAuthStore = create((set) => ({
    data: {
        usr: '',
        pwd: '',
    },
    setUser: (usr) => set((state) => ({ data: { ...state.data, usr } })),
    setPwd: (pwd) => set((state) => ({ data: { ...state.data, pwd } })),
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));

export default useAuthStore;