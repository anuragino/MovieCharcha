import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

// import compontents
import Register from './Pages/register'
import Login from './Pages/login'
import { authContext } from './contexts/authContext'
import Private from './component/Private'
import Home from './Pages/home'
import NotFound from './Pages/notFound'
import Description from './component/description'
import { FavoritesProvider } from './contexts/FavoritesContext'; 
import WatchList from './Pages/watchlist'


function App() {

  const [loggedUser,setLoggedUser] = useState(JSON.parse(localStorage.getItem("moviecharcha-user")));


  return (
    <>
      <authContext.Provider  value={{loggedUser,setLoggedUser}}>
      <FavoritesProvider> 
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Private Compontent={Home}/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/home' element={<Private Compontent={Home}/>}/>
            <Route path='/watchlist' element={<Private Compontent={WatchList}/>}/>
            <Route path='/description/:imdbID' element={<Private Compontent={Description}/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
        </FavoritesProvider> 
      </authContext.Provider>
      
    </>
  )
}

export default App
