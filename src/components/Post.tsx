import { Link } from "react-router-dom";
import { IPost } from "../types";
import { getTextFromHtml } from "../utils/helpers/getTextFromHtml";

type PostProps = {
  post: IPost;
};

export const Post = ({ post }: PostProps) => {
  return (
    <div className="post" key={post.id}>
      <div className="img">
        <img src={`upload/${post.imgUrl}`} alt="post image" />
      </div>
      <div className="content">
        <Link className="link" to={`/post/${post.id}`}>
          <h1>{post.title}</h1>
        </Link>
        <p>{getTextFromHtml(post.description.slice(0, 280))}...</p>
        <Link className="link" to={`/post/${post.id}`}>
          <button>Подробнее</button>
        </Link>
      </div>
    </div>
  );
};
