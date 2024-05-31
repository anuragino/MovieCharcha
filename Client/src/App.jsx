import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

// import compontents
import Register from './Pages/register'
import Login from './Pages/login'
import Track  from './component/track'
import { authContext } from './contexts/authContext'
import Private from './component/Private'
import Home from './Pages/home'
import NotFound from './Pages/notFound'
import Description from './component/description'


function App() {

  const [loggedUser,setLoggedUser] = useState(JSON.parse(localStorage.getItem("moviecharcha-user")));


  return (
    <>
      <authContext.Provider  value={{loggedUser,setLoggedUser}}>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Private Compontent={Home}/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/home' element={<Private Compontent={Home}/>}/>
            <Route path='/track' element={<Private Compontent={Track}/>}/>
            <Route path='/description/:imdbID' element={<Private Compontent={Description}/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </authContext.Provider>
      
    </>
  )
}

export default App
