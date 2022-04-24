import { useCallback, useEffect } from "react";

interface KeyPressProps {
  targetKey: string;
  callback: () => void;
}

const useKeyPress = (props: KeyPressProps) => {
  const { targetKey, callback } = props;

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        callback?.();
      }
    },
    [targetKey, callback]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
};

export default useKeyPress;
