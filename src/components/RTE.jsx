import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { Controller } from "react-hook-form";

export default function RTE ({ control, name, label, defaultValue="" }) {
    return(
        <div className="w-full flex flex-col gap-2">
         {label && <label className="inline-block mb-1 pl-1  text-gray-700">{label}</label>}
 
              <Controller
                 control={control}
                 name={name || "editor"}
                 defaultValue={defaultValue}
                 render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Editor
                          
                           initialValue={defaultValue}
                           init={{
                                initialValue: defaultValue,
                                height: 500,
                                menubar: true,
                                plugins: [
                                    "advlist autolink lists link image charmap preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code help wordcount",
                                ],
                                toolbar:
                                    "undo redo | styleselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | link image | \
                                    preview media fullpage | insertdatetime code",
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }", 
                           }}
                           onEditorChange={onChange}
                      />
                 )}
                />
         
        </div>
          
    )
}