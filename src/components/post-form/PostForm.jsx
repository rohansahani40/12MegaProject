import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config"; 
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            setIsLoading(true);
            setError(null);

            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                if (!data.image[0]) {
                    throw new Error("Please select an image");
                }

                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            setError(error.message || "Something went wrong");
        } finally {
            setIsLoading(false);
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

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            {error && (
                <div className="w-full px-2 mb-4">
                    <p className="text-red-500">{error}</p>
                </div>
            )}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { 
                        required: "Title is required",
                        minLength: {
                            value: 3,
                            message: "Title must be at least 3 characters"
                        }
                    })}
                />
                {errors.title && (
                    <p className="text-red-500 text-sm mb-2">{errors.title.message}</p>
                )}
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { 
                        required: "Slug is required",
                        pattern: {
                            value: /^[a-z0-9-]+$/,
                            message: "Slug can only contain lowercase letters, numbers, and hyphens"
                        }
                    })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {errors.slug && (
                    <p className="text-red-500 text-sm mb-2">{errors.slug.message}</p>
                )}
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { 
                        required: !post ? "Image is required" : false,
                        validate: {
                            fileSize: (value) => {
                                if (value[0]) {
                                    return value[0].size <= 5000000 || "File size should be less than 5MB";
                                }
                                return true;
                            }
                        }
                    })}
                />
                {errors.image && (
                    <p className="text-red-500 text-sm mb-2">{errors.image.message}</p>
                )}
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: "Status is required" })}
                />
                {errors.status && (
                    <p className="text-red-500 text-sm mb-2">{errors.status.message}</p>
                )}
                <Button 
                    type="submit" 
                    bgColor={post ? "bg-green-500" : undefined} 
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? "Processing..." : (post ? "Update" : "Submit")}
                </Button>
            </div>
        </form>
    );
}