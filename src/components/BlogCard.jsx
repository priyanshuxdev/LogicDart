import React from "react";
import { Link } from "react-router-dom";
import { dbService } from "../appwrite/dbService";
import parse from "html-react-parser";

export const BlogCard = ({ $id, title, featuredImage, content }) => {
  return (
    <div className="w-full max-w-[340px] mx-auto font-roboto relative px-2">
      <Link to={`/blog/${$id}`} className="block">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105">
          <div className="w-full h-48 sm:h-56 overflow-hidden">
            <img
              src={dbService.getFilePreview(featuredImage)}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="p-4 sm:p-6">
            <span className="inline-block bg-gradient-to-r from-rose-100 to-teal-100 rounded-full text-[#19191B] text-xs font-medium px-3 py-1 mb-2">
              {`${Math.ceil(content.length / 100)} min read`}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
              {title}
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{parse(content)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
