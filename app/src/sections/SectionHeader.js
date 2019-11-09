import React from 'react'

const SectionHeader = ({ title, message }) => {
  return (
    <div className='jumbotron jumbotron-fluid'>
      <div className='container'>
        <h1 className='display-4'>{title}</h1>
        <p className='lead'>{message}</p>
      </div>
    </div>
  )
}

export default SectionHeader
