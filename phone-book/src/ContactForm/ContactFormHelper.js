export const handleNameChange = (event, setName, setError) => {
    const { value } = event.target;
    const nameValidation = /^[A-Za-zА-Яа-яЁё ]{0,24}$/;
    if (!nameValidation.test(value)) {
        setError('Имя должно начинаться с большой буквы и содержать не более 24 символов!');
    } else {
        setError('');
        setName(value);
    }
};

export const handleLoginChange = (event, setUserName, setError) => {
    const { value } = event.target;
    const loginValidation = /^[A-Za-z0-9]{0,12}$/;
    if (!loginValidation.test(value)) {
        setError('Логин должен содержать цифры и латинские символы (не больше 12 единиц!)');
    } else {
        setError('');
        setUserName(value);
    }
};

export const formatPhoneNumber = (value) => {
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

export const handlePhoneChange = (event, setPhone) => {
    setPhone(formatPhoneNumber(event.target.value));
};