// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  const newArr = [1,2,3,4,5]
  return (
    <>
      <h1 className='text-3xl bg-green-500 p-5'>Vite with tailwind</h1>
      <Card username='newnew' myArr={newArr}/>
      <Card/>
    </>
  )
}

export default App
