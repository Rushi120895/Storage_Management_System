import { useState } from 'react'
import { ADMIN_ALL_USERS, ADMIN_DELETE_USER } from '../../constants/apiPathConstants'

type CustoemerType = {
  userId: number,
  userName: string,
  email: string,
  password: string,
  userRole: string,
  mobileNo: string,
}

export const useGetCustomers = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCustomersExist, setIsCustomersExists] = useState(false)
  const [customers, setCustomers] = useState([])

  const getCustomers = async () => {

    try {

      setIsLoading(true)
      setError(null)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${ADMIN_ALL_USERS}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
  
      const json = await res.json()
  
      if(!res.ok){
        setIsLoading(false)
        setError(json.msg)
        setIsCustomersExists(false)
      }
  
      if(res.ok){

        // set into transactions state
        if(json){

          if(json.length > 0){
            setCustomers(json)
            setIsCustomersExists(true)
          }else{
            setIsCustomersExists(false)
          }

          // loading completed
          setIsLoading(false)
        }
        
      } 
    } catch (error) {
      // show error to user
      console.log('Error while fetching Transactions')
    }

  }

  const deleteCustomer = async (userId: number) => {

    try {

      setIsLoading(true)
      setError(null)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${ADMIN_DELETE_USER.replace(":userid", userId.toString()) }`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
  
      const json = await res.json()
  
      if(!res.ok){
        setIsLoading(false)
        setError(json.msg)
        setIsCustomersExists(false)
      }
  
      if(res.ok){

        // set into transactions state
        if(json){
          getCustomers()
          // loading completed
          setIsLoading(false)
        }
        
      } 
    } catch (error) {
      // show error to user
      console.log('Error while fetching Transactions')
    }
  }

  return { isLoading, isCustomersExist, error, customers, getCustomers, deleteCustomer}
}
