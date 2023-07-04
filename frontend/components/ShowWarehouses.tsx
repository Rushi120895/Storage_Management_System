import { useRouter } from 'next/router'
import { useState } from 'react'
import { useNotifyContext } from '../hooks/useNotifyContext'
import {useGetWarehouses} from '../hooks/warehouse/useGetWarehouse'
import Modal from './Modal'
import UpdateWarehouseModal from './UpdateWarehouseModal'

type LocationType = {
  locId: number,
  line1: string,
  line2: string,
  state: string,
  city: string,
  pincode: number,
  type: string,
}

type ManagerType = {
  mgrId: number,
  mgrName: string,
  mgrEmail: string,
  mgrPassword: string,
}

type PropType = {
  warehouseId: number,
  totalCapacity: number,
  availableCapacity: number,
  manager: ManagerType,
  allRequests?: [],
  warehouseLocation?: LocationType
}

type NewWarehouseType =  {
  totalCapacity: string,
  availableCapacity: string
}

export default function ShowWarehouses({ data }: {data: PropType[]}) {
  const router = useRouter()
  const {deleteWarehouse, updateWarehouse} = useGetWarehouses()
  const [open, setOpen] = useState(false)
  const {createNotification} = useNotifyContext()
  const [warehouseId, setWarehouseId] = useState<number | null>(null)
  const [updatedWarehouse, setUpdatedWarehouse] = useState({
    totalCapacity: '',
    availableCapacity: ''
})
  
  function handleOpenUpdateModal(warehouseid: number){
    setWarehouseId(warehouseid)
    setUpdatedWarehouse({
      totalCapacity: '',
      availableCapacity: ''
  })
    setOpen(current => !current)
  }

  function handleUpdateWarehouse(){
    console.log('id : ', warehouseId)
    if(warehouseId && updatedWarehouse.availableCapacity !== '' && updatedWarehouse.totalCapacity !== '' 
      && Number(updatedWarehouse.availableCapacity) > 0 && Number(updatedWarehouse.totalCapacity) > 0){
      updateWarehouse(warehouseId, updatedWarehouse)
    }else{
      createNotification(false, "Failed", "Field must be Greated than 0.")
    }

  }

  return (
    <>
      {/* Table for transactions */}
      {/* <div className="container p-2 mx-auto sm:p-4 text-gray-800">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">List of All Customers</h2> */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <colgroup>
              <col></col>
              <col></col>
              <col></col>
              <col></col>
              <col></col>
            </colgroup>
            {/* Table Heading */}
            <thead className="bg-[#c4cacc7a]">
              <tr className="text-left">
                <th className="p-3">Warehouse Id</th>
                <th className="p-3">Capacity</th>
                <th className="p-3">Manager Name</th>
                <th className="p-3">Warehouse Address</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>

              {/* Looping through each transactions for listing */}
              {
                data?.map((list, index) => (
                  <tr key={list.warehouseId} className="border-b border-opacity-20 border-gray-700">
                    <td className="p-3">
                      <p>{list.warehouseId}</p>
                    </td>
                    <td className="p-3">
                      <p>{`${list.availableCapacity}/${list.totalCapacity}`}</p>
                    </td>
                    <td className="p-3">
                      <p>{`${list.manager.mgrName}`}</p>
                    </td>
                    <td className="p-3 ">
                      <p>{`${list.warehouseLocation?.line1}, ${list.warehouseLocation?.line2}, ${list.warehouseLocation?.city}, ${list.warehouseLocation?.state}`}</p>
                    </td>
                    <td className="p-3 ">
                    <button onClick={() => deleteWarehouse(list.warehouseId)} className="m-2 bg-red-700 text-white transition duration-150 ease-in-out rounded hover:bg-red-600 px-6 py-2 text-xs">Delete</button>
                    <button onClick={() => handleOpenUpdateModal(list.warehouseId)} className="my-2 bg-indigo-700 text-white transition duration-150 ease-in-out rounded hover:bg-indigo-600 px-6 py-2 text-xs">Update</button>
                    </td>

                  </tr>
                ))
              }

            </tbody>
          </table>
          {
            data.length === 0 && (
              <div className="flex justify-center items-center p-3">
                No Records Found
              </div>
            )
          }
        </div>

        
        <UpdateWarehouseModal 
          open={open} 
          setOpen={setOpen} 
          updatedWarehouse={updatedWarehouse} 
          setUpdatedWarehouse={setUpdatedWarehouse} 
          handleUpdateWarehouse={handleUpdateWarehouse} 
        />

      {/* </div> */}
    </>
  )
}