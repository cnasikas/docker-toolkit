import React from 'react'

const OutputView = ({ out }) => {
  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <div>Process output</div>
      </div>
      <div className='card-body'>
        <div className='output'>
          <pre>
            <code>
              {out.output}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default OutputView
