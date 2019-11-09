import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SectionHeader from '../sections/SectionHeader'
import ListContainersView from './ListContainersView'

import actions from '../actions'

class ListContainers extends React.Component {
  constructor () {
    super()
    this.handleOnRefresh = this.handleOnRefresh.bind(this)
  }

  componentDidMount () {
    this.handleOnRefresh()
  }

  handleOnRefresh () {
    this.props.actions.get()
  }

  action (action, id) {
    this.props.actions[action]({ id })
  }

  render () {
    return (
      <section className='docker-containers'>
        <SectionHeader title='Containers' message='Manage your containers.' />
        <div className='container'>
          <ListContainersView
            containers={this.props.containers}
            onRefresh={this.handleOnRefresh}
            onStart={id => this.action('start', id)}
            onDelete={id => this.action('delete', id)}
            onStop={id => this.action('stop', id)}
          />
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({ containers: state.containers })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      get: actions.getContainers,
      start: actions.startContainer,
      stop: actions.stopContainer,
      delete: actions.deleteContainer
    },
    dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ListContainers)
