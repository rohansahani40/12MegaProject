import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div className="flex items-center">
      <span className="text-2xl font-bold text-blue-600" style={{width}}>
        BlogApp
      </span>
    </div>
  )
}

export default Logo