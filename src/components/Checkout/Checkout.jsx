import { useFormik } from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup';
import { cartContext } from '../../Context/cartContext';


export default function Checkout() {
    let {onlinePayment,getloggedusercart} =useContext(cartContext)

    let validationSchema=Yup.object({
        details:Yup.string().min(3,'at least 3 character').required('Details is required'),
        phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/i,'enter a valid phone number'),
        city:Yup.string().min(3,'at least 3 character').required('City is required') 
    })

    async function onlinepay(values){
        let {data}=await getloggedusercart()
        let resp =await onlinePayment(data.data._id,values)
        window.location.href=resp.data.session.url

    }




    let formik=useFormik({
        initialValues:{
            details:'',
            phone:'',
            city:''
        },
        validationSchema:validationSchema
        ,
        onSubmit:onlinepay
    })
  return (
    <div>
        <form onSubmit={formik.handleSubmit} className='w-75 mx-auto my-5'>
            <label>Details</label>
            <input value={formik.values.details}  onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id='details' name='details' className='form-control'  />
            {formik.errors.details&&formik.touched.details?<div className='alert alert-danger'>{formik.errors.details}</div>:null}
            <br />
            <label>Phone</label>
            <input value={formik.values.phone}  onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" id='phone' name='phone' className='form-control'  />
            {formik.errors.phone&&formik.touched.phone?<div className='alert alert-danger'>{formik.errors.phone}</div>:null}
            <br />
            <label>City</label>
            <input value={formik.values.city}  onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id='city' name='city' className='form-control'  />
            {formik.errors.city&&formik.touched.city?<div className='alert alert-danger'>{formik.errors.city}</div>:null}
            <button disabled={!(formik.isValid&&formik.dirty)} type="submit" className='w-100 btn btn-outline-info  my-4'>Pay now</button>

        </form>
    </div>
  )
}
