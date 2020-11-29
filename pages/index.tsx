import React from "react";
import { getSortedPostsData, PostData } from "../lib/posts";
import IndexPage from "../components/indexPage";

interface Props {
  allPostsData: Array<PostData>;
}

export default function Home({ allPostsData }: Props) {
  return <IndexPage allPostsData={allPostsData} />;
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
