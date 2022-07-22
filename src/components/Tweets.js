import React, { useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getTweets } from "../api/tweetApi";
import TweetCard from "./TweetCard";
import { Rings } from "react-loader-spinner";
import dayjs from "dayjs";

const Tweets = ({ username, sortState }) => {
  const [tweets, setTweets] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");

  const { data, isLoading, isError, error } = useQuery(["tweets"], getTweets, {
    onSuccess: (data) => {
      setTweets(data);
    },
  });

  if (isLoading && tweets?.length === 0) {
    return (
      <div className="w-full flex py-4 justify-center items-center">
        <Rings color="#1D9BF0" />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center">
        <input
          className="text my-4 mx-2 w-full border border-[#333639] px-4 py-2 rounded-xl"
          placeholder="Search a tweet"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
        />
      </div>
      {tweets
        .filter((tweet) => tweet?.tweet?.includes(filterQuery))
        .sort((a, b) => {
          console.log(sortState);
          if (sortState === "ASC") {
            return dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix();
          } else {
            return dayjs(a.createdAt).unix() + dayjs(b.createdAt).unix();
          }
        })
        .map((tweet) => {
          console.log(tweet);
          return (
            <TweetCard username={username} key={tweet._id} tweetData={tweet} />
          );
        })}
    </>
  );
};

export default Tweets;
