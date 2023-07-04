import { useState } from 'react'
import { ADMIN_ALL_MANAGERS, ADMIN_DELETE_MANAGER, ADMIN_ADD_MANAGER } from '../constants/apiPathConstants'
import { useNotifyContext } from './useNotifyContext'

export type WarehouseType = {
  warehouseId: number,
  totalCapacity: number,
  availableCapacity: number,
  allRequests: [],
  warehouseLocation: {
      locId: number,
      line1: string,
      line2: string,
      state: string,
      city: string,
      pincode: number,
      type: string,
      user?: null
  }
}

export type ManagerType = {
  mgrId: number,
  mgrName: string,
  mgrEmail: string,
  mgrPassword: string,
  warehouse: WarehouseType
}

type AddManagerType = {
  mgrName: string,
  mgrEmail: string,
  mgrPassword: string,
}

export const useGetManagers = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isManagersExist, setIsManagersExists] = useState(false)
  const [managers, setManagers] = useState<ManagerType[] | null>(null)
  const {createNotification} = useNotifyContext()

  const getManagers = async () => {

    try {

      setIsLoading(true)
      setError(null)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${ADMIN_ALL_MANAGERS}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
  
      const json = await res.json()
  
      if(!res.ok){
        setIsLoading(false)
        setError(json.msg)
        setIsManagersExists(false)
      }
  
      if(res.ok){

        // set into transactions state
        if(json){

          if(json.length > 0){
            setManagers(json)
            setIsManagersExists(true)
          }else{
            setIsManagersExists(false)
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

  const deleteManager = async (managerid: number) => {

    try {

      setIsLoading(true)
      setError(null)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${ADMIN_DELETE_MANAGER.replace(":managerid", managerid.toString()) }`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
  
      const json = await res.json()
  
      if(!res.ok){
        setIsLoading(false)
        setError(json.msg)
        setIsManagersExists(false)
      }
  
      if(res.ok){

        // set into transactions state
        if(json){
          createNotification(true, "Success", "Manager Deleted")
          getManagers()
          // loading completed
          setIsLoading(false)
        }
        
      } 
    } catch (error) {
      // show error to user
      console.log('Error while fetching Transactions')
    }
  }

  const addNewManager = async (data: AddManagerType) => {

    try {

      setIsLoading(true)
      setError(null)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${ADMIN_ADD_MANAGER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
  
      const json = await res.json()
  
      if(!res.ok){
        setIsLoading(false)
        setError(json.msg)
        setIsManagersExists(false)
      }
  
      if(res.ok){

        // set into transactions state
        if(json){
          createNotification(true, "Success", "New Manager Added")
          getManagers()
          // loading completed
          setIsLoading(false)
        }
        
      } 
    } catch (error) {
      // show error to user
      console.log('Error while fetching Transactions')
    }
  }

  return { isLoading, isManagersExist, error, managers, getManagers, deleteManager, addNewManager}
}
