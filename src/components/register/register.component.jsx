import React from 'react';
import s from './register.module.scss';
import RegisterItem from "../registerFormItem/registerFormItem.component";

function Register({ updateUsers, updateValue }) {
    return (
        <div className={`${s.container} blockContainer`}>
            <div className="heading1 title">Register to get a work</div>
            <div className={`${s.attention} paragraph`}>
                Attention! After successful registration and alert, update the list of users in the block from the top
            </div>
            <form action="" className={s.form}>
                <RegisterItem title={'Name'} hint={'Your name'}/>
                <RegisterItem title={'Email'} hint={'Your email'}/>
                <RegisterItem title={'Phone number'} hint={'+380 XX XXX XX XX'}
                              type="tel" additionalHint={'Enter phone number in international format'}/>
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
                    <input type="file"/>
                </div>
                <div className={s.btnContainer}>
                    <button className={`${s.btn} paragraph`}
                            onClick={() => updateUsers(!updateValue)}
                            type="button">Sing up now</button>
                </div>
            </form>
        </div>
    )
}

export default Register;
