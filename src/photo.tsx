import React, {DOMElement, useState} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {red} from '@mui/material/colors';
import Explain from './explanation';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
interface Props {
    id: number;
    hdurl: string;
    title: string;
    explanation: string;
    date: Date;
}

const Img = (props: Props): JSX.Element => {
    const {id, hdurl, date, explanation, title} = props;
    const [like, setlike] = useState(false);
    // white heart false
    // red heart true
    const size = [30, 150];
    const heartclick = (id: string) => {
        let doc = document.getElementById(id);
        let sec = 30;

        if (!like) {
            let anid = setInterval(frameon, sec);
            let i = size[0];
            function frameon() {
                if (i == size[1]) {
                    clearInterval(anid);
                } else {
                    if (doc) doc.style.fontSize = `${i}px`;
                    i += 10;
                }
            }
        } else {
            let anid = setInterval(frameoff, sec);
            let i = size[1];
            function frameoff() {
                if (i == size[0]) {
                    clearInterval(anid);
                } else {
                    i -= 10;
                    if (doc) doc.style.fontSize = `${i}px`;
                }
            }
        }

        setlike(!like);
    };

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const d: string =
        date.getUTCDate() +
        ' ' +
        monthNames[date.getUTCMonth()] +
        ' ' +
        date.getUTCFullYear();

    return (
        <div
            className="photo"
            id={
                id +
                1 +
                '-' +
                title.substring(0, 6).trim().replace(' ', '-') +
                '-' +
                d
            }
        >
            <div className="img-wrap">
                <img src={hdurl} alt={title} />
            </div>
            <div className="caption-content">
                <Explain txt={explanation} words={15} />
                <p className="date">{d}</p>
                <div style={{textAlign: 'center'}}>
                    <button
                        onClick={() => heartclick('btn' + id)}
                        id={'btn' + id}
                        style={{fontSize: size[0], textAlign: 'center'}}
                    >
                        {!like ? (
                            <FavoriteBorderOutlinedIcon id="whiteheart" />
                        ) : (
                            <FavoriteIcon
                                id="redheart"
                                style={{fillOpacity: 1, fill: red[800]}}
                            />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Img;
