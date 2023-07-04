import {useState, useEffect} from 'react'
import ShowCustomers from "../../../components/ShowCustomers";
import { useGetCustomers } from '../../../hooks/customer/useGetCustomers';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useGetManagers } from '../../../hooks/useGetManagers';
import ShowManagers from '../../../components/ShowManagers';
import { useNotifyContext } from '../../../hooks/useNotifyContext';


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Managers(){
  const [filterType, setFilterType] = useState("name")
  const [filterValue, setFilterValue] = useState("")
  const {getManagers, isManagersExist, managers, addNewManager} = useGetManagers()
  const [isFilterCustomers, setIsFilterCustomers] = useState(false)
  const [allManagers, setAllManagers] = useState<typeof managers | null>(null)
  const [newManager, setNewManager] = useState({
        mgrName: '',
        mgrEmail: '',
        mgrPassword: ''
  })

  // notification
  const {createNotification} = useNotifyContext()

  // first time rendered
  useEffect(() => {
     getManagers()
  },[])

  // when filter occur
  useEffect(() => {
    setAllManagers(managers)
  },[isManagersExist,managers])

  async function handleAddNewManager(){
    if(newManager.mgrName === '' && newManager.mgrEmail === '' && newManager.mgrPassword === ''){
      createNotification(false, "Failed", "Fields Should Not be blank.")
    }else{
      await addNewManager(newManager)
    }
  }

  return (
    <>
     <div className="border-b border-gray-200 p-5">
      <h1 className="text-2xl font-medium leading-6 text-gray-900">Managers</h1>
     </div>
     <div>
     <div className="container p-2 mx-auto sm:p-4 text-gray-800 text-2xl font-semibold leading-tight">Add New Manager</div>

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
            name="manager-name"
            id="manager-name"
            className="mx-2 block w-full min-w-0 flex-1 rounded-none rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Manager Name"
            value={newManager.mgrName}
            onChange={(e) => setNewManager({ ...newManager, mgrName: e.target.value})}
          />
          <input
            type="text"
            name="manager-email"
            id="manager-email"
            className="mx-2 block w-full min-w-0 flex-1 rounded-none rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Manager Email"
            value={newManager.mgrEmail}
            onChange={(e) => setNewManager({ ...newManager, mgrEmail: e.target.value})}
          />
          <input
            type="text"
            name="manager-password"
            id="manager-password"
            className="mx-2 block w-full min-w-0 flex-1 rounded-none rounded-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Manager Password"
            value={newManager.mgrPassword}
            onChange={(e) => setNewManager({ ...newManager, mgrPassword: e.target.value})}
          />
          </div>

          <div className="py-4">
          <button
            type="button"
            onClick={handleAddNewManager}
            className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 p-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Manager
          </button>
          </div>
             
      </div>
     </div>
     <div className="container p-2 mx-auto sm:p-4 text-gray-800">
     <div className="flex justify-between items-center">
          <div className="mb-4 text-2xl font-semibold leading-tight">List of All Managers</div>
          {/* <div className="">
            <span>Page Size :</span>
            <select 
            onChange={(e) => {setLimit(Number(e.target.value));setPage(1)}}
            className="inline-flex items-center font-bold w-24 rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-500 sm:text-md">
              <option value="5">5</option>
              <option value="10" selected>10</option>
              <option value="20">20</option>
              <option value="50">50</option> 
            </select>
          </div> */}
      </div>

      { allManagers && <ShowManagers data={managers} /> }
     </div>

    </>
  )
}