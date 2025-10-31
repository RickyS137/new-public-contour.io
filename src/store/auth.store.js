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
        setIsAuthenticated: (isAuthenticated) => {
            if (isAuthenticated) {
                try { frappe.startSessionRefresh(); } catch (e) {}
            } else {
                try { frappe.stopSessionRefresh(); } catch (e) {}
            }
            set({ isAuthenticated });
        },
        setUserInfo: (user) => set({ user }),
        setToken: (token) => {
            frappe.setAuthToken(token);
            set({ isAuthenticated: !!token });
        },
        logout: () => {
            frappe.clearAuth();
            try { frappe.stopSessionRefresh(); } catch (e) {}
            set({ isAuthenticated: false, user: null, data: { usr: '', pwd: '' } });
        },
}));

// Initialize authentication state on startup.
// We check both local token and server-side cookie session (via getLoggedUser).
// This ensures `isAuthenticated` is true when the backend session cookie exists
// even if no token is stored in localStorage.
(async function initAuth() {
    if (initialToken) {
        try { frappe.setAuthToken(initialToken); } catch (e) {}
    }

    try {
        const logged = await frappe.getLoggedUser();
        if (logged) {
            // update store and start periodic refresh
            const store = useAuthStore.getState();
            try { store.setIsAuthenticated(true); } catch (e) { /* ignore */ }
            try { store.setUserInfo(logged); } catch (e) { /* ignore */ }
            try { frappe.startSessionRefresh(); } catch (e) { /* ignore */ }
        }
    } catch (e) {
        // ignore errors during startup check
    }
})();

export default useAuthStore;