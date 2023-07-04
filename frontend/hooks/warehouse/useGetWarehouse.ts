import { useState } from 'react'
import { ADMIN_ALL_WAREHOUSE, ADMIN_ADD_WAREHOUSE, ADMIN_DELETE_WAREHOUSE, ADMIN_UPDATE_WAREHOUSE } from '../../constants/apiPathConstants'
import { useNotifyContext } from '../useNotifyContext'

type CustoemerType = {
  userId: number,
  userName: string,
  email: string,
  password: string,
  userRole: string,
  mobileNo: string,
}

type NewWarehouseType =  {
  totalCapacity: string,
  availableCapacity: string
}

export const useGetWarehouses = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isWarehousesExitsts, setIsWarehousesExitsts] = useState(false)
  const [warehouses, setWarehouses] = useState([])
  const {createNotification} = useNotifyContext()

  const getWarehouses = async () => {

    try {

      setIsLoading(true)
      setError(null)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${ADMIN_ALL_WAREHOUSE}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
  
      const json = await res.json()
  
      if(!res.ok){
        setIsLoading(false)
        setError(json.msg)
        setIsWarehousesExitsts(false)
      }
  
      if(res.ok){

        // set into transactions state
        if(json){

          if(json.length > 0){
            setWarehouses(json)
            setIsWarehousesExitsts(true)
          }else{
            setIsWarehousesExitsts(false)
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

  const deleteWarehouse = async (warehouseid: number) => {

    try {

      setIsLoading(true)
      setError(null)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${ADMIN_DELETE_WAREHOUSE.replace(":warehouseid", warehouseid.toString())}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
  
      const json = await res.json()
  
      if(!res.ok){
        setIsLoading(false)
        setError(json.msg)
        setIsWarehousesExitsts(false)
      }
  
      if(res.ok){

        // set into transactions state
        if(json){
          getWarehouses()
          // loading completed
          setIsLoading(false)
        }
        
      } 
    } catch (error) {
      // show error to user
      console.log('Error while fetching Transactions')
    }
  }

  const addNewWarehouse = async (data: NewWarehouseType) => {

    try {

      setIsLoading(true)
      setError(null)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${ADMIN_ADD_WAREHOUSE}`, {
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
        setIsWarehousesExitsts(false)
      }
  
      if(res.ok){

        // set into transactions state
        if(json){
          createNotification(true, "Success", "New Warehouse Added")
          getWarehouses()
          // loading completed
          setIsLoading(false)
        }
        
      } 
    } catch (error) {
      // show error to user
      console.log('Error while fetching Transactions')
    }
  }

  const updateWarehouse = async (warehouseid: number,data: NewWarehouseType) => {

    try {

      setIsLoading(true)
      setError(null)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${ADMIN_UPDATE_WAREHOUSE.replace(":warehouseid", warehouseid.toString())}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
  
      const json = await res.json()
  
      if(!res.ok){
        setIsLoading(false)
        setError(json.msg)
        setIsWarehousesExitsts(false)
      }
  
      if(res.ok){

        // set into transactions state
        if(json){
          createNotification(true, "Success", "Warehouse Updated")
          getWarehouses()
          // loading completed
          setIsLoading(false)
        }
        
      } 
    } catch (error) {
      // show error to user
      console.log('Error while fetching Transactions')
    }
  }

  return { isLoading, isWarehousesExitsts, error, warehouses, getWarehouses, deleteWarehouse, addNewWarehouse, updateWarehouse}
}
