import { useGetCustomers } from '../hooks/customer/useGetCustomers'
import { useRouter } from 'next/router'

type CustomerType = {
  userId: number,
  userName: string,
  email: string,
  password: string,
  userRole: string,
  mobileNo: string,
}

export default function ShowCustomers({ customers }: {customers: CustomerType[]}) {
  const router = useRouter()
  const {deleteCustomer} = useGetCustomers()

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
                <th className="p-3">User Id</th>
                <th className="p-3">User Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Action</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>
            <tbody>

              {/* Looping through each transactions for listing */}
              {
                customers?.map((list, index) => (
                  <tr key={index} className="border-b border-opacity-20 border-gray-700">
                    <td className="p-3">
                      <p>{list.userId}</p>
                    </td>
                    <td className="p-3">
                      <p>{list.userName}</p>
                    </td>
                    <td className="p-3">
                      <p>{list.email}</p>
                    </td>
                    <td className="p-3 ">
                      <p>{list.userRole}</p>
                    </td>
                    <td className="p-3 ">
                    <button onClick={() => deleteCustomer(list.userId)} className="my-2 bg-red-700 text-white transition duration-150 ease-in-out rounded hover:bg-red-600 px-6 py-2 text-xs">Delete</button>
                    </td>
                    <td className="p-3 ">
                    <button onClick={() => router.push(`/users/customers`)} className="mx-2 my-2 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-xs">Details</button>
                    </td>

                  </tr>
                ))
              }

            </tbody>
          </table>
          {
            customers.length === 0 && (
              <div className="flex justify-center items-center p-3">
                No Records Found
              </div>
            )
          }
        </div>
      {/* </div> */}
    </>
  )
}