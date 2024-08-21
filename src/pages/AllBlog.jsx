import React, { useEffect, useState } from "react";
import { BlogCard, Container } from "../components";
import { dbService } from "../appwrite/dbService";
import "ldrs/spiral";

export const AllBlog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {}, []);

  dbService.getBlogPosts([]).then((blogs) => {
    if (blogs) {
      setBlogs(blogs.documents);
    }
  });

  return (
    <div>
      <Container>
        {blogs.length === 0 ? (
          <div className="flex justify-center align-center mt-32">
            <l-spiral color="white" speed="0.9" size="60"></l-spiral>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="lg:flex-row flex-col md:flex-col flex flex-wrap justify-center items-center gap-[2rem] min-h-[70vh] mt-12">
              {blogs.map((blog) => (
                <div key={blog.$id}>
                  <BlogCard {...blog} />
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
