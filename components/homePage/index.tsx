import React from "react";
import Link from "next/link";
import Layout from "../layout";
import Session from "../session";

export default function HomePage() {
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
        <span> - </span>
        <Link href="/admin">
          <a>Admin</a>
        </Link>
      </nav>
    </Layout>
  );
}
