import React, { useState,useEffect, ChangeEvent, FormEvent } from 'react'
import { FormData} from './reducer'
import {forms} from './formmodel'

interface Props {
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSelectChange: (e: ChangeEvent<HTMLInputElement>) => void
  formData: FormData
  initialFormData:FormData
}

type Errors = {
    field?:string,
    email?:string
}

type Data = {
    Name : string ,
    Email : string,
    Pregnancies : number,
    Glucose  : number,
    BloodPressure  : number,
    SkinThickness  : number,
    Insulin  : number,
    BMI  : number,
    DiabetesPedigreeFunction  : number,
    Age:number
}

const Form:React.FC<Props> = ({ onInputChange, onSelectChange, formData, initialFormData }) => {
    const [formErrors, setFormErrors ] = useState<Errors>({})
    const [isSubmitted, setIsSubmitted] =  useState<boolean>(false)
    const [success, setSuccess] = useState<string>('hidden')

    const data:Data = {
        Name : formData['user']['name'] ,
        Email : formData['user']['email'],
        Pregnancies : formData['user']['pregnancy'],
        Glucose  : formData['user']['glucose'],
        BloodPressure  : formData['user']['pressure'],
        SkinThickness  : formData['user']['thickness'],
        Insulin  : formData['user']['insulin'],
        BMI  : formData['user']['bmi'],
        DiabetesPedigreeFunction  : formData['family']['states'][0],
	    Age:formData['user']['age']
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        setFormErrors(validate(data))
        setIsSubmitted(true)
        
    }

    let makeDiagnosis = async () => {
        fetch(`https://newdiabetesapi.herokuapp.com/api/users/diagnosis/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        })
    }    


    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmitted){
            makeDiagnosis()
            setSuccess('')
            
        }
    }, [formErrors, isSubmitted])

    let validate = (data:Data) => {
        const errors:Errors = {};
        const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
        if (data.Name === '' || data.Age === 0 || !data.DiabetesPedigreeFunction  ){
            errors.field = 'Please fill all fields'
        }
        if (data.Email === ''){
            errors.email = 'Email address is required'
        }else if (!regex.test(data.Email)){
            errors.email = 'Please enter a valid Email address'
        }
        return errors
       
    };

  return (
    <form onSubmit={onSubmit}>
      {
        forms.map((form, index)=>(
          <div key={index} className='flex flex-col my-2'>
            <label className='my-2 font-bold'>{form.label}</label>
            <input onChange={onInputChange} className='focus:outline-none focus:ring focus:border-blue-300 h-10 pl-4 text-lg border-2' type={form.type} name={form.name}/>
          </div>  
        ))
      } 
      <label className='mb-2 mt-8 font-bold'>Do you have any known family history of diabetes? (Required)</label>
      <div className='flex flex-col'>
        <div className='flex items-center flex-row border-2 w-1/2 mt-2 h-10 pl-2'>
            <input
                type="radio"
                value="1"
                name='states'
                onChange={onSelectChange}
                className='mr-4'
            />
            <label className='text-lg font-semibold'>Yes I do</label>
        </div>
        <div className='flex items-center flex-row border-x-2 border-b-2 w-1/2 h-10 pl-2'>
            <input
                type="radio"
                value= '0'
                name='states'
                onChange={onSelectChange}
                className='mr-4 mt-2'
            />
            <label className='text-lg font-semibold'>No I do not</label>
        </div>
      </div>
      <p className='text-red-500 mt-2'>{formErrors.field}</p>
      <p className='text-red-500'>{formErrors.email}</p>
      <div className={success}><p className='text-green-500 mt-4 text-sm font-semibold'>You will receive an email with the results of this assessment</p></div>
      <div className='flex items-center justify-center'><button type="submit" className='bg-blue-600 text-white font-semibold  rounded-sm h-12 w-36 my-8 text-lg'>Submit</button></div>
    </form>
  )
}

export default Form
