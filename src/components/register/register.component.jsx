import React, { useState, useEffect } from 'react';
import s from './register.module.scss';
import RegisterItem from "../registerFormItem/registerFormItem.component";

function validateEmail(email) {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    return re.test(email);
}

function validateName(name) {
    const length = name.length;
    return length > 2 && length < 60;
}

function validatePhone(phone) {
    const number = phone.trim();
    const idx = number.indexOf('+380', 0);
    return idx === 0;
}

function handleSubmit(e) {
    e.preventDefault();
}

function Register({ updateUsers, updateValue }) {

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
    })

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    function handleBlur({ target }) {
        const { value, name } = target;

        switch (name) {
            case 'name':
                if (validateName(value)) {
                    setUserData({
                        ...userData,
                        name: value
                    })
                } else {
                    console.log('Error: ' + value);
                }
                break;
            case 'email':
                if (validateEmail(value)) {
                    setUserData({
                        ...userData,
                        email: value
                    })
                } else {
                    console.log('Error: ' + value);
                }
                break;
            case 'phone':
                if (validatePhone(value)) {
                    setUserData({
                        ...userData,
                        phone: value.trim()
                    })
                } else {
                    console.log('Error: ' + value);
                }
                break;
            default:
                return;
        }
    }

    return (
        <div className={`${s.container} blockContainer`}>
            <div className="heading1 title">Register to get a work</div>
            <div className={`${s.attention} paragraph`}>
                Attention! After successful registration and alert, update the list of users in the block from the top
            </div>
            <form action="" className={s.form} onSubmit={handleSubmit}>
                <RegisterItem onBlur={handleBlur}
                              title="Name"
                              name="name" hint="Your name"/>
                <RegisterItem onBlur={handleBlur}
                              title="Email"
                              name="email" hint="Your email"/>
                <RegisterItem onBlur={handleBlur}
                              title="Phone number"
                              name="phone" hint="+380 XX XXX XX XX"
                              type="tel" additionalHint="Enter phone number in international format"/>
                <div className={s.position}>
                    <p>Select your position</p>
                    <p><input type="radio" name="position"
                              value="Frontend Developer"/>Frontend Developer</p>
                    <p><input type="radio" name="position"
                              value="Backend Developer"/>Backend Developer</p>
                    <p><input type="radio" name="position"
                              value="Designer"/>Designer</p>
                    <p><input type="radio" name="position"
                              value="QA"/>QA</p>
                </div>
                <div className={s.photo}>
                    <p>Photo</p>
                    <div className={s.fileUpload}>
                        <div className={s.inner}>Upload your photo</div>
                        <button className={s.inner}>Browse</button>
                        <input type="file"/>
                    </div>
                </div>
                <div className={s.btnContainer}>
                    <button className={`${s.btn} paragraph`}
                            //onClick={() => updateUsers(!updateValue)}
                            type="submit">Sing up now</button>
                </div>
            </form>
        </div>
    )
}

export default Register;
