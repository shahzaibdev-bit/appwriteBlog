import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
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
      if (!userData || !userData.$id) {
        console.error("User data not available");
        return;
      }
      //using spread operator to update the post with new data
      //but for featuredImage we are checking if file is present then we will use the file id otherwise we will use undefined
      //this is because if the user does not upload a new image then we will not update the featuredImage field in the post

      // 👇 Add this log to verify file selection
      console.log("Selected image file:", data.image?.[0]);

      if (post) {
        const file = data.image?.[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          await appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });
        //if the post is updated successfully then we will navigate to the post page
        //we are using the $id of the post to navigate to the post page

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await appwriteService.uploadFile(data.image?.[0]);

        // 👇 Additional safeguard log
        if (!file) {
          console.error("Image upload failed — file is", file);
          throw new Error("Image upload failed");
        }

        const dbPost = await appwriteService.createPost({
          ...data,
          featuredImage: file.$id,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };
  //useCallback is a hook that returns a memoized version of the callback function
  //it is used to optimize the performance of the component by preventing unnecessary re-renders
  //when a component is re-rendered, all the functions inside it are recreated
  //but if we use useCallback then the function will be recreated only when the dependencies of the function change
  //in our case we are using useCallback to create a memoized version of the slugTransform function
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-") //^ means negation means don't match these characters means beside these characters replace every other character with -
        .replace(/\s/g, "-"); //replace every space with -
    }
    return "";
  }, []);

  //useEffect is a hook that is called when a component is mounted or updated or unmounted
  //Mounted means when the component is rendered for the first time when it is displayed on the screen
  //Updated means when the component is re-rendered due to a change in state or props
  //Unmounted means when the component is removed from the screen
  useEffect(() => {
    //watch is a function that allows us to watch the values of a fields
    //it takes a callback function that will be called whenever the value of the field changes
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        //in this case we are watching the title field
        //and whenever the value of the title field changes we will update the slug field with the transformed value of the title field
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
    //when there is a change in watch, slugTransform, or setValue, this effect will run
    //but unsubscribe will be called when the component is unmounted or when the effect is re-run
    //means the when there is change in title field the effect will run and the subscription will be called and when the change is done the subscription will be unsubscribed
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
            //there is a question arise when we are updating this feild when there is a change in title field
            //then why are we doing onInput here
            //user can also change the slug field manually
            //so when the user changes the slug field manually we will update the slug field with the transformed value
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
          //getValues is a function that returns the current value of the field
          //for this we are using getValues("content") to get the current value of the content field
          //we are getting this content value from the defaultValues of useForm hook
          //and in defaultValues we are getting the content value from the post object if it is present
          //if the post object is not present then we are using an empty string as the default value
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-1"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {!post && errors.image && (
          <p className="text-red-500 text-sm mb-2">
            Image is required for new post.
          </p>
        )}
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
