import React, { useEffect, useState } from 'react';
import './ContactForm.css';
import { handleNameChange, handleLoginChange, handlePhoneChange } from './ContactFormHelper';

export default function ContactForm({ onSave, onCancel, editContact }) {
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (editContact) {
            setName(editContact.name);
            setUserName(editContact.username);
            setPhone(editContact.phone);
        }
    }, [editContact]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newContact = {
            id: editContact?.id,
            name,
            username,
            phone,
        };
        onSave(newContact);
    };

    return (
        <form onSubmit={handleSubmit} className="form__container">
            <span className="form__error">{error}</span>
            <label>Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e, setName, setError)}
                placeholder="Enter your name"
            />

            <label>Login:</label>
            <input
                type="text"
                value={username}
                onChange={(e) => handleLoginChange(e, setUserName, setError)}
                placeholder="Enter your login"
            />

            <label>Phone number:</label>
            <input
                type="text"
                value={phone}
                onChange={(e) => handlePhoneChange(e, setPhone)}
                placeholder="+38(0XX)XX-XXX-XX"
            />

            <div className="form__buttons_container">
                <button className="save__form__button" type="submit">
                    Save
                </button>
                <button className="cancel__form__button" type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}