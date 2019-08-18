import { useEffect } from "react";

const useKeyboardShortcut = (key, action) => {
  useEffect(() => {
    console.log("here");
    const listener = window.addEventListener("keyup", event => {
      if (event.keyCode === key) {
        action();
      }
    });

    return () => window.removeEventListener("keyup", listener);
  }, [key, action]);
};

export default useKeyboardShortcut;
