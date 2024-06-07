import { useEffect } from "react";

export const useClickOutside = (
  doSomeAction: EventListenerOrEventListenerObject
) => {
  useEffect(() => {
    window.addEventListener("click", doSomeAction);

    return () => window.removeEventListener("click", doSomeAction);
  }, [doSomeAction]);
};
