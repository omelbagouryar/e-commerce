import React, { useState } from 'react'
import { useFormik} from 'formik'
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function Register() {
  let navigate=useNavigate()
const[errMessage,setmessage]=useState(null)
const [isload,setload]=useState(false)
const schemavalidation=Yup.object({
  name:Yup.string().min(3,'at least 3 character').required('name is required'),
  email:Yup.string().email('must be ex@gmail.com').required('email is required'),
  phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/i,'enter a valid phone number'),
  password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{4,}$/i,'enter a valid password'),
  rePassword:Yup.string().required('repassword is required').oneOf([Yup.ref('password')],'enter a matches password'),
})
  async function signup(values){
    setload(true)
   let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).catch((err)=>{
    setmessage(err.response.data.message)
    setload(false)
   })
   
   if(response.data.message === 'success'){
    setmessage(null)
    setload(false)
    formik.resetForm()
    navigate('/login')
   }
   console.log(response);
  }
  let formik=useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:'',
    },
    validationSchema:schemavalidation,
    onSubmit:signup
  })
  return (
    <div className='w-75 mx-auto my-5'>
      <h2 className='my-4 text-main fw-bold'>Register Now:</h2>
      {errMessage !== null?
       <p className='alert alert-danger'>{errMessage}</p>
       :
       ''
       }
      <form onSubmit={formik.handleSubmit}>
        <div className='mb-3'>
          <label htmlFor="name">Name</label>
          <input onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} type="text" className='form-control' id='name'/>
          {formik.errors.name&&formik.touched.name?<div className='alert alert-danger'>{formik.errors.name}</div>:null}
        </div>
        <div className='mb-3'>
          <label htmlFor="email">Email</label>
          <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange}  type="email" className='form-control' id='email' />
          {formik.errors.email&&formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:null}
        </div>
        <div className='mb-3'>
          <label htmlFor="phone">Phone</label>
          <input onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange}  type="tel" className='form-control' id='phone' />
          {formik.errors.phone&&formik.touched.phone?<div className='alert alert-danger'>{formik.errors.phone}</div>:null}
        </div>
        <div className='mb-3'>
          <label htmlFor="password">Password</label>
          <input onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange}  type="password" className='form-control' id='password' />
          {formik.errors.password&&formik.touched.password?<div className='alert alert-danger'>{formik.errors.password}</div>:null}
        </div>
        <div className='mb-3'>
          <label htmlFor="rePassword">Re-Password</label>
          <input onBlur={formik.handleBlur} value={formik.values.rePassword} onChange={formik.handleChange} type="password" className='form-control' id='rePassword' />
          {formik.errors.rePassword&&formik.touched.rePassword?<div className='alert alert-danger'>{formik.errors.rePassword}</div>:null}
        </div>
        {isload? <button  className='btn bg-main text-light float-end '> <i className='fa-solid fa-spinner fa-spin'></i></button>:
         <button disabled={!(formik.isValid&&formik.dirty)} className='btn bg-main text-white float-end' type="submit">Register</button>}
       
       
      </form>
      
    </div>
  )
}
