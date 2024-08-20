import React from "react";
// import { dbService } from "../appwrite/dbService";
import { Container } from "../components/index";
import { useNavigate } from "react-router-dom";
// import { BlogCard } from "../components/BlogCard";
export const Home = () => {
  const navigate = useNavigate();

  // const [blogs, setBlogs] = useState([]);
  // useEffect(() => {
  //   dbService.getBlogPosts().then((blogs) => {
  //     if (blogs) {
  //       setBlogs(blogs.documents);
  //     }
  //   });
  // }, []);

  return (
    <div>
      <Container>
        <div className="flex flex-col justify-center items-center mt-14 mb-20">
          <h1 className="font-vanguard text-[80px] sm:text-[144px] tracking-wide text-gradient leading-[64.2px] uppercase p-3 sm:p-10">
            Logicdart
          </h1>
          <h2 className="font-vanguard tracking-wide text-[23px] sm:text-[40px] sm:leading-[74.4px] leading-[64.4px] uppercase text-neutral-300 mb-4 sm:mb-7">
            Darting Through the Maze of Ideas
          </h2>
          <div>
            <button
              onClick={() => {
                `/signup ? ${navigate("/signup")} : ${navigate("/all-blog")}}`;
              }}
              className="bg-gradient text-black text-sm px-8 py-[6px] font-medium hover:opacity-90 duration-300 transition-all rounded-md hover:scale-105"
            >
              Explore
            </button>
          </div>
        </div>

        {/* <div>
          <h1 className="text-3xl text-gradient font-vanguard tracking-wide text-center ">
            Blogs
          </h1>
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <div className="lg:flex-row flex-col md:flex-col flex flex-wrap justify-center items-center gap-[2rem] min-h-[70vh] mt-12">
              {blogs.map((blog) => (
                <div key={blog.$id}>
                  <BlogCard {...blog} />
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </Container>
    </div>
  );
};
