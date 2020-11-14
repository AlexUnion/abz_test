import React from 'react';
import s from './acquainted.module.scss';

import {ReactComponent as Icon} from "../../assets/man-laptop-v1.svg";

function Acquainted() {
    return (
        <div className={`${s.container} blockContainer`}>
            <div className={s.contentContainer}>
                <div className={`${s.title} heading1`}>
                    Let's get acquainted
                </div>
                <div className={s.content}>
                    <Icon className={s.iconContainer}/>
                    <div className={`${s.about} paragraph`}>
                        <p className="heading2">I am cool frontend developer</p>
                        <p>
                            We will evaluate how clean your approach to writing CSS and Javascript code is. You can use any CSS and Javascript 3rd party libraries without any restriction.
                        </p>
                        <p>
                            If 3rd party css/javascript libraries are added to the project via bower/npm/yarn you will get bonus points. If you use any task runner (gulp/webpack) you will get bonus points as well. Slice service directory page P​SD mockup​ into HTML5/CSS3.
                        </p>
                        <div role='button'
                             tabIndex='2'
                             className={`${s.btn} btn`}>Sing up now</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Acquainted;
