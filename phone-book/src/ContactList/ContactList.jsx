import React from 'react'
import './ContactList.css'
import { Button, Popconfirm } from 'antd';

export default function ContactList({contacts, onEdit, onDelete}) {

    console.log(contacts);

  return (
    <div className='contacts__wrapper'>
        {contacts.map(contact => (
            <div key={contact.id} className='contacts__container'>
                <div className='contact__block'>
                    <p>Name: {contact.name}</p>
                    <p>Login: {contact.username}</p>
                    <p>Phone: {contact.phone}</p>
                </div>
                <div className='buttons__block'>
                    <button className='edit__button' onClick={() => onEdit(contact.id)}>Edit</button>
                    <Popconfirm
                        title="Delete the contact"
                        description="Are you sure you want to delete this contact?"
                        onConfirm={() => onDelete(contact.id)}
                        okText="Yes"
                        cancelText="No"
                        
                        >
                        <Button className='delete__button' danger>Delete</Button>
                    </Popconfirm>
                </div>
            </div>
        ))}
    </div>
  )
}
