import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: false,
    error: null,

    setUser: (userData) => set({ user: userData }),
    setToken: (token) => set({ token }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),

    logout: () => set({ user: null, token: null }),
}));
export default useAuthStore;
