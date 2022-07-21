import React from "react";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createTweet } from "../api/tweetApi";

const PostATweet = ({ username }) => {
  const initial = username[0].toUpperCase() || "";

  const qc = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
        tweet: ""
    }
  });

  const mutation = useMutation(createTweet, {
    onSuccess: (data) => {
      reset();
      qc.invalidateQueries(["tweets"])
    },
    onError: (err) => console.log(err),
  });

  const onSubmit = (data) => {
    mutation.mutate({ ...data, username });
  };

  return (
    <div className="border-b border-[#333639] p-4">
      <div className="flex gap-4">
        <div className="w-16 h-16 border border-blue-600 rounded-full flex justify-center items-center">
          <h1 className="text-2xl">{initial}</h1>
        </div>
        <div className="flex-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <textarea
              {...register("tweet", { required: true, maxLength: 140 })}
              className={`border border-[#333639] px-4 py-2 rounded-xl`}
              placeholder="What's on your mind?"
            />
            <div className="flex justify-between">
              <div>
                <p
                  className={`${
                    (errors.tweet?.type === "maxLength" || watch("tweet")?.length > 140) && "text-red-600"
                  }`}
                >
                  {watch("tweet")?.length}/140
                </p>
                {(errors.tweet?.type === "maxLength" || watch("tweet")?.length > 140) && (
                  <p className="text-red-600">Too long!</p>
                )}
              </div>
              <button
                className=" bg-blue-400 px-4 py-2 rounded-full disabled:cursor-not-allowed disabled:opacity-50"
                disabled={watch("tweet")?.length === 0}
              >
                Tweet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostATweet;
