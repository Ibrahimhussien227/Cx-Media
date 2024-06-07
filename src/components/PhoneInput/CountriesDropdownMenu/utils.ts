import { useRef, useCallback, useEffect } from "react";
import type { ICountriesDropdownMenuProps, IConfigRef } from "./type";

export function useCountriesDropdownNav(
  props: Pick<ICountriesDropdownMenuProps, "handleClose"> & {
    searchInputRef: React.RefObject<HTMLInputElement>;
  },
) {
  const listRef = useRef<HTMLUListElement>(null);
  const configRef = useRef<IConfigRef>({
    buttonKeyDownToTabPressMap: new Map<HTMLButtonElement, boolean>(),
    isNavigating: false,
    handleListNavigationTimeoutId: null,
    currentFocusedItem: null,
  });

  const handleListNavigation = useCallback(
    (key: string) => {
      if (configRef.current.isNavigating) {
        return;
      }

      configRef.current.isNavigating = true;

      configRef.current.handleListNavigationTimeoutId = setTimeout(() => {
        const list = listRef.current as HTMLUListElement;
        const currentFocusedItem = configRef.current.currentFocusedItem;

        switch (key) {
          case "ArrowDown": {
            const nextItem =
              currentFocusedItem?.nextSibling as HTMLLIElement | null;
            if (nextItem) {
              nextItem.querySelector("button")?.focus();
              configRef.current.currentFocusedItem = nextItem;
            } else {
              const firstItem = list.querySelector("li");
              if (firstItem) {
                configRef.current.currentFocusedItem = firstItem;
                firstItem.querySelector("button")?.focus();
              }
            }

            break;
          }

          case "ArrowUp": {
            const prevItem =
              currentFocusedItem?.previousSibling as HTMLLIElement | null;
            if (prevItem) {
              prevItem.querySelector("button")?.focus();
              configRef.current.currentFocusedItem = prevItem;
            } else {
              const listItems = list.querySelectorAll("li");
              const lastItem = listItems[listItems.length - 1];
              if (lastItem) {
                configRef.current.currentFocusedItem = lastItem;
                lastItem.querySelector("button")?.focus();
              }
            }

            break;
          }
        }

        configRef.current.isNavigating = false;
      }, 0);
    },
    [listRef],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (["ArrowDown", "ArrowUp", "Escape", "Tab"].includes(e.key)) {
      switch (e.key) {
        case "ArrowDown":
        case "ArrowUp": {
          handleListNavigation(e.key);
          return;
        }

        case "Tab": {
          if (e.shiftKey) {
            handleListNavigation("ArrowUp");
            return;
          }

          handleListNavigation("ArrowDown");
          return;
        }

        case "Escape": {
          props.handleClose();

          props.searchInputRef.current?.focus();
          return;
        }
      }
    }
  };

  useEffect(() => {
    const current = configRef.current;
    return () => {
      if (current.handleListNavigationTimeoutId) {
        clearTimeout(current.handleListNavigationTimeoutId);
      }
      if (current.handleListNavigationTimeoutId) {
        clearTimeout(current.handleListNavigationTimeoutId);
      }
    };
  }, []);

  return {
    listRef,
    configRef,
    handleKeyDown,
  };
}
