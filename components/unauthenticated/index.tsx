import React from "react";
import clsx from "clsx";
import LoginForm from "../loginForm";
import Translation from "../translation";
import LoginButton from "../loginButton";
import { bem } from "../../src/utils";
import { getProviders } from "../../src/models/provider";

export default function Unauthenticated() {
  const providers = getProviders();

  return (
    <div className="text-center">
      <h2 className="font-bold text-xl">
        <Translation id="recommendedIdPSet" />
      </h2>
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
      <h2 className="line-behind font-bold text-xl">
        <span className="line-behind__line" />
        <span className="bg-white dark:bg-gray-800 lg:bg-white lg:dark:bg-gray-800">
          <Translation id="or" />
        </span>
      </h2>
      <LoginForm />
    </div>
  );
}
