import React from 'react'
import { Link } from 'react-router-dom'

const ContainerView = ({ id, image, state, status, onStart, onDelete, onStop }) => {
  return (
    <div className='list-group-item'>
      <div className='list-item-wrapper'>
        <div className='container-item'>
          <h6>ID: {id}</h6>
          <div>Image: {image}</div>
          <div>State: {state}</div>
          <div>Status: {status}</div>
        </div>
        <ul className='container-actions'>
          <li onClick={onStart}>Start</li>
          <li onClick={onStop}>Stop</li>
          <li onClick={onDelete}>Delete</li>
          <li><Link className='navbar-brand title' to={`/container/${id}/monitor`}>Monitor</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default ContainerView
