import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik } from 'formik'

import SectionHeader from '../sections/SectionHeader'
import BuildImageView from './BuildImageView'

import actions from '../actions'

class BuildImage extends React.Component {
  constructor () {
    super()
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  componentDidMount () {
    this.props.actions.clearOutput()
  }

  componentWillUnmount () {
    this.props.actions.disconnect({ id: this.props.match.params.id })
  }

  handleOnSubmit (values, formActions) {
    this.props.actions.build({ ...values })
    formActions.setSubmitting(false)
  }

  validateForm (values) {
    const errors = {}

    if (!values.image) {
      errors.image = 'Image file is required'
    }

    if (!values.tag) {
      errors.tag = 'Image name is required'
    }

    return errors
  }

  createSectionMessage () {
    return 'Upload your tarball, fill the image name, and press build image. Please do not navigate while processing.'
  }

  render () {
    return (
      <section>
        <SectionHeader title='Build Image' message={this.createSectionMessage()} />
        <div className='container'>
          <Formik
            initialValues={{ image: '' }}
            validate={this.validateForm}
            onSubmit={this.handleOnSubmit}
            render={(props) => (
              <BuildImageView {...props} out={this.props.out} />
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
      build: actions.buildImage,
      disconnect: actions.disconnectFromContainer,
      clearOutput: actions.clearOutput
    },
    dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BuildImage)
