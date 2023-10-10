import React, { useContext, useState } from 'react'
import { useFormik} from 'formik'
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { userContext } from '../../Context/userToken';

export default function Login() {
  let {setToken}=useContext(userContext)
  let navigate=useNavigate()
const[errMessage,setmessage]=useState(null)
const [isload,setload]=useState(false)
const schemavalidation=Yup.object({
  email:Yup.string().email('must be ex@gmail.com').required('email is required'),
  password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{4,}$/i,'enter a valid password'),
})
  async function signin(values){
    setload(true)
   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values).catch((err)=>{
    setmessage(err.response.data.message)
    setload(false)
   })
   console.log(data);

   
   if(data.message === 'success'){
    setmessage(null)
    setload(false)
    formik.resetForm()
    navigate('/')
    localStorage.setItem('userToken',data.token)
    setToken(localStorage.getItem('userToken'))
   }
  }
  let formik=useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema:schemavalidation,
    onSubmit:signin
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
          <label htmlFor="email">Email</label>
          <input onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange}  type="email" className='form-control' id='email' />
          {formik.errors.email&&formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:null}
        </div>
        <div className='mb-3'>
          <label htmlFor="password">Password</label>
          <input onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange}  type="password" className='form-control' id='password' />
          {formik.errors.password&&formik.touched.password?<div className='alert alert-danger'>{formik.errors.password}</div>:null}
        </div>
        
        
        {isload? <button  className='btn bg-main text-light float-end '> <i className='fa-solid fa-spinner fa-spin'></i></button>:
        <>
        <button disabled={!(formik.isValid&&formik.dirty)} className='btn bg-main text-white float-end' type="submit">Login</button>
        
        <Link to='/register'><span className='text-main'>Go To Register Now...</span></Link>
        <br />
        <Link to='/forgotpassword'><span className='text-main '>Forgot Password...</span></Link>
        </>
         }
      </form>
      
    </div>
  )
}
