import React, { useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getTweets } from "../api/tweetApi";
import TweetCard from "./TweetCard";
import { Rings } from "react-loader-spinner";

const Tweets = ({ username }) => {
  const [tweets, setTweets] = useState([]);

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
      {tweets.map((tweet) => (
        <TweetCard username={username} key={tweet._id} tweetData={tweet} />
      ))}
    </>
  );
};

export default Tweets;
