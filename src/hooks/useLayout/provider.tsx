import React, { ReactNode, useEffect, useState } from "react";
import LayoutContext from "./context";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";

interface Props {
  children: ReactNode;
}

export default function LayoutProvider({ children }: Props) {
  const [localLeft, setLocalLeft] = useLocalStorage(
    "left-menu-open",
    false.toString(),
  );
  const [leftOpen, setLeftOpen] = useState(localLeft === true.toString());
  useEffect(() => setLocalLeft(leftOpen.toString()), [leftOpen]);
  const [localRight, setLocalRight] = useLocalStorage(
    "right-menu-open",
    false.toString(),
  );
  const [rightOpen, setRightOpen] = useState(localRight === true.toString());
  useEffect(() => setLocalRight(rightOpen.toString()), [rightOpen]);
  const [full, setFull] = useState(false);

  const location = useLocation();
  useEffect(() => {
    setLeftOpen(false);
    setRightOpen(localRight === true.toString() && !full);
  }, [full, location]);

  return (
    <LayoutContext.Provider
      value={{
        full,
        leftOpen,
        rightOpen,
        setFull,
        setRightOpen,
        setLeftOpen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
