import React from 'react'
import { useState } from 'react'

export default function ContactForm(onSave, onCancel) {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [number, setNumber] = useState('');
    const [error, setError] = useState(false);


    const handleNameChange = event => {
        const { value } = event.target;
        const nameValidation = /^[A-ZА-Я][a-zа-я]{0,11}$/;
        if (!nameValidation.test(value)) {
            setError('Уппс.. Имя должно начинаться с большой буквы и содержать не более 12 символов!')
        } else {
            setError('');
            setName(value);
        }
    }

    const handleLoginChange = event => {
        const { value } = event.target;
        const loginValidation = /^[A-Za-z]{0,9}$/
        if (!loginValidation.test(value)) {
            setError('Упс.. Логин должен содержать только латинские символы и не больше 10 единиц!')
        } else {
            setError('');
            setLogin(value)
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
        setNumber(formatPhoneNumber(e.target.value));
      };


    const handleSubmit = event => {
        // onSave
    }

  return (
    <form onSubmit={handleSubmit}>
        <span className='form__error'>{error}</span>
        <label>Name:</label>
        <input type="text" value={name} onChange={handleNameChange} placeholder='Enter your name'/>

        <label>Login:</label>
        <input type="text" value={login} onChange={handleLoginChange} placeholder='Enter your login'/>

        <label>Phone number:</label>
        <input type="text" value={number} onChange={handlePhoneChange} placeholder="+38(0XX)XX-XXX-XX"/>

        <div>
            <button type='submit'>Save</button>
            <button type='button' onClick={onCancel}>Cancel</button>
        </div>
    </form>
  )
}
