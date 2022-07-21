import React from 'react'

const Container = ({children}) => {
  return (
    <div className='container max-w-2xl border-l border-r border-[#333639]'>{children}</div>
  )
}

export default Container