import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik } from 'formik'

import SectionHeader from '../sections/SectionHeader'
import CreateContainerView from './CreateContainerView'

import actions from '../actions'

class CreateContainer extends React.Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  componentDidMount () {
    this.props.actions.clearOutput()
  }

  componentWillUnmount () {
    this.props.actions.disconnect({ id: this.props.match.params.id })
  }

  handleSubmit (values, formActions) {
    this.props.actions.create({ ...values })
    formActions.setSubmitting(false)
  }

  validateForm (values) {
    const errors = {}

    if (!values.image) {
      errors.image = 'Image name is required'
    }

    return errors
  }

  createSectionMessage () {
    return 'Fill the form and press create container. Please do not navigate while processing.'
  }

  render () {
    return (
      <section>
        <SectionHeader title='Create container' message={this.createSectionMessage()} />
        <div className='container'>
          <Formik
            initialValues={{ image: '' }}
            validate={this.validateForm}
            onSubmit={this.handleSubmit}
            render={(props) => (
              <CreateContainerView {...props} out={this.props.out} />
            )}
          />
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({ out: state.output })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      create: actions.createContainer,
      disconnect: actions.disconnectFromContainer,
      clearOutput: actions.clearOutput
    },
    dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)
