import { useCallback, useEffect } from "react";

/**
 * @template T extends HTMLElement = HTMLElement - type parameter
 * @param onClose - () => void
 * @param ref - ref: React.RefObject<T>
 * @param mouseEvent - "mouseup" | "mousedown" = "mouseup"
 * @returns React hook to close a modal dialog on the overlay
 */
function useCloseOnOverlay<T extends HTMLElement = HTMLElement>(
  onClose: () => void,
  ref: React.RefObject<T>,
  mouseEvent: "mouseup" | "mousedown" = "mouseup"
) {
  /** React callback to close a modal dialog on the overlay */
  const handleClick = useCallback(
    (event: MouseEvent) => {
      const el = ref?.current;
      if (!el?.contains(event.target as Node)) {
        return;
      }
      onClose();
    },
    [onClose, ref]
  );

  useEffect(() => {
    document.addEventListener(mouseEvent, handleClick);
    return () => {
      document.removeEventListener(mouseEvent, handleClick);
    };
  }, [handleClick, mouseEvent]);
}
export default useCloseOnOverlay;
