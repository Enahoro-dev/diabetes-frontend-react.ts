import React, { ChangeEvent, useReducer } from 'react'
import Form from './Form'
import { ActionType, reducer} from './reducer'

const initialFormData = {
  user: {
    name: '',
    age: 0,
    email:'',
    pregnancy:0,
    glucose:0,
    pressure:0,
    thickness:0,
    insulin:0,
    bmi:0
  },
  family: {
    states: []
  }
}

const Container = () => {
  const [formData, dispatch] = useReducer(reducer, initialFormData)

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionType.USER,
      payload: {
        field: e.target.name,
        value: e.target.value
      }
    })
  }

  const onSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionType.FAMILY,
      payload: {
        field: e.target.name,
        value: e.target.value
      }
    })}
  

  return (
    <Form
      onInputChange={onInputChange}
      onSelectChange={onSelectChange}
      formData={formData}
      initialFormData={initialFormData}
    />
  )
}

export default Container