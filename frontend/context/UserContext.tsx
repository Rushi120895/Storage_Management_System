import { createContext, ReactNode, useEffect, useReducer, useState } from 'react'
import { LOGIN, LOGOUT} from '../constants/contextConstants'

export type AuthUser = {
  userId: number,
  userName: string,
  email: string,
  password: string,
  userRole: string,
  mobileNo: string,
  userLocation: {
    city: string,
    line1: string,
    line2: string,
    locId: number,
    pincode: string,
    state: string
}
}

type UserContextType = {
  user: AuthUser | null,
  dispatch: React.Dispatch<ActionType>
}

type UserContextProviderprops = {
  children: ReactNode
}

// reducer
type UserState = {
  user: AuthUser | null,
}

const initialUserState = {
  user: null,
}

type UpdateActionType = {
  type: 'LOGIN',
  payload: AuthUser
}

type NoUpdateActionType = {
  type: 'LOGOUT'
}


type ActionType = UpdateActionType | NoUpdateActionType 

const userReducer = (state: UserState, action: ActionType) => {
  switch(action.type) {
    case LOGIN:
      return { ...state, user: action.payload}
    case LOGOUT: 
      return { ...state, user: null}
    default:
      return state
  }
}


export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderprops) => {
  // const [user, setUser] = useState<AuthUser | null>(null)

  const [state, dispatch] = useReducer(userReducer, initialUserState)

  // useEffect(() => {
  //   console.log('useEffect')
  //   const userData = localStorage.getItem('user')

  //   if(userData){
  //     const user = JSON.parse(userData)
  //     console.log('user : ', user)
  //     dispatch({type: 'LOGIN', payload: user})
  //   }
    
  // },[])

  return (
    <UserContext.Provider value={{ ...state, dispatch}}>
      { children }
    </UserContext.Provider>
  )

}

