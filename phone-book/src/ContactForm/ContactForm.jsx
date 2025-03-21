import React, { useEffect } from 'react'
import { useState } from 'react'
import './ContactForm.css'

export default function ContactForm({onSave, onCancel, editContact}) {
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (editContact) {
            setName(editContact.name);
            setUserName(editContact.username);
            setPhone(editContact.phone)
        }
    }, [editContact])


    const handleNameChange = event => {
        const { value } = event.target;
        const nameValidation = /^[A-Za-zА-Яа-яЁё ]{0,24}$/;
        if (!nameValidation.test(value)) {
            setError('Имя должно начинаться с большой буквы и содержать не более 24 символов!')
        } else {
            setError('');
            setName(value);
        }
    }

    const handleLoginChange = event => {
        const { value } = event.target;
        const loginValidation = /^[A-Za-z0-9]{0,12}$/
        if (!loginValidation.test(value)) {
            setError('Логин должен содержать цифры и латинские символы (не больше 12 единиц!)')
        } else {
            setError('');
            setUserName(value)
        }
    }

    const formatPhoneNumber = (value) => {
        const cleaned = value.replace(/\D/g, "").slice(0, 12);
        if (cleaned.length >= 2) {
          let formatted = `+${cleaned.slice(0, 2)}`;
          if (cleaned.length > 2) formatted += ` (${cleaned.slice(2, 5)})`;
          if (cleaned.length > 5) formatted += `-${cleaned.slice(5, 7)}`;
          if (cleaned.length > 7) formatted += `-${cleaned.slice(7, 10)}`;
          if (cleaned.length > 10) formatted += `-${cleaned.slice(10, 12)}`;
          return formatted;
        }
        return cleaned;
      };

    const handlePhoneChange = (e) => {
        setPhone(formatPhoneNumber(e.target.value));
      };


    const handleSubmit = event => {
        event.preventDefault();
        const newContact = {
            id: editContact?.id,
            name,
            username,
            phone
        }
        onSave(newContact)
    }

  return (
    <form onSubmit={handleSubmit} className='form__container'>
        <span className='form__error'>{error}</span>
        <label>Name:</label>
        <input type="text" value={name} onChange={handleNameChange} placeholder='Enter your name'/>

        <label>Login:</label>
        <input type="text" value={username} onChange={handleLoginChange} placeholder='Enter your login'/>

        <label>Phone number:</label>
        <input type="text" value={phone} onChange={handlePhoneChange} placeholder="+38(0XX)XX-XXX-XX"/>

        <div className='form__buttons_container'>
            <button className='save__form__button' type='submit'>Save</button>
            <button className='cancel__form__button' type='button' onClick={onCancel}>Cancel</button>
        </div>
    </form>
  )
}
