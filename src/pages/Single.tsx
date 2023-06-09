import React, { useContext } from "react";
import axios from "axios";
import moment from "moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Menu } from "../components/Menu";
import { IPost } from "../types";
import { AuthContext } from "../context/authContext";
import { getTextFromHtml } from "../utils/helpers/getTextFromHtml";

export const Single = () => {
  const [post, setPost] = React.useState<IPost>();

  const authContext = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <Navbar />
      <div className="single">
        <div className="content">
          {post && <img src={`../upload/${post.imgUrl}`} alt="post picture" />}
          <div className="user">
            {post?.userImg && (
              <img className="avatar" src={post?.userImg} alt="User photo" />
            )}
            <div className="info">
              <p></p>
              <span>{post?.username}</span>
              {/* <p>Posted {moment(post?.date).fromNow()}</p> */}
            </div>
            {authContext?.currentUser?.username === post?.username && (
              <div className="edit">
                <Link to={`/write?edit=${postId}`} state={post}>
                  <img src="/images/edit.png" alt="edit post" />
                </Link>
                <img
                  onClick={handleDelete}
                  src="/images/delete.png"
                  alt="delete post"
                />
              </div>
            )}
          </div>
          <h1>{post?.title}</h1>
          <p>{post && getTextFromHtml(post.description)}</p>
        </div>
        <Menu category={post ? post?.category : ""} />
      </div>
      <Footer />
    </>
  );
};
