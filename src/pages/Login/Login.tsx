import { useState } from 'react'

import { Entry } from '@/components/Entry'
import { LocationView } from '@/components/LocationView'
import { NewLocation } from '@/components/NewLocation'

export const Login = () => {
  const [currentPage, setCurrentPage] = useState('entry')

  return (
    <>
      {currentPage === 'entry' && (
        <Entry onNextPage={() => setCurrentPage('newlocation')} />
      )}
      {currentPage === 'newlocation' && (
        <NewLocation onNextPage={() => setCurrentPage('locationview')} />
      )}
      {currentPage === 'locationview' && (
        <LocationView onNextPage={() => setCurrentPage('moo')} />
      )}
    </>
  )
}

Login.displayName = 'Login'

export default Login
