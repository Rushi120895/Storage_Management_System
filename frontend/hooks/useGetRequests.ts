import { useState } from 'react'
import { ADMIN_ALL_REQUESTS } from '../constants/apiPathConstants'

type RequestType = {
  reqId: number,
  reqType: string,
  reqStatus: string,
  requiredSpace: number,
}

export const useGetRequests = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isRequestsExist, setIsRequestsExists] = useState(false)
  const [requests, setRequests] = useState<RequestType[] | null>([])

  const getRequests = async () => {

    try {

      setIsLoading(true)
      setError(null)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${ADMIN_ALL_REQUESTS}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
  
      const json = await res.json()
  
      if(!res.ok){
        setIsLoading(false)
        setError(json.msg)
        setIsRequestsExists(false)
      }
  
      if(res.ok){

        // set into transactions state
        if(json){

          if(json.length > 0){
            setRequests(json)
            setIsRequestsExists(true)
          }else{
            setIsRequestsExists(false)
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


  return { isLoading, isRequestsExist, error, requests, getRequests}
}
