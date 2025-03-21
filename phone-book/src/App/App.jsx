import { useEffect, useState } from 'react'
import './App.css'
import ContactList from '../ContactList/ContactList'
import ContactForm from '../ContactForm/ContactForm'

function App() {
  const [currentPage, setCurrentPage] = useState('');
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const result = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await result.json();
      console.log(data);
      setContacts(data);
    }
    getUser();
  }, []);

  const handleSaveForm = contact => {

  setContacts((prevContacts) => {
    let newContact = contact;

    if (!newContact.id) {
      const maxId = prevContacts.length
        ? Math.max(...prevContacts.map((c) => c.id))
        : 0;
      newContact = { ...newContact, id: maxId + 1 };
    }

    const isEditing = prevContacts.some((c) => c.id === contact.id);
    const updatedContacts = isEditing
      ? prevContacts.map((c) => (c.id === contact.id ? newContact : c))
      : [...prevContacts, newContact];

    console.log("Updated contacts:", updatedContacts);
    return updatedContacts;
  });

  setEditContact(null);
  setCurrentPage("list");
  };

  const handleEditForm = id => {
    const contactToEdit = contacts.find((c) => c.id === id)
    setEditContact(contactToEdit);
    setCurrentPage('add');
  }

  const handleDeleteForm = id => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  }

  const handleFormCancel = () => {
    setCurrentPage('list');
  }



  return (
    <>
      <button onClick={() => {setCurrentPage('list')}}>List</button>
      <button onClick={() => {setCurrentPage('add')}}>Add</button>
      {currentPage === 'list' && (
      <ContactList contacts={contacts} onEdit={handleEditForm} onDelete={handleDeleteForm}></ContactList>
      )}
      {currentPage === 'add' && (
      <ContactForm onSave={handleSaveForm} onCancel={handleFormCancel} editContact={editContact}></ContactForm>
      )}
    </>
  )
}

export default App
