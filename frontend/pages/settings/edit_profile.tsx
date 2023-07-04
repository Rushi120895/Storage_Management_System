import { useAuthContext } from "../../hooks/useAuthContext"

export default function Settings(){

  const {user} = useAuthContext()

  return (
    <>
     
     <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Edit Profile</h1>
     </div>

     <div>
     <section aria-labelledby="applicant-information-title">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
              User Info
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">User Details</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">User Id</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.userId}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.userName}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">User Role</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.userRole}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.mobileNo}</dd>
              </div>
            </dl>
          </div>

          <div className="px-4 py-5 sm:px-6">
          <button onClick={() => console.log()} className="my-2 bg-indigo-700 text-white transition duration-150 ease-in-out rounded hover:bg-indigo-600 px-6 py-2 text-xs">Update</button>
          <button onClick={() => console.log()} className="m-2 bg-red-700 text-white transition duration-150 ease-in-out rounded hover:bg-red-600 px-6 py-2 text-xs">Delete User</button>
          </div>
        </div>
        </section>

        <section aria-labelledby="applicant-information-title">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
              User Location
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">User Address Details</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Line 1</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.userLocation.line1}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Line 2</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.userLocation.line2}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">City</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.userLocation.city}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Pincode</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.userLocation.pincode}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">State</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.userLocation.state}</dd>
              </div>
            </dl>
          </div>

          <div className="px-4 py-5 sm:px-6">
          <button onClick={() => console.log()} className="my-2 bg-indigo-700 text-white transition duration-150 ease-in-out rounded hover:bg-indigo-600 px-6 py-2 text-xs">Update</button>
          </div>
        </div>
        </section>
     </div>
    </>
  )
}