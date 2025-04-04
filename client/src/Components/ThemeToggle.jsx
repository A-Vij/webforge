import { useThemeStore } from "../store/themeStore";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="px-2 py-1 rounded-full cursor-pointer bg-indigo-500/70 dark:bg-gray-600/70 text-white transition-all"
    >
      {theme === "dark" ? (
        <Sun className="text-yellow-500 w-5 h-5" />
      ) : (
        <Moon className="text-gray-900 w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
