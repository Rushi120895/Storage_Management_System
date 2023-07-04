import {useState } from 'react'
import { useNotifyContext } from '../../hooks/useNotifyContext';
import { useSignup } from '../../hooks/user/useSignup';

export default function Signup() {
  const { signup, isLoading: loginLoading, error: loginError} = useSignup()
  const { createNotification } = useNotifyContext()

  const [data, setData] = useState({
    userName: '',
    email: '',
    password: '',
    confirm_password: '',
    userRole: 'CUSTOMER',
    mobileNo: ''
  })

  async function signupHandler(e: any){
   e.preventDefault();
   if(data.password === data.confirm_password){
    const {userName, email, password, userRole, mobileNo} = data

    await signup({ userName, email, password, userRole, mobileNo})
   }else{
     createNotification(false, "Failed", "Password and Confirm Password Not Matched.")
   }
   console.log('signup')
  }
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-6 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">Signup for your account</h2>
          {/* <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              start your 14-day free trial
            </a>
          </p> */}
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-6 px-4 drop-shadow-lg sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={signupHandler}>

            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    value={data.userName}
                    onChange={(e) => setData({...data, userName: e.target.value})}
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    value={data.email}
                    onChange={(e) => setData({...data, email: e.target.value})}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                  Mobile No.
                </label>
                <div className="mt-1">
                  <input
                    id="mobile"
                    value={data.mobileNo}
                    onChange={(e) => setData({...data, mobileNo: e.target.value})}
                    name="mobile"
                    type="mobile"
                    autoComplete="mobile"
                    maxLength={10}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    value={data.password}
                    onChange={(e) => setData({...data, password: e.target.value})}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirm_password"
                    value={data.confirm_password}
                    onChange={(e) => setData({...data, confirm_password: e.target.value})}
                    name="confirm_password"
                    type="password"
                    autoComplete="confirm_password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div> */}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}
