/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, XMarkIcon, InboxIcon } from '@heroicons/react/24/outline'
import { PropType as DataType } from '../components/ShowRequests'

type NewWarehouseType =  {
  totalCapacity: string,
  availableCapacity: string,
}

type PropType = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  data: DataType | null
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function RequestDetailsModal({ open, setOpen, data}: PropType) {

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div> */}
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Request Details
                    </Dialog.Title>
                    {/* <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of your data will be permanently removed
                        from our servers forever. This action cannot be undone.
                      </p>
                    </div> */}

                <section aria-labelledby="applicant-information-title">
                <div className="bg-indigo-200 shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                      Requested Space : {data?.requiredSpace}
                    </h2>
                  </div>
                </div>
                </section>
                  
            
            {/* Requesting User */}
            {
              data && data.requestingUser && (
                <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                      Requesting User Info
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">User Info</p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                        <dd className="mt-1 text-sm text-gray-900">{data?.requestingUser?.userName}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900">{data?.requestingUser?.email}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">User Role</dt>
                        <dd className="mt-1 text-sm text-gray-900">{data?.requestingUser?.userRole}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Phone</dt>
                        <dd className="mt-1 text-sm text-gray-900">{data?.requestingUser?.mobileNo}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                </section>
              )
            }

            {/* Warehouse Details */}
            {
                  data && data.warehouse && (
                    <section aria-labelledby="applicant-information-title">
                    <div className="bg-white shadow sm:rounded-lg">
                      <div className="px-4 py-5 sm:px-6">
                        <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                          Warehouse Details
                        </h2>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Warehouse and Manager details.</p>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Warehouse Id</dt>
                            <dd className="mt-1 text-sm text-gray-900">{data?.warehouse?.warehouseId}</dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Capacity</dt>
                            <dd className="mt-1 text-sm text-gray-900">{`${data?.warehouse?.availableCapacity} / ${data?.warehouse?.totalCapacity}`}</dd>
                          </div>
    
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Warehouse Manager Name</dt>
                            <dd className="mt-1 text-sm text-gray-900">{data?.warehouse?.manager.mgrName}</dd>
                          </div>
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Warehouse Manager Email</dt>
                            <dd className="mt-1 text-sm text-gray-900">{data?.warehouse?.manager.mgrEmail}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                    </section>
                  )
            }

            {/* Requested Items */}
            {
              data && data.warehouse && data.warehouse.requestItems && (
                <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3">
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                  <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                    Requested Products
                  </h2>
  
                  {/* Activity Feed */}
                  <div className="mt-6 flow-root">
                    <ul role="list" className="-mb-8">
                      {data?.warehouse?.requestItems?.map((item, itemIdx) => (
                        <li key={item.itemId}>
                          <div className="relative pb-8">
                            {/* {itemIdx !== timeline.length - 1 ? (
                              <span
                                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              />
                            ) : null} */}
                            <div className="relative flex space-x-3">
                              <div>
                                <span
                                  className={classNames(
                                    true,
                                    'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                  )}
                                >
                                  <InboxIcon className="h-5 w-5 text-gray-700" aria-hidden="true" />
                                </span>
                              </div>
                              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                <div>
                                  <span className=" font-medium text-gray-900">
                                    {item.requstedProduct.productName}{` `}
                                  </span>
                                  <span className="text-sm font-small text-gray-500 ">
                                      {item.requstedProduct.productCategory.categoryName}
                                    </span>
                                </div>
                                <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                  {item.quantity}
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
              )
            }




            </div>


                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                  {/* <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
