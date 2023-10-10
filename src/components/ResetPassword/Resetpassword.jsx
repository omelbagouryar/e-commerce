import React from 'react'
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';

export default function Resetpassword() {
    let navigate=useNavigate()
    let validationSchema2=Yup.object({
        email:Yup.string().email('must be ex@gmail.com').required('email is required'),
        newPassword:Yup.string().required('password  is required')
    })
    async function resetpassword(values){
let {data}= await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
console.log(data);
if(data.token){
    navigate('/login')
}

    }
    let formik2=useFormik({
        initialValues:{
            email:'',
            newPassword:''
        },
        validationSchema:validationSchema2,
        onSubmit:resetpassword
    })
  return (
    <div>
        <h3 className='text-main my-5'>Reset Password</h3>
        <form className='w-75 mx-auto my-5'>
            <label>Email</label>
            <input className='form-control my-3' type="email" id='email' name='email' onBlur={formik2.handleBlur} value={formik2.values.email} onChange={formik2.handleChange} />
            {formik2.errors.email&&formik2.touched.email?<div className='alert alert-danger'>{formik2.errors.email}</div>:null}
            <label>New Password</label>
            <input className='form-control my-3' type="password" id='newPassword' name='newPassword' onBlur={formik2.handleBlur} value={formik2.values.newPassword} onChange={formik2.handleChange} />
            {formik2.errors.newPassword&&formik2.touched.newPassword?<div className='alert alert-danger'>{formik2.errors.newPassword}</div>:null}
            <button disabled={!(formik2.isValid&&formik2.dirty)} type="submit" className='btn bg-main text-light my-3 float-end'>Reset Password</button>
        </form>
    </div>
  )
}
