import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import { dbService } from "../../appwrite/dbService";
import toast, { Toaster } from "react-hot-toast";

export const BlogForm = ({ blogPost }) => {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        author: blogPost?.author || "",
        title: blogPost?.title || "",
        content: blogPost?.content || "",
        slug: blogPost?.$id || "",
        status: blogPost?.status || "active",
      },
    });

  const onSubmit = async (data) => {
    if (blogPost) {
      const file = data.image[0]
        ? await dbService.uploadFile(data.image[0])
        : null;

      if (file) {
        dbService.deleteFile(blogPost.featuredImage);
      }

      const dbBlogPost = await dbService.updateBlogPost(blogPost.$id, {
        ...data,
        featuredImage: file ? file.$id : blogPost.featuredImage,
      });
      if (dbBlogPost) {
        toast.success("Blog updated successfully");
        navigate(`/blog/${dbBlogPost.$id}`);
      }
    } else {
      const file = await dbService.uploadFile(data.image[0]);
      if (file) {
        // toast.success("File uploaded successfully");
        const fileId = file.$id;
        data.featuredImage = fileId;

        if (userData && userData.$id) {
          const dbBlogPost = await dbService.createBlogPost({
            ...data,
            userId: userData.$id,
          });

          if (dbBlogPost) {
            toast.success("Blog created successfully");
            navigate(`/blog/${dbBlogPost.$id}`);
          }
        } else {
          toast.error("User data is not available. Please log in again.");
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

  return (
    <>
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap px-1 sm:px-16"
      >
        <div className="w-full sm:w-2/3 px-2 text-secondary-white font-openSans">
          <Input
            label="Author"
            placeholder="Author"
            className="mb-4"
            {...register("author", { required: true })}
          />
          <Input
            label="Title"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug"
            placeholder="Slug"
            className="mb-4"
            disabled={true}
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />

          <RTE
            label="Content"
            content="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>

        <div className="w-full sm:w-1/3 px-2 max-sm:mt-5">
          <Input
            label="Featured Image"
            type="file"
            className="mb-4 cursor-pointer placeholder:text-white text-white"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !blogPost })}
          />
          {blogPost && (
            <div className="w-full mb-4">
              <img
                src={dbService.getFilePreview(blogPost.featuredImage)}
                alt={blogPost.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            label="Status"
            options={["active", "inactive"]}
            className="mb-4"
            {...register("status", { required: true })}
          />

          <Button type="submit" className="w-full btn_style">
            {blogPost ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
};
