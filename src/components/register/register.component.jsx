import React, { useState, useEffect } from 'react';
import s from './register.module.scss';
import RegisterItem from "../registerFormItem/registerFormItem.component";

const POST_USER_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/users';
const GET_TOKEN_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/token';

async function getToken() {
    const token = await fetch(GET_TOKEN_URL)
        .then((data) => data.json())
        .then(({ token }) => {
            return token;
        });

    return token;
}

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

function validateImg({ size }) {
    return size < 5000000;
}

async function handleSubmit(e, data, file) {

    e.preventDefault();

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('position_id', '1');
    formData.append('photo', file);

    const token = await getToken();
    console.log(token);

    const response = await fetch(POST_USER_URL, {
        method: 'POST',
        body: formData,
        headers: {
            'Token': token
        }
    }).then((res) => res.json())
        .then((data) => {
            return data;
        });
    console.log(response);
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

    const ref = React.createRef();

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
            <form action="" className={s.form}
                  onSubmit={(e) => handleSubmit(e, userData, ref.current.files[0])}>
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
                        <input type="file" ref={ref}/>
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
