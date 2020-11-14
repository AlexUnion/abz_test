import React, { useState, useEffect } from 'react';
import s from './usersList.module.scss';
import Loader from "../loader/loader.component";
import UserItem from "../userListItem/userListItem.component";

const URL = {
    url: 'https://frontend-test-assignment-api.abz.agency/api/v1/users?',
    currentPage: 1,
    count: 6,
}

function getUsers() {
    const url = `${URL.url}page=${URL.currentPage++}&count=${URL.count}`;
    const data = fetch(url)
        .then((data) => data.json());
    return data;
}

function UsersList({ needUpdateUsers }) {
    const [users, setUsers] = useState([]);
    const [isDisplay, setDisplay] = useState(true);

    const displayStyle = {
        visibility: isDisplay ? 'visible' : 'hidden'
    }

    useEffect(() => {
        const url = `${URL.url}page=1&count=${URL.count}`;
        fetch(url)
            .then((data) => data.json())
            .then((body) => {
                URL['totalPages'] = body.total_pages;
                URL.currentPage = 2;
                setUsers([...body.users]);
            });
    }, [needUpdateUsers]);

    useEffect(() => {
        if (URL.currentPage > URL.totalPages) {
            setDisplay(false);
        }
    }, [users]);

    return (
        <div className={`${s.container} blockContainer`}>
            <div className={s.contentContainer}>
                <div className="title heading1">
                    Our cheerful users
                </div>
                <div className={`${s.attention} paragraph`}>
                    Attention! Sorting users by registration date
                </div>
                <div className={s.users}>
                    { users.length ?
                        users.map(({id, name, email, phone,
                                       photo, position}) => (
                            <UserItem key={id} photo={photo}
                                      name={name} email={email}
                                      phone={phone} position={position}/>
                        )) :
                        <Loader/> }
                </div>
                <button className={`${s.btn} paragraph`}
                        onClick={() => {
                            getUsers().then((data) => setUsers([...users, ...data.users]));
                        }}
                        style={displayStyle}>Show more</button>
            </div>
        </div>
    )
}

export default UsersList;
