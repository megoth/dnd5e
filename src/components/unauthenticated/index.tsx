import React from "react";
import clsx from "clsx";
import LoginForm from "../loginForm";
import Translation from "../translation";
import LoginButton from "../loginButton";
import { getProviders } from "../../utils/provider";
import { bem } from "../../utils/bem";

export default function Unauthenticated() {
  const providers = getProviders();

  return (
    <div>
      <h2 className="font-bold text-xl">
        <Translation id="recommendedIdPSet" />
      </h2>
      <div className="max-w-72 mx-auto md:mx-0">
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
        <h2 className="text-center line-behind font-bold text-xl">
          <span className="line-behind__line" />
          <span className="bg-white dark:bg-gray-800 lg:bg-white lg:dark:bg-gray-800">
            <Translation id="or" />
          </span>
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}
