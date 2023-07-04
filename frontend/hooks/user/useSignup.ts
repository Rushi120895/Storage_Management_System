import { useRouter } from 'next/router'
import { useState } from 'react'
import { CONNECTION_FAILED, CONNECTION_FAILED_DESC, SIGNUP_DESC, SIGNUP_MSG } from '../../constants/notifyConstants'
import { useAuthContext } from '../useAuthContext'
import { useNotifyContext } from '../useNotifyContext'
import { SIGNIN_PATH, SIGNUP_PATH} from '../../constants/apiPathConstants'

type UserData = {
  userName: string,
  email: string,
  password: string,
  userRole: string,
  mobileNo: string,
}

export const useSignup = () => {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()
  const { createNotification } = useNotifyContext()

  const signup = async ({userName, mobileNo, email, password, userRole }: UserData) => {
    try {
      setIsLoading(true)
      setError(null)
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${SIGNUP_PATH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName, mobileNo, email, password, userRole})
      })
  
      const json = await res.json()
  
      if(!res.ok){
        setIsLoading(false)
        setError(json.msg)
      }
  
      if(res.ok){
        // save the user info into localStorage
        // const { _id , name, email, mobile, token, isAdmin } = json
        console.log('json : ', json)
        // localStorage.setItem('user', JSON.stringify({ _id , name, email, mobile, token, isAdmin }))
  
        // update the auth context
        // dispatch({ type: 'LOGIN', payload: {_id , name, email, mobile, token, isAdmin} })

        // show signup notification
        createNotification(true, SIGNUP_MSG, SIGNUP_DESC)
  
        setIsLoading(false)
        router.push('/')
      } 
    } catch (error) {
      // show error to user
      createNotification(false, CONNECTION_FAILED, CONNECTION_FAILED_DESC)
      setIsLoading(false)
    }

  }

  return { signup, isLoading, error}
}
