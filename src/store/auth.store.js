import { create } from "zustand";

const useAuthStore = create((set) => ({
    data: {
        usr: '',
        pwd: '',
    },
    setUser: (usr) => set((state) => ({ data: { ...state.data, usr } })),
    setPwd: (pwd) => set((state) => ({ data: { ...state.data, pwd } })),
    isAuthenticated: false,
    user: null,
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    setUserInfo: (user) => set({ user }),
    logout: () => set({ isAuthenticated: false, user: null, data: { usr: '', pwd: '' } }),
}));

export default useAuthStore;