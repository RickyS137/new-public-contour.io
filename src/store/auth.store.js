import { create } from "zustand";
import { frappe } from 'shared/frappeService';

const initialToken = (() => {
    try { return localStorage.getItem('frappe_token'); } catch (e) { return null; }
})();

const useAuthStore = create((set, get) => ({
        data: {
            usr: '',
            pwd: '',
        },
        setUser: (usr) => set((state) => ({ data: { ...state.data, usr } })),
        setPwd: (pwd) => set((state) => ({ data: { ...state.data, pwd } })),
        isAuthenticated: !!initialToken,
        user: null,
        setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
        setUserInfo: (user) => set({ user }),
        setToken: (token) => {
            frappe.setAuthToken(token);
            set({ isAuthenticated: !!token });
        },
        logout: () => {
            frappe.clearAuth();
            set({ isAuthenticated: false, user: null, data: { usr: '', pwd: '' } });
        },
}));

if (initialToken) {
    try { frappe.setAuthToken(initialToken); } catch (e) {}
}

export default useAuthStore;