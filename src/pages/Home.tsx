import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Post } from "../components/Post";
import { IPost } from "../types";

export const Home = () => {
  const [posts, setPosts] = React.useState<IPost[]>([]);

  const currentCategory = useLocation().search;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`posts${currentCategory}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentCategory]);

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="posts">
          {posts.length > 0 ? (
            posts.map((post) => <Post post={post} key={post.id} />)
          ) : (
            <h1 className="no-posts-title">В этом разделе нет постов(</h1>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
