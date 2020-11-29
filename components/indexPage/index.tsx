import React from "react";
import Link from "next/link";
import Layout from "../layout";
import Session from "../session";
import utilStyles from "../../styles/utils.module.css";
import Date from "../date";
import { PostData } from "../../lib/posts";
import Sources from "../sources";

interface Props {
  allPostsData: Array<PostData>;
}

export default function IndexPage({ allPostsData }: Props) {
  return (
    <Layout home>
      <Session />
      <Sources />
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
