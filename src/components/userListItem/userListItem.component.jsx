import React, { useState } from 'react';

import s from './userListItem.module.scss';

function UserItem({ photo, name, email: realEmail, position, phone }) {
    const [isDisplay, setDisplay] = useState(false);

    const visibleStyle = {
        visibility: isDisplay ? 'visible' : 'hidden',
    }

    let email = realEmail;
    if (realEmail.length > 21) {
        email = realEmail.substr(0, 21) + '...';
    }
    return (
        <div className={s.container}>
            <img src={photo} alt="" className={s.img}/>
            <div className="heading2">{name}</div>
            <div className="paragraph">{position}</div>
            <div className={`${s.emailContainer} paragraph`}
                 onMouseOver={() => {
                     if (isDisplay) return;
                     setDisplay(true);
                 }}
                 onMouseOut={() => {
                     if (!isDisplay) return;
                     setDisplay(false);
                 }}>
                {email}
                <div style={visibleStyle} className={s.emailHint}>{realEmail}</div>
            </div>
            <div className="paragraph">{phone}</div>
        </div>
    );
}

export default UserItem;
