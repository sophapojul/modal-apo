import { useCallback, useEffect } from "react";

/**
 * @param onClose - () => void
 * @param keyboardEvent - "keyup" | "keydown" = "keyup"
 * @returns React hook to close a modal dialog on the escape key
 */
function useCloseOnEscapeKey(
  onClose: () => void,
  keyboardEvent: "keyup" | "keydown" = "keyup"
) {
  /** React callback to close a modal dialog on the escape key */
  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
        onClose();
      }
    },
    [onClose]
  );
  useEffect(() => {
    document.addEventListener(keyboardEvent, handleKey, false);
    return () => {
      document.removeEventListener(keyboardEvent, handleKey, false);
    };
  }, [handleKey, keyboardEvent]);
}
export default useCloseOnEscapeKey;
