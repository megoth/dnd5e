import React, { HTMLAttributes } from "react";
import clsx from "clsx";
import LoginForm from "../loginForm";
import Translation from "../translation";
import LoginButton from "../loginButton";
import { getProviders } from "../../utils/provider";
import { bem } from "../../utils/bem";
import SolidLogo from "../solidLogo";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export default function Unauthenticated({ title, ...props }: Props) {
  const providers = getProviders();

  return (
    <div {...props}>
      <SolidLogo className="mx-auto" />
      <h2 className="font-bold text-xl">
        {title || <Translation id="recommendedIdPSet" />}
      </h2>
      <div className="max-w-72">
        <ul className="flex flex-col space-y-2 my-2">
          {providers.map(({ loginIri, label }) => (
            <li key={loginIri}>
              <LoginButton
                loginIri={loginIri}
                className={clsx(bem("button", "solid"), "w-full")}
              >
                {label}
              </LoginButton>
            </li>
          ))}
        </ul>
        <LoginForm hideLogo={true} />
      </div>
    </div>
  );
}
