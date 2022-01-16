import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Img from './photo';
import {CircularProgress} from '@mui/material';
import './string.ts';
import './style/main.scss';
import {yellow} from '@mui/material/colors';

import {apikey} from './APIKEY';

const App = (): JSX.Element => {
    const [DataArr, setDataArr] = useState<Object[]>([]);
    let [progress, setprogress] = useState(0);
    const daysback = 9;
    const end: Date = new Date();
    const start: Date = new Date();
    start.setDate(end.getDate() - daysback);
    let loop = new Date(start);
    let [error, seterror] = useState();
    useEffect(() => {
        const getdata = async () => {
            const pro = [];

            while (loop <= end) {
                const m = loop.getMonth() + 1;
                const y = loop.getFullYear();
                const d = loop.getDate();

                const p = Axios.get(
                    `https://api.nasa.gov/planetary/apod?api_key=${apikey}&date=${y}-${m}-${d}`
                ).then((x) => {
                    setprogress(progress++);
                    return x;
                });
                pro.push(p);
                loop = new Date(loop.setDate(loop.getDate() + 1));
            }
            try {
                const data = await Promise.all(pro);
                setDataArr(data.map((e) => e.data));
            } catch (err: any) {
                seterror(err);
            }
        };
        getdata();
    }, []);

    if (DataArr.length != 0) {
        const pics = DataArr.filter((e) => {
            return (e as any).hdurl != undefined;
        })
            .map((e) => {
                const d = new Date((e as any).date);
                let obj1 = {
                    date: d,
                    explanation: (e as any).explanation,
                    hdurl: (e as any).hdurl,
                    title: (e as any).title,
                };

                return obj1;
            })
            .sort((a, b) => b.date.getTime() - a.date.getTime())

            .map((e, key) => {
                return (
                    <Img
                        key={key}
                        id={key}
                        date={(e as any).date}
                        title={(e as any).title}
                        hdurl={(e as any).hdurl}
                        explanation={(e as any).explanation}
                    />
                );
            });

        return (
            <div id="loaded">
                <div
                    className="title"
                    id="head"
                    style={{
                        position: 'sticky',
                        top: 0,
                        backgroundColor: `rgba(38, 38, 38,0.75)`,
                        paddingBottom: 13,
                    }}
                >
                    <h1>S P A C E S T A G R A M</h1>
                    <h4>
                        {"Based on NASA's astronomy photo of the day".UppercaseAllWord()}
                    </h4>
                </div>
                <div id="wrapper">{pics}</div>
            </div>
        );
    } else {
        if (!error)
            return (
                <div
                    id="uloaded"
                    style={{
                        color: yellow[500],
                        textAlign: 'center',
                        marginTop: '50vh',
                    }}
                >
                    <h1 className="title">S P A C E S T A G R A M</h1>
                    <h1>lets go to space! Alons-y! </h1>
                    <h2> {Math.round((progress / daysback) * 100)}%</h2>

                    <CircularProgress
                        sx={{color: yellow[500]}}
                        variant="determinate"
                        value={(progress / daysback) * 100}
                    />
                </div>
            );
        else {
            return (
                <>
                    <h1 className="title">S P A C E S T A G R A M</h1>
                    <h2
                        style={{
                            textAlign: 'center',
                            background: 'red',
                            padding: 20,
                        }}
                    >
                        ERROR
                    </h2>
                </>
            );
        }
    }
};

const r = document.getElementById('root');
ReactDOM.render(<App />, r);
