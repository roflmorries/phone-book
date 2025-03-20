import { useState } from 'react'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('list');


  return (
    <>
      <button onClick={() => {setCurrentPage('list')}}>List</button>
      <button onClick={() => {setCurrentPage('add')}}>Add</button>
    </>
  )
}

export default App
