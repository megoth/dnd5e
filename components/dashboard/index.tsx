import React from "react";
import Link from "next/link";
import Layout from "../layout";
import Content from "../content";
import Authenticated from "../authenticated";
import { getMessage } from "../../src/models/translation";
import useApp from "../../src/hooks/useApp";

export default function Dashboard() {
  const app = useApp();
  return (
    <Layout pageName={getMessage(app, "homePageTitle")}>
      <Content>
        <h1>You are logged in!</h1>
        <p>This part is in development, more will come.</p>
        <Link href="/about">
          <a>Learn more about the project</a>
        </Link>
      </Content>
      <Authenticated />
    </Layout>
  );
}
