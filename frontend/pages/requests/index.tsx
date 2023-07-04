import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useGetRequests } from '../../hooks/useGetRequests'
import ShowRequests from '../../components/ShowRequests'

type DocumentType = {
  Key: string
}

const UserDetails = () => {
  const router = useRouter()
  const {getRequests, requests, isRequestsExist} = useGetRequests()
  const [data, setData] = useState<typeof requests | null>(null)

  const tabs = [
    { name: 'All Requests' },
    { name: 'Pending' },
    { name: 'Approved' },
    { name: 'Declined'},
  ]

  // current tab state
  const [activeTab, setActiveTab] = useState(tabs[0])

  // useEffect 
  useEffect(() => {
    getRequests()
  },[])

  useEffect(() => {
    setData(requests)
  },[requests, isRequestsExist])
  
  // classNames function for active and non-active tab
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
  }

  // handler function for selecting other tab
  function onSelectTab(tab: typeof tabs[0]){
    if(tab.name === 'All Requests' && requests){
      setData(requests)
    }
    if(tab.name === 'Pending' && requests){
      const data = requests.filter(value => value.reqStatus === 'PENDING')
      setData(data)
    }
    if(tab.name === 'Approved' && requests){
      const data = requests.filter(value => value.reqStatus === 'APPROVED')
      setData(data)
    }
    if(tab.name === 'Declined' && requests){
      const data = requests.filter(value => value.reqStatus === 'DECLINED')
      setData(data)
    }
    setActiveTab(tab)
  }

  return (
    <>
    <div className="relative border-b border-gray-200 p-5 sm:pb-0">
      <div className="md:flex md:items-center md:justify-between">
        <h3 className="text-2xl font-medium leading-6 text-gray-900">Requests</h3>
        {/* <div className="mt-3 flex md:absolute md:top-3 md:right-0 md:mt-0">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Share
          </button>
          <button
            type="button"
            className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create
          </button>
        </div> */}
      </div>
      <div className="mt-4">
        <div className="sm:hidden">
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <select
            id="current-tab"
            name="current-tab"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            defaultValue={tabs.find((tab) => tab.name === activeTab.name)?.name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                onClick={() => onSelectTab(tab)}
                className={classNames(
                  tab.name === activeTab.name
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-md cursor-pointer'
                )}
                aria-current={tab.name === activeTab.name ? 'page' : undefined}
              >
                {tab.name}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
{
      // activeTab.name === 'All Requests' && (
        <section aria-labelledby="applicant-information-title">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            {/* <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
              Recent Transactions
            </h2> */}
          </div>
          <ShowRequests data={data} />

        </div>
      </section>
      // )
    }



    </>
  )
}

export default UserDetails