import Translation from "../translation";
import { ReactEventHandler } from "react";

export default function LocalStorageClearButton() {
  const onClick: ReactEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    localStorage.clear();
    location.reload();
  };

  return (
    <button className="button" type="button" onClick={onClick}>
      <Translation id="deleteLocalData" />
    </button>
  );
}
