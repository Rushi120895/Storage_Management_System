import {useState, useEffect} from 'react'
import ShowCustomers from '../../components/ShowWarehouses'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useGetWarehouses } from '../../hooks/warehouse/useGetWarehouse'
import ShowWarehouses from '../../components/ShowWarehouses'
import Modal from '../../components/Modal'
import { useNotifyContext } from '../../hooks/useNotifyContext'


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Customers(){
  const {getWarehouses, warehouses, isWarehousesExitsts, addNewWarehouse, updateWarehouse} = useGetWarehouses()
  const [allWarehouses, setAllWarehouses] = useState<typeof warehouses | null>(null)
  const [newWarehouse, setNewWarehouse] = useState( {
    totalCapacity: '',
    availableCapacity: ''
})

  // notification
  const {createNotification} = useNotifyContext()

  // first time rendered
  useEffect(() => {
     getWarehouses()
  },[])

  // when filter occur
  useEffect(() => {
    setAllWarehouses(warehouses)
  },[isWarehousesExitsts,warehouses])

  async function handleAddNewWarehouse(){
    if(newWarehouse.totalCapacity === '' && newWarehouse.availableCapacity === '' 
      && Number(newWarehouse.totalCapacity) <= 0 && Number(newWarehouse.availableCapacity) <= 0){
      createNotification(false, "Failed", "Fields Should Greater than 0.")
    }else{
      await addNewWarehouse(newWarehouse)
    }
  }

  return (
    <>
     <div className="border-b border-gray-200 p-5">
      <h1 className="text-2xl font-medium leading-6 text-gray-900">Warehouse</h1>
     </div>
     <div>
     <div className="container p-2 mx-auto sm:p-4 text-gray-800 text-2xl font-semibold leading-tight">Add New Warehouse</div>

      <div className=" flex justify-start items-center px-4">

        <div className="mt-1 flex rounded-md py-2">
          {/* <select 
            onChange={(e) => setFilterType(e.target.value)}
            className="inline-flex items-center font-bold rounded-l-md border border-r-0 border-gray-300 bg-gray-50 p-3 text-gray-500 sm:text-md">
              <option value="name">Company Name</option>
              <option value="customerId">Company Id</option> 
            </select> */}
          <input
            type="text"
            name="available-capacity"
            id="available-capacity"
            className="mx-2 block w-full min-w-0 flex-1 rounded-none rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Available Capacity"
            value={newWarehouse.availableCapacity}
            onChange={(e) => setNewWarehouse({ ...newWarehouse, availableCapacity: e.target.value})}
          />
        <input
            type="text"
            name="available-capacity"
            id="available-capacity"
            className="mx-2 block w-full min-w-0 flex-1 rounded-none rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Total Capacity"
            value={newWarehouse.totalCapacity}
            onChange={(e) => setNewWarehouse({ ...newWarehouse, totalCapacity: e.target.value})}
          />
          </div>

          <div className="py-4">
          <button
            type="button"
            onClick={handleAddNewWarehouse}
            className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 p-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Warehouse
          </button>
          </div>
             
      </div>
     </div>

     <div className="container p-2 mx-auto sm:p-4 text-gray-800">
     <div className="flex justify-between items-center">
          <div className="mb-4 text-2xl font-semibold leading-tight">List of All Warehouses</div>
      </div>

      { allWarehouses && <ShowWarehouses data={allWarehouses} />}

      {/* <Modal /> */}
     </div>

    </>
  )
}