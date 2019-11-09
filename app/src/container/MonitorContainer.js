import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SectionHeader from '../sections/SectionHeader'
import MonitorContainerView from './MonitorContainerView'

import actions from '../actions'

class MonitorContainer extends React.Component {
  componentDidMount () {
    this.props.actions.connect({ id: this.props.match.params.id })
    this.props.actions.clearMonitor()
  }

  componentWillUnmount () {
    this.props.actions.disconnect({ id: this.props.match.params.id })
  }

  render () {
    return (
      <section>
        <SectionHeader title='Monitor' message={`Container: ${this.props.match.params.id}`} />
        <MonitorContainerView stats={this.props.monitor.stats} log={this.props.monitor.log} id={this.props.match.params.id} />
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({ monitor: state.monitor })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      log: actions.getContainerLog,
      stats: actions.getContainerStats,
      disconnect: actions.disconnectFromContainer,
      connect: actions.connectToContainer,
      clearMonitor: actions.clearMonitor
    },
    dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MonitorContainer)
