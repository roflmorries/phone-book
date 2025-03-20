import React from 'react'
export default function ContactList({contacts, onEdit, onDelete}) {

    console.log(contacts);
  return (
    <div>
        {contacts.map(contact => (
            <div key={contact.id}>
                <div>
                    <p>Name: {contact.name}</p>
                    <p>Login: {contact.username}</p>
                    <p>Phone: {contact.phone}</p>
                </div>
                <div>
                    <button onClick={() => onEdit(contact.id)}>Edit</button>
                    <button onClick={() => onDelete(contact.id)}>Delete</button>
                </div>
            </div>
        ))}
    </div>
  )
}
