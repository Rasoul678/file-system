import { useEffect } from "react";

interface KeyPressProps {
  targetKey: string;
  callback: () => void;
}

const useKeyPress = (props: KeyPressProps) => {
  const { targetKey, callback } = props;

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === targetKey) {
        callback?.();
      }
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [targetKey, callback]);
};

export default useKeyPress;
