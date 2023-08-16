import 'bootswatch/dist/cosmo/bootstrap.min.css'
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Header } from '@/components/Header'
import { DesignView } from '@/pages/DesignView'
import { Login } from '@/pages/Login'

const App = () => {
  return (
    <div className='app'>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/design-view' element={<DesignView />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
