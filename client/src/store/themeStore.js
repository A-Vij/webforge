import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("theme") || "dark",
    toggleTheme: () => 
        set((state) => {
        const newTheme = state.theme === "dark" ? "light" : "dark";

        localStorage.setItem("theme", newTheme);
        const root = window.document.documentElement;

        if (newTheme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        console.log(newTheme);
        return { theme: newTheme };
        }),
}));