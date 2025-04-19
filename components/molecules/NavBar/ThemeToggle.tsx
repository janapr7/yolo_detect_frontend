import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <>
      {mounted && (
        <button
          type="button"
          onClick={handleClick}
          className="w-fit text-primary dark:text-dark-primary cursor-pointer"
        >
          {theme === "dark" ? (
            <Sun className="w-6 h-6 flex-none hover:animate-spin" />
          ) : (
            <Moon className="w-6 h-6 flex-none hover:animate-pulse" />
          )}
        </button>
      )}
    </>
  );
};
