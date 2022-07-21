import React from 'react'
import PostATweet from './PostATweet'
import Tweets from './Tweets'

const MainScreen = ({username}) => {
  return (
    <>
        <div className='p-4'>
            <h1>Hi, {username}</h1>
        </div>
        <PostATweet username={username} />
        <Tweets username={username} />
    </>
  )
}

export default MainScreen