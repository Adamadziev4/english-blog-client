import axios from "axios";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IPost, RecommendedPost } from "../types";

type MenuProps = {
  category: string;
};

export const Menu = ({ category }: MenuProps) => {
  const [posts, setPosts] = React.useState<RecommendedPost[]>();

  const postId = useLocation().pathname.split("/")[2];

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await axios.get(`/posts/?category=${category}`);
        const res = await axios.get(`/posts`);
        const posts: RecommendedPost[] = res.data.map((post: IPost) => {
          return {
            id: post.id,
            title: post.title,
            imgUrl: post.imgUrl,
          };
        });

        setPosts(posts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className="menu">
      <h1>Другие посты</h1>
      {posts?.slice(0, 3).map((post) => {
        if (post.id === Number(postId)) return;

        return (
          <div className="post" key={post.id}>
            <Link className="link" to={`/post/${post.id}`}>
              <img src={`../upload/${post.imgUrl}`} alt="" />
            </Link>
            <Link className="link" to={`/post/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <Link className="link" to={`/post/${post.id}`}>
              <button>Подробнее</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
