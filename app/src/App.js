import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import Header from './header/Header'
import NotificationService from './notification/NotificationService'

import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/scss/main.scss'

import appRoutes from './routes/index.js'

function App () {
  return (
    <div className='App'>
      <NotificationService />
      <main className='main' role='main'>
        <Header />
        <Switch>
          {appRoutes.map((prop, key) =>
            <Route path={prop.path} component={prop.component} key={key} exact />
          )}
        </Switch>
      </main>
    </div>
  )
}

export default withRouter(App)
