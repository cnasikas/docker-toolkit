import React from 'react'
import { Field, Form } from 'formik'

import OutputView from '../components/OutputView'

const BuildImageView = ({ errors, status, touched, isSubmitting, out, setFieldValue }) => {
  return (
    <Form>
      <div className='form-row'>
        <div className='form-group col-md-4'>
          <Field type='text' name='tag' className={`form-control ${errors.tag ? 'is-invalid' : ''}`} placeholder='Image name' />
          {errors.tag && touched.tag && <div className='invalid-feedback'>{errors.tag}</div>}
          {status && status.msg && <div>{status.msg}</div>}
        </div>
        <div className='form-group col-md-8'>
          <div className='custom-file'>
            <input
              type='file'
              name='image'
              className='custom-file-input'
              id='image'
              onChange={(e) => setFieldValue('image', e.target.files[0])}
            />
            <label className='custom-file-label' htmlFor='image'>Choose file</label>
            {errors.image && touched.image && <div className='invalid-feedback'>{errors.image}</div>}
            {status && status.msg && <div>{status.msg}</div>}
          </div>
        </div>
      </div>
      <OutputView out={out} />
      <button type='submit' disabled={isSubmitting} className='btn btn-primary mt-3'>Build Image</button>
    </Form>
  )
}

export default BuildImageView
