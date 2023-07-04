import { useGetCustomers } from '../hooks/customer/useGetCustomers'
import { useRouter } from 'next/router'
import {useState} from 'react'
import RequestDetailsModal from './RequestDetailsModal'

type UserType = {
  userId: number,
  userName: string,
  email: string,
  password: string,
  userRole: string,
  mobileNo: number
}

type ManagerType = {
  mgrId: number,
  mgrName: string,
  mgrEmail: string
}

type RequestItemType =       {
  itemId: number,
  quantity: number,
  requstedProduct: {
      productId: number,
      productName: string,
      volume: number,
      productCategory: {
          categoryId: number,
          categoryName: string,
          description: string,
      }
  }
}

type WarehouseType = {
  warehouseId: 2,
  totalCapacity: 8000,
  availableCapacity: 2000,
  manager: ManagerType,
  generationDate: "2022-01-10T00:00:00",
  serviceDate: "2022-01-15",
  actualServiceDate: "2022-01-20",
  requestItems: RequestItemType[]
}

export type PropType = {
  reqId: number,
  reqType: string,
  reqStatus: string,
  requiredSpace: number,
  requestingUser?: UserType,
  warehouse?: WarehouseType
}

export default function ShowRequests({ data,  }: {data: PropType[] | null}) {
  const router = useRouter()
  const {deleteCustomer} = useGetCustomers()
  const [open, setOpen] = useState(false)
  const [request, setRequest] = useState<PropType | null>(null)

  function handleRequestDetails(data: PropType){
    setRequest(data)
    setOpen(true)
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
                <th className="p-3">Request Id</th>
                <th className="p-3">Request Status</th>
                <th className="p-3">Requesting User</th>
                <th className="p-3">Warehouse Manager</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>

              {/* Looping through each transactions for listing */}
              {
                data?.map((list, index) => (
                  <tr key={index} className="border-b border-opacity-20 border-gray-700">
                    <td className="p-3">
                      <p>{list.reqId}</p>
                    </td>
                    <td className="p-3">
                      <p>{list.reqStatus}</p>
                    </td>
                    <td className="p-3">
                      <p>{list.requestingUser ? `${list.requestingUser.userName}, ${list.requestingUser.email}` : null }</p>
                    </td>
                    <td className="p-3 ">
                      <p>{list.warehouse?.manager ? `${list.warehouse.manager.mgrName}, ${list.warehouse.manager.mgrEmail}` : null}</p>
                    </td>

                    <td className="p-3 ">
                        {
                      list.reqStatus === 'PENDING' 
                      && (
                        <>
                        <button onClick={() => console.log(list.reqId)} className="m-2 bg-red-700 text-white transition duration-150 ease-in-out rounded hover:bg-red-600 px-6 py-2 text-xs">Declined</button>
                        <button onClick={() => console.log(list.reqId)} className="m-2 bg-green-700 text-white transition duration-150 ease-in-out rounded hover:bg-green-600 px-6 py-2 text-xs">Approve</button>
                        </>

                        )
                      }
                        <button onClick={() => handleRequestDetails(list)} className="m-2 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-xs">Details</button>

                    </td>

                    {/* <td className="p-3 ">
                    <button onClick={() => router.push(`/users/customers`)} className="my-2 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-xs">Details</button>
                    </td> */}

                  </tr>
                ))
              }

            </tbody>
          </table>
          {
            data && data.length === 0 && (
              <div className="flex justify-center items-center p-3">
                No Records Found
              </div>
            )
          }
        </div>

        <RequestDetailsModal open={open} setOpen={setOpen} data={request} />
      {/* </div> */}
    </>
  )
}