import React from "react";
import Layout from "../layout";
import Content from "../content";
import Authenticated from "../authenticated";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  return (
    <Layout>
      <Content>
        <h1>You are logged in!</h1>
        <p>This part is in development, more will come.</p>
        <NavLink to="/about">Learn more about the project</NavLink>
      </Content>
      <Authenticated />
    </Layout>
  );
}
