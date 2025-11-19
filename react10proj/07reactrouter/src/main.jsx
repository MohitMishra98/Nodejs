import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './componenets/Home/Home.jsx'
import About from './componenets/About/About.jsx'
import Contact from './componenets/ContactUs/ContactUs.jsx'
import User from './componenets/User/User.jsx'
import GitHub, { githubInfoLoader } from './componenets/Github/Github.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path='' element={<Home/>} />
      <Route path="about" element={<About/>} />
      <Route path="contact" element={<Contact/>} />
      <Route path="user/:id" element={<User/>} />
      <Route
      loader={githubInfoLoader} 
      path="github" 
      element={<GitHub/>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
