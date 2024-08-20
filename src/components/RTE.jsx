import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export const RTE = ({ content, control, label, defaultValue = "" }) => {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-2">{label}</label>}

      <Controller
        name={content}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="5vdycrzr2gjco3r7b10s82h0270w1w1nglfv7h1coegryhrx"
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};
