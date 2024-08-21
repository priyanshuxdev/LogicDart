import React, { useEffect, useState } from "react";
import { Container, BlogForm } from "../components";
import { dbService } from "../appwrite/dbService";
import { useParams, useNavigate } from "react-router-dom";

export const EditBlog = () => {
  const [blog, setBlog] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      dbService.getBlogPost(slug).then((blog) => {
        if (blog) {
          setBlog(blog);
        }
      });
    } else {
      navigate("/"); //404 page
    }
  }, [slug, navigate]);

  return blog ? (
    <div>
      <Container>
        <BlogForm blogPost={blog} />
      </Container>
    </div>
  ) : null;
};
