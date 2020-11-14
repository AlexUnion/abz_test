import React from 'react';
import s from './navbarItem.module.scss';

function NavBarItem({ title }) {
    return (
        <div role='button'
             tabIndex='0'
             className={s.btn}>
            {title}
        </div>
    )
}

export default NavBarItem;
