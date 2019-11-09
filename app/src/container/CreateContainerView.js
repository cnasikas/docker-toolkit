import React from 'react'
import { Field, Form } from 'formik'
import OutputView from '../components/OutputView'

const CreateContainerView = ({ errors, status, touched, isSubmitting, out }) => {
  return (
    <Form>
      <div className='form-row'>
        <div className='form-group col-md-12'>
          <Field type='text' name='image' className={`form-control ${errors.image ? 'is-invalid' : ''}`} placeholder='Image name' />
          {errors.image && touched.image && <div className='invalid-feedback'>{errors.image}</div>}
          {status && status.msg && <div>{status.msg}</div>}
        </div>
      </div>
      <OutputView out={out} />
      <button type='submit' disabled={isSubmitting} className='btn btn-primary mt-3'>Create container</button>
    </Form>
  )
}

export default CreateContainerView
