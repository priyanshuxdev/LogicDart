import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dbService } from "../appwrite/dbService";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { CiMenuKebab } from "react-icons/ci";
import "ldrs/spiral";

export const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [options, setOptions] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = blog && userData ? blog.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      dbService.getBlogPost(slug).then((blog) => {
        if (blog) setBlog(blog);
        else navigate("/"); //404 page
      });
    } else navigate("/"); //404 page
  }, [slug, navigate]);

  const deleteBlogPost = () => {
    dbService.deleteBlogPost(blog.$id).then((status) => {
      if (status) {
        dbService.deleteFile(blog.featuredImage);
        navigate("/");
      }
    });
  };

  return blog ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={dbService.getFilePreview(blog?.featuredImage)}
            alt={blog.title}
            className="w-full h-56 sm:h-64 md:h-80 object-cover rounded-lg"
          />

          {isAuthor && (
            <div
              className="absolute right-6 top-6 bg-white p-2 font-bold rounded-full text-[18px] cursor-pointer transition-all duration-300"
              onClick={() => setOptions((prev) => !prev)}
            >
              {options && (
                <div
                  className={`absolute right-6 top-6 bg-white rounded-md py-1 px-3 font-normal font-sans text-md hover:scale-105  ${
                    !options ? "hidden" : "block"
                  }`}
                >
                  <Link to={`/edit-blog/${blog.$id}`}>
                    <Button className="text-green-400 ">Edit</Button>
                  </Link>
                  <Button className="text-red-400" onClick={deleteBlogPost}>
                    Delete
                  </Button>
                </div>
              )}
              <CiMenuKebab />
            </div>
          )}
        </div>
        <div className="w-full mb-6 flex max-sm:flex-col align-center sm:justify-between">
          <h1 className="font-lato text-gradient font-extrabold text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-0 w-full sm:w-1/2">
            {blog?.title}
          </h1>
          <p className="text-lg text-secondary-white font-lato italic rounded-md">
            Published by -<span className="font-bold">{userData?.name}</span>
          </p>
        </div>
        <div className="browser-css text-slate-300">{parse(blog?.content)}</div>
      </Container>
    </div>
  ) : (
    <div className="flex align-center justify-center mt-32">
      <l-spiral color="white" speed="0.9" size="60"></l-spiral>
    </div>
  );
};
