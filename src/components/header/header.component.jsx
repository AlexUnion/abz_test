import React from 'react';

import s from './header.module.scss';

function Header() {
    return (
        <div className={`${s.container} blockContainer`}>
            <div className={s.contentContainer}>
                <div className={`${s.title} heading1 ${s.contentItem}`}>
                    test assignment for frontend developer position
                </div>
                <div className={`${s.contentItem} paragraph}`}>
                    We kindly remind you that your test assignment should be submitted
                    as a link to github/bitbucket repository. Please be patient, we consider
                    and respond to every application that meets minimum requirements.
                    We look forward to your submission. Good luck! The photo has to scale
                    in the banner area on the different screens
                </div>
                <div role='button' tabIndex='1' className={`${s.btn} ${s.contentItem} btn`}>
                    Sing up now
                </div>
            </div>
        </div>
    )
}

export default Header;
