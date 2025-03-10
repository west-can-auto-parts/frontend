"use client"

import React, { useCallback, useState, useEffect } from 'react'
import { BeatLoader } from 'react-spinners'
import { newVerification } from '../../../actions/new-verification'
import { useRouter, useSearchParams } from 'next/navigation'

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const searchParams = useSearchParams()
  const router = useRouter()
  // Fallback token for testing
  const token = searchParams.get('token') || 'test-token'

  const onSubmit = useCallback(() => {
    // Avoid multiple requests if already successful or there's an error
    if (success || error) return

    if (!token || token === 'test-token') {
      setError('Missing or Invalid Token')
      return
    }

    newVerification(token)
      .then((data) => {
        if (data?.success) {
          setSuccess(data.success)
          setError(undefined) // Clear error if successful
          console.log('Verification successful:', data.success)
        } else if (data?.error) {
          setError(data.error)
          setSuccess(undefined) // Clear success if there's an error
          console.log('Verification error:', data.error)
        }
      })
      .catch((err) => {
        setError('Something went wrong')
        setSuccess(undefined)
        console.error('Verification catch error:', err)
      })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Show loader while processing */}
      {!success && !error && <BeatLoader />}
      
      {/* Show success message */}
      {/* {success && <p className="text-green-600">{success}</p>} */}

      {/* Show error message */}
      {/* {error && <p className="text-red-600">{error}</p>} */}
      <p className="text-2xl font-bold">
          You've successfully registered!
      </p>
      <button className='rounded-md mt-4 text-sm bg-[#b91b29] text-white px-2 py-1' onClick={()=>router.push('/profile')}>Go To Profile Page</button>
    </div>
  )
}

export default NewVerificationForm
