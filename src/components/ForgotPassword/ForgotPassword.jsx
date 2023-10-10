import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ForgotPassword() {
    let navigate=useNavigate()
    let validationSchema=Yup.object({
        email:Yup.string().email('must be ex@gmail.com').required('email is required')
    })
    async function forgotpassword(values){
let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
console.log(data);
if(data.statusMsg === 'success'){
    document.querySelector('.forgotpassword').classList.add("d-none")
    document.querySelector('.resetpassword').classList.remove("d-none")
}
    }
    let formik=useFormik({
        initialValues:{
            email:'',
        },
        validationSchema:validationSchema,
        onSubmit:forgotpassword
    })

    let validationSchema2=Yup.object({
        resetCode:Yup.string().required('code is required')
    })
    async function resetpassword(values){
let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
console.log(data);
if(data.status === 'Success'){
    navigate('/resetpassword')
    }
    }
    let formik2=useFormik({
        initialValues:{
        resetCode:'',
        },
        validationSchema:validationSchema2,
        onSubmit:resetpassword
    })
    
  return (
    <>
    <div className='forgotpassword'>
            <h3 className='text-main my-3'>Forgot Password:</h3>
        <form className='w-75 mx-auto  'onSubmit={formik.handleSubmit} >
            <label>Email:</label>
            <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" id='email' name='email' className='form-control my-2' />
            {formik.errors.email&&formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:null}
            <button disabled={!(formik.isValid&&formik.dirty)} type="submit" className='btn bg-main text-light my-3 float-end'>Send Code</button>
        </form>
    </div>
    <div className='resetpassword d-none'>
            <h3 className='text-main my-3'> Verify Reset Code:</h3>
        <form className='w-75 mx-auto  'onSubmit={formik2.handleSubmit} >
            <label>Reset code:</label>
            <input onBlur={formik2.handleBlur} value={formik2.values.resetCode} onChange={formik2.handleChange} type="text" id='resetCode' name='resetCode' className='form-control my-2' />
            {formik2.errors.resetCode&&formik2.touched.resetCode?<div className='alert alert-danger'>{formik2.errors.resetCode}</div>:null}
            <button disabled={!(formik2.isValid&&formik2.dirty)} type="submit" className='btn bg-main text-light my-3 float-end'>Send Code</button>
        </form>
    </div>
    </>
    
  )
}
