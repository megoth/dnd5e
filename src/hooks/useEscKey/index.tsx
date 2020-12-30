import { useEffect } from "react";

const ESC_KEYCODE = 27;

function handleEscKeydown(callback) {
  return (e) => {
    if (e.keyCode === ESC_KEYCODE) callback(e);
  };
}

export default function useEscKey(callback: () => void) {
  return useEffect(() => {
    const onKeydown = handleEscKeydown(callback);
    document.body.addEventListener("keydown", onKeydown);

    return () => {
      document.body.removeEventListener("keydown", onKeydown);
    };
  });
}
