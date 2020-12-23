import React from "react";
import Link from "next/link";
import Layout from "../layout";
import Translation from "../translation";
import Logo from "../logo";

export default function HomePage() {
  return (
    <Layout full header={false}>
      <section className="hero">
        <div className="h-screen text-white flex flex-col justify-center items-center leading-normal px-4 bg-gradient-to-t from-black relative text-center">
          <Logo />
          <h1 className="text-3xl my-1 font-serif">
            <Translation id="appName" />
          </h1>
          <p className="my-1 max-w-xl">
            <Translation id="appPitch" />
          </p>
          <Link href="/about">
            <a className="link my-1 max-w-prose">
              <Translation id="learnMore" />
            </a>
          </Link>
          <p className="text-2xl my-1">
            <Translation id="workInProgress" />
          </p>
          <p className="text-xs text-gray-600 absolute bottom-1 right-2">
            Photo by{" "}
            <a
              className="link--subtle"
              href="https://unsplash.com/@steve_j?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
            >
              Steve Johnson
            </a>{" "}
            on{" "}
            <a
              className="link--subtle"
              href="https://unsplash.com/s/photos/pen-and-paper?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
            >
              Unsplash
            </a>
          </p>
        </div>
      </section>
    </Layout>
  );
}
