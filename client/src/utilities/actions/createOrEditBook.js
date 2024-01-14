import axios from "axios"
import { getToken } from '../helpers/common'

export async function bookCreate(request){
  const data = await formToObj(request)
  return await axios.post('/api/books', data, {
    validateStatus: () => true,
    headers:{
      Authorization:`Bearer ${getToken()}`
    }
  })
}

export async function bookEdit(request, id){
  const data = await formToObj(request)
  return await axios.put(`/api/books/${id}`, data, {
    validateStatus: () => true,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}

export async function formToObj(request){
  const formData = await request.formData()
  return Object.fromEntries(formData.entries())
}