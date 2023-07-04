import { useRouter } from 'next/router'
import { useGetManagers, ManagerType } from '../hooks/useGetManagers'

export default function ShowManagers({ data }: {data: ManagerType[] | null}) {
  const router = useRouter()
  const {deleteManager} = useGetManagers()

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
                <th className="p-3">Id</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Warehouse Id</th>
                <th className="p-3">Warehouse Location</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>

              {/* Looping through each transactions for listing */}
              {
                data?.map((list, index) => (
                  <tr key={index} className="border-b border-opacity-20 border-gray-700">
                    <td className="p-3">
                      <p>{list.mgrId}</p>
                    </td>
                    <td className="p-3">
                      <p>{list.mgrName}</p>
                    </td>
                    <td className="p-3">
                      <p>{list.mgrEmail}</p>
                    </td>
                    <td className="p-3">
                      <p>{list.warehouse && list.warehouse.warehouseId}</p>
                    </td>
                    <td className="p-3 ">
                      <p>{list.warehouse ? `${list.warehouse.warehouseLocation.line1}, ${list.warehouse.warehouseLocation.line2}, ${list.warehouse.warehouseLocation.city}, ${list.warehouse.warehouseLocation.state}` : null}</p>
                    </td>
                    <td className="p-3 ">
                    <button onClick={() => deleteManager(list.mgrId)} className="my-2 bg-red-700 text-white transition duration-150 ease-in-out rounded hover:bg-red-600 px-6 py-2 text-xs">Delete</button>
                    </td>
                  </tr>
                ))
              }

            </tbody>
          </table>
          {
            data?.length === 0 && (
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