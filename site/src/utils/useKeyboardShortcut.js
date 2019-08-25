import { useEffect } from "react";

const useKeyboardShortcut = (key, action) => {
  useEffect(() => {
    const listener = event => {
      if (event.keyCode === key) {
        action();
      }
    };
    window.addEventListener("keyup", listener);

    return () => window.removeEventListener("keyup", listener);
  }, [key, action]);
};

export default useKeyboardShortcut;
