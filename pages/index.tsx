import React from "react";
import Link from "next/link";
import Layout from "../components/layout";
import Session from "../components/session";

export default function Home() {
  return (
    <Layout home>
      <Session />
      <nav>
        <Link href="/about">
          <a>About the app</a>
        </Link>
        <span> - </span>
        <Link href="/faq">
          <a>FAQ</a>
        </Link>
      </nav>
    </Layout>
  );
}
