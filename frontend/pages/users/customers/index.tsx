import {useState, useEffect} from 'react'
import ShowCustomers from "../../../components/ShowCustomers";
import { useGetCustomers } from '../../../hooks/customer/useGetCustomers';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Customers(){
  const [filterType, setFilterType] = useState("name")
  const [filterValue, setFilterValue] = useState("")
  const {getCustomers, isCustomersExist, customers} = useGetCustomers()
  const [isFilterCustomers, setIsFilterCustomers] = useState(false)
  const [allCustomers, setAllCustomers] = useState<typeof customers | null>(null)

  // state for pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // first time rendered
  useEffect(() => {
     getCustomers()
  },[])

  // when filter occur
  useEffect(() => {
    setAllCustomers(customers)
  },[isCustomersExist,customers])

  // on page change event
  useEffect(() => {
    // handleSearchClick()
  },[limit, page])

  // search handler
  // function handleSearchClick(){
  //   setAllCustomers(null)
  //   if(filterType && filterValue && filterType !== '' && filterValue !== ''){
  //     setIsFilterCustomers(true)
  //     getFilteredCustomers(filterType, filterValue, page, limit)
  //   }
  //   if(filterValue === ''){
  //     setIsFilterCustomers(false)
  //     getCustomers(page, limit)
  //   }
  // }

  return (
    <>
     <div className="border-b border-gray-200 p-5">
      <h1 className="text-2xl font-medium leading-6 text-gray-900">Customers</h1>
     </div>
     {/* <div>
      <div className=" flex justify-center items-center">

        <div className="mt-1 flex rounded-md  w-1/2 py-2">
          <select 
            onChange={(e) => setFilterType(e.target.value)}
            className="inline-flex items-center font-bold rounded-l-md border border-r-0 border-gray-300 bg-gray-50 p-3 text-gray-500 sm:text-md">
              <option value="name">Company Name</option>
              <option value="customerId">Company Id</option> 
            </select>
          <input
            type="text"
            name="company-website"
            id="company-website"
            className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Company Name or Company Id"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
            <button
            type="button"
            onClick={handleSearchClick}
            className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>              
      </div>
     </div> */}
     <div className="container p-2 mx-auto sm:p-4 text-gray-800">
     <div className="flex justify-between items-center">
          <div className="mb-4 text-2xl font-semibold leading-tight">List of All Customers</div>
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

      { allCustomers && <ShowCustomers customers={allCustomers} />}
     </div>

    </>
  )
}