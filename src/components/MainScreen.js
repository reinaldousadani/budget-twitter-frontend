import React, { useState } from "react";
import { signout } from "../api/sessionApi";
import PostATweet from "./PostATweet";
import Tweets from "./Tweets";
import { useQueryClient } from "@tanstack/react-query";

const MainScreen = ({ username }) => {
  const [sortState, setSortState] = useState("");

  const qc = useQueryClient();

  const handleSignOut = async (e) => {
    try {
      await signout();
      qc.invalidateQueries(["user"]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="p-4 flex justify-between items-center">
        <h1>Hi, {username}</h1>
        <button
          className="bg-red-600 px-4 py-2 rounded-xl text-sm"
          onClick={(e) => handleSignOut(e)}
        >
          Sign-Out
        </button>
      </div>
      <PostATweet username={username} sortState={sortState} setSortState={setSortState} />
      <Tweets username={username} sortState={sortState} />
    </>
  );
};

export default MainScreen;
