import React from 'react'
import ContainerView from './ContainerView'

const ListContainersView = ({ containers, onRefresh, onStart, onDelete, onStop }) => {
  return (
    <div className='card'>
      <div className='card-header bg-transparent d-flex justify-content-between align-items-center'>
        <h4>Containers</h4>
        <div onClick={onRefresh} className='refresh'>Refresh</div>
      </div>
      <div className='card-body'>
        <div className='list-group list-group-flush'>
          {
            containers.map((container) =>
              <ContainerView
                key={container.id} {...container}
                onStart={() => onStart(container.id)}
                onStop={() => onStop(container.id)}
                onDelete={() => onDelete(container.id)}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ListContainersView
