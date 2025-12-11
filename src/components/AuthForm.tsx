import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const AuthForm: React.FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const { login, closeAuthModal, isAuthModalOpen } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState(mode);
  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [authMode]);

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    // fake validation
    if (!email || !password) {
      alert('Enter email and password (frontend only)')
      return
    }
    login(email.split('@')[0] || 'You')
    closeAuthModal();
    navigate(`/`)
  }

  function checkRouteOrModel(input: 'signin' | 'signup'){
    if(isAuthModalOpen){
      setAuthMode(input)
    }else{
      setAuthMode(input)
    }
    navigate(`/${input}`)
  }

  return (
    <>
        <div className='bg-white rounded-2xl p-[25px]'>
            <div className="flex flex-col items-center mb-[2.75rem]">
                <div className="w-10 h-10  flex items-center justify-center bg-gray-200 rounded-full">
                  <svg
                    className="w-4 h-4 text-sm"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">{authMode === 'signin' ? 'Sign in to continue' : 'Create an account to continue'}</h3>
                <span className="text-xs text-gray-400">{authMode === 'signin' ? 'Sign in to access all the features on this app' : 'Create an account to access all the features on this app'}</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 mb-[1rem]" autoComplete="off">
                <div>
                <label className="block text-xs font-medium mb-1">Email or username</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand" placeholder="Enter your email or username" />
                </div>
                <div>
                <label className="block text-xs font-medium mb-1">Password</label>
                <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand" placeholder="Enter your password" />
                </div>
                {authMode === 'signup' && (
                  <div>
                      <label className="block text-xs font-medium mb-1">Repeat password</label>
                      <input type="password" className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-brand" placeholder="Enter your password again" />
                  </div>
                )}
                <button type="submit" className="w-full py-2 rounded-lg bg-brand text-white font-medium"> {authMode === 'signin' ? 'Sign In' : 'Sign Up'} </button>
            </form>
        </div>
        <div className="text-xs text-center text-gray-500 mt-3">
            {authMode === 'signin' ? (
            <span>Do not have an account? <button className="text-brand underline" onClick={()=>checkRouteOrModel('signup')}>Sign Up</button></span>
            ) : (
            <span>Already have an account? <button className="text-brand underline" onClick={()=>checkRouteOrModel('signin')}>Sign In</button></span>
            )}
        </div>
    </>
  )
}
