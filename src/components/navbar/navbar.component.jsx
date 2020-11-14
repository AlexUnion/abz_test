import React from 'react';
import s from './navbar.module.scss';
import NavBarItem from "../navbarItem/navbarItem.component";

const COMPANY = 'TESTTASK';

const navBarButtons = ['About Me', 'Relationships', 'Requirements', 'Users', 'Sing Up'];

function NavBar() {
    return (
        <div className={`${s.container} paragraph`}>
            <div className={s.title}>{COMPANY}</div>
            <div className={s.buttons}>
                {navBarButtons.map((item, index) => (
                    <NavBarItem title={item} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default NavBar;
