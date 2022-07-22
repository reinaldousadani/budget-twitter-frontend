import dayjs from "dayjs";
import React, { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteTweet, udpateTweet } from "../api/tweetApi";

const TweetCard = ({ username, tweetData }) => {
  const initial = tweetData?.username[0].toUpperCase() || "";
  const [newTweet, setNewTweet] = useState(tweetData.tweet);
  const [isEditing, setIsEditing] = useState(false);
  const qc = useQueryClient();

  const deleteMutation = useMutation(deleteTweet, {
    onSuccess: (data) => {
      qc.invalidateQueries("tweets");
    },
    onError: (err) => console.log(err),
  });

  const udpateMutation = useMutation(udpateTweet, {
    onSuccess: (data) => {
      setIsEditing(false);
      setNewTweet(tweetData.tweet);
      qc.invalidateQueries("tweets");
    },
    onError: (err) => console.log(err),
  });

  const handleOnDelete = (e) => {
    deleteMutation.mutate(tweetData._id);
  };

  const handleOnUpdate = (e) => {
    udpateMutation.mutate({
      id: tweetData._id,
      username: username,
      tweet: newTweet,
    });
  };

  return (
    <div className="border-b border-[#333639] p-4 relative ">
      {username === tweetData.username && (
        <div className="absolute right-2 top-2 flex gap-2">
          <p
            className="font-thin text-xs hover:cursor-pointer"
            onClick={() => {
              if (isEditing) {
                setNewTweet(tweetData.tweet);
                setIsEditing(false);
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? "Cancel" : "Edit"}
          </p>
          <p
            className="font-thin text-xs text-red-600 hover:cursor-pointer"
            onClick={(e) => handleOnDelete(tweetData._id)}
          >
            Del
          </p>
        </div>
      )}
      <div className="flex gap-4">
        <div className="w-12 h-12 border border-blue-600 rounded-full flex justify-center items-center">
          <h1 className="text-md">{initial}</h1>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <p className="font-bold">
            {tweetData.username}{" "}
            <span className="font-thin text-xs ml-1">
              {dayjs(tweetData.createdAt).format("DD/MM/YYYY HH:MM")}
            </span>
            {tweetData.updatedAt !== tweetData.createdAt && (
              <span className="font-thin text-xs ml-1">
                {`(Updated at ${dayjs(tweetData.createdAt).format("DD/MM/YYYY")})`}
              </span>
            )}
          </p>
          {!isEditing ? (
            <p>{tweetData.tweet}</p>
          ) : (
            <>
              <textarea
                className={`border border-[#333639] px-4 py-2 rounded-xl w-full`}
                placeholder="What's on your mind?"
                value={newTweet}
                onChange={(e) => {
                  console.log(e.target.value);
                  setNewTweet(e.target.value);
                }}
              />
              <div className="flex justify-between mt-2">
                <div>
                  <p className={`${newTweet.length > 140 && "text-red-600"}`}>
                    {newTweet.length}/140
                  </p>
                  {newTweet.length > 140 && (
                    <p className="text-red-600">Too long!</p>
                  )}
                </div>
                <button
                  className=" bg-blue-400 px-4 py-2 rounded-full disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={newTweet === tweetData.tweet || !newTweet}
                  onClick={(e) => handleOnUpdate(e)}
                >
                  Update
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
