import { useEffect, useState } from 'react'
import './App.css'
import ContactList from '../ContactList/ContactList'
import ContactForm from '../ContactForm/ContactForm'

function App() {
  const [currentPage, setCurrentPage] = useState('list');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const result = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await result.json();
      console.log(data);
      setContacts(data);
    }
    getUser();
  }, [])


  return (
    <>
      {/* <button onClick={() => {setCurrentPage('list')}}>List</button>
      <button onClick={() => {setCurrentPage('add')}}>Add</button>
      <ContactList contacts={contacts}></ContactList> */}
      <ContactForm></ContactForm>
    </>
  )
}

export default App
