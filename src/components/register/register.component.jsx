import React, { useState, useEffect } from 'react';
import s from './register.module.scss';
import RegisterItem from "../registerFormItem/registerFormItem.component";

const POST_USER_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/users';
const GET_TOKEN_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/token';
const GET_POSITIONS_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/positions';

const registerItem = [
    {
        id: 0,
        title: 'Name',
        name: 'name',
        hint: 'Your name',
    },
    {
        id: 1,
        title: 'Email',
        name: 'email',
        hint: 'Your email',
    },
    {
        id: 2,
        title: 'Phone number',
        name: 'phone',
        hint: '+380 XX XXX XX XX',
        type: "tel",
        additionalHint: "Enter phone number in international format"
    }
]

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

function validateImg({ size, width, height }) {
    return size < 5000000 && width > 70 && height > 70;
}

async function handleSubmit(e, data) {

    e.preventDefault();

    const { name, email, phone, positionId, picture } = data;

    if (!name || !email || !phone || !positionId) return;

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('position_id', positionId);
    formData.append('photo', picture.file);

    const token = await getToken();

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
        positionId: '',
        picture: {
            file: null,
            width: 0,
            height: 0,
        }
    })

    const [positions, setPositions] = useState([]);

    useEffect(() => {
        fetch(GET_POSITIONS_URL)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setPositions(data.positions);
            });
    }, []);

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

    function handleRadioBtn (event) {
        setUserData({
            ...userData,
            positionId: event.target.value,
        })
    }

    return (
        <div className={`${s.container} blockContainer`}>
            <div className="heading1 title">Register to get a work</div>
            <div className={`${s.attention} paragraph`}>
                Attention! After successful registration and alert, update the list of users in the block from the top
            </div>
            <form action="" className={s.form}
                  onSubmit={(e) => (
                      handleSubmit(e, userData))}>
                {registerItem.map(({id, name, title, hint, type, additionalHint }) => (
                    <RegisterItem key={id} onBlur={handleBlur}
                                  title={title} name={name}
                                  hint={hint} type={type}
                                  additionalHint={additionalHint}/>
                ))}

                <div className={s.position}>

                    <p>Select your position</p>
                    { positions.length ?
                        positions.map(({ id, name }) => (
                            <p key={id}>
                                <input type="radio" name="position" value={id}
                                       onClick={handleRadioBtn}/>
                                      {name}
                            </p>
                        )) :
                        <p>Loading positions</p>
                    }

                </div>
                <div className={s.photo}>
                    <p>Photo</p>
                    <div className={s.fileUpload}>
                        <div className={s.inner}>
                            {
                                userData.picture.file ?
                                userData.picture.file.name :
                                'Upload your photo'
                            }
                        </div>
                        <button className={s.inner}>Browse</button>
                        <input type="file" ref={ref} onChange={
                            function(e) {
                                const url = window.url || window.webkitURL;
                                const file = e.target.files[0];

                                const img = new Image();
                                img.onload = function () {
                                    const { width, height } = this;
                                    if (validateImg({ size: file.size, width, height })) {
                                        setUserData({
                                            ...userData,
                                            picture: {
                                                file,
                                                width: +width,
                                                height: +height,
                                            }
                                        });
                                    } else {
                                        console.log('Error: file');
                                    }
                                }
                                img.src = url.createObjectURL(file);
                            }}/>
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
