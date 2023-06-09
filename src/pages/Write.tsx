import React from "react";
import axios from "axios";
import moment from "moment";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { IPost } from "../types";
import "react-quill/dist/quill.snow.css";

export const Write = () => {
  const post: IPost = useLocation().state;

  const [value, setValue] = React.useState(post?.description || "");
  const [title, setTitle] = React.useState(post?.title || "");
  const [file, setFile] = React.useState<File | null>(null);
  const [category, setCategory] = React.useState(post?.category || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();

      if (file) {
        formData.append("file", file);
        const res = await axios.post("/upload", formData);
        return res.data;
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) setFile(e.target.files[0]);
  };

  const onClickPublish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const imgUrl = await upload();

    try {
      post
        ? await axios.put(`/posts/${post.id}`, {
            title,
            description: value,
            category,
            imgUrl: file ? imgUrl : post.imgUrl,
          })
        : await axios.post("/posts/", {
            title,
            description: value,
            category,
            imgUrl: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="write">
        <div className="content">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="editorContainer">
            <ReactQuill
              className="editor"
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className="menu">
          <div className="item">
            <h1>Publish</h1>
            <span>
              <b>Status: </b> Draft
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name=""
              onChange={onChangeFile}
            />
            <label className="file" htmlFor="file">
              Upload Image
            </label>
            <div className="buttons">
              <button>Save as a draft</button>
              <button type="submit" onClick={onClickPublish}>
                Publish
              </button>
            </div>
          </div>
          <div className="item">
            <h1>Category</h1>

            <div className="cat">
              <input
                type="radio"
                checked={category === "art"}
                name="cat"
                value="art"
                id="art"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="art">Art</label>
            </div>

            <div className="cat">
              <input
                type="radio"
                checked={category === "science"}
                name="cat"
                value="science"
                id="science"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="science">Science</label>
            </div>

            <div className="cat">
              <input
                type="radio"
                checked={category === "technology"}
                name="cat"
                value="technology"
                id="technology"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="technology">Technology</label>
            </div>

            <div className="cat">
              <input
                type="radio"
                checked={category === "cinema"}
                name="cat"
                value="cinema"
                id="cinema"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="cinema">Cinema</label>
            </div>

            <div className="cat">
              <input
                type="radio"
                checked={category === "design"}
                name="cat"
                value="design"
                id="design"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="design">Design</label>
            </div>

            <div className="cat">
              <input
                type="radio"
                checked={category === "food"}
                name="cat"
                value="food"
                id="food"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor="food">Food</label>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
