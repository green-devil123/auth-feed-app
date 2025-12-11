import React from 'react'
import { AuthForm } from '../components/AuthForm'

const SignInPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="bg-gray-200 p-2 pb-5 rounded-2xl shadow-soft">
          <AuthForm mode="signin" />
        </div>
      </div>
    </div>
  )
}

export default SignInPage
