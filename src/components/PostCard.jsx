import React from 'react'
import { Link } from 'react-router-dom'

function PostCard({
    $id,
    title,
    featuredImage,
}) {
  return (
   < Link to={`/posts/${$id}`}>
    <div className=' gap-2 bg-gray-100 rounded-xl shadow-md p-4'>
    <div >
        <img src={appWriteService.getFilePreview(featuredImage)} alt={title} 
        className='w-full h-48  rounded-xl' />
    </div>
    <h2
    className='text-xl font-bold'
    >{title}</h2>
    </div>
   </Link>

  )
}

export default PostCard
