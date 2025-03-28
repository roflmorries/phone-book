import { useEffect, useState } from 'react'
import './App.css'
import ContactList from '../ContactList/ContactList'
import ContactForm from '../ContactForm/ContactForm'
import { BrowserRouter, useRoutes, Link, Outlet, useNavigate } from 'react-router'

function App() {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null)
  const navigate = useNavigate();

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
    return updatedContacts;
  });

  setEditContact(null);
  navigate("/list");
  };

  const handleEditForm = id => {
    const contactToEdit = contacts.find((c) => c.id === id)
    setEditContact(contactToEdit);
    navigate('/edit')
  }

  const handleDeleteForm = id => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  }

  const handleFormCancel = () => {
    navigate('/list')
    setEditContact(null)
  }


  const ElementRouter = () => useRoutes([
    {
      path: '/',
      element: (
        <>
        <nav className='page__nav'>
          <Link to="/list" className='nav__button'>List</Link>
          <Link to="/add" className='nav__button'>Add</Link>
        </nav>
        <Outlet/>
        </>
        
      ),
      children: [
        {
          path: 'list',
          element: <ContactList contacts={contacts} onEdit={handleEditForm} onDelete={handleDeleteForm}></ContactList>,
        },
        {
          path: 'add',
          element: <ContactForm onSave={handleSaveForm} onCancel={handleFormCancel} editContact={editContact}></ContactForm>,
        },
        {
          path: 'edit',
          element: <ContactForm onSave={handleSaveForm} onCancel={handleFormCancel} editContact={editContact}></ContactForm>,
        },
      ]
    }
  ])


  return (
      <ElementRouter />
  )
}

export default App
