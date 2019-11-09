import React from 'react'

const MonitorContainerView = ({ stats, log, refresh, id }) => {
  return (
    <div className='monitor container'>
      <div className='card'>
        <div className='card-header d-flex justify-content-between align-items-center'>
          <div>Stats</div>
        </div>
        <div className='card-body'>
          <div className='stats'>
            <table className='table table-borderless'>
              <thead>
                <tr>
                  <th scope='col'>CPU %</th>
                  <th scope='col'>Memory Usage</th>
                  <th scope='col'>Memory Limit</th>
                  <th scope='col'>Memory %</th>
                  <th scope='col'>Network</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>{stats.cpu}</th>
                  <td>{stats.cpu}</td>
                  <td>{stats.mem_usage}</td>
                  <td>{stats.mem_limit}</td>
                  <td>{stats.mem_perc}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='card'>
        <div className='card-header d-flex justify-content-between align-items-center'>
          <div>Log</div>
        </div>
        <div className='card-body'>
          <div className='log'>
            <pre>
              <code>
                {log}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonitorContainerView
