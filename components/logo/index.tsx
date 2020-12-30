import React from "react";
import useApp from "../../src/hooks/useApp";
import { getMessage } from "../../src/models/translation";

export default function Logo() {
  const app = useApp();
  const logoDescription = getMessage(app, "appLogoDescription");
  return (
    <picture className="block">
      <source
        srcSet="/icons/app/icons8-dungeons-and-dragons-128.png"
        media="(min-width: 640px)"
      />
      <source
        srcSet="/icons/app/icons8-dungeons-and-dragons-96.png"
        media="(min-width: 480px)"
      />
      <img
        src="/icons/app/icons8-dungeons-and-dragons-64.png"
        alt={logoDescription}
      />
    </picture>
  );
}
