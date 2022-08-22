import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js';
import { TransformData } from '../../Utils/TransformData';

export default function ComparisoBetweenMultipleData() {


    const [season, setSeason] = useState([]);
    const [seasonValue, setSeasonValue] = useState("");
    const [info, setInfo] = useState([])//holds all inforamtion of graph
    const [chart, setChart] = useState([]);


    //get all data by posting season
    const onChangeHandler = async (e) => {
        try {
            e.preventDefault();
            setSeasonValue(e.target.value);
            const body = {
                session: e.target.value.toLowerCase()
            }
            // console.log(body)
            const response = await axios.post(`http://localhost:3030/airData/get/daily/basis/session`, body, { withCredentials: true })
            console.log(response.data);
            const result = response.data;
            const { message, airData, status } = result;
            if (status === 202) {
                const a = TransformData(airData)
                setInfo(a);
            }

            else {
                console.log("there is an error");

            }

        }
        catch (error) {
            console.log(error);

        }
    }
    const getAllSeason = async () => {
        try {
            const result = await axios.get(`http://localhost:3030/airData/get/available/session`, { withCredentials: true });
            const data = result.data.sessions;
            // console.log(data);
            setSeason(data);

        }
        catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getAllSeason();

    }, [])


    //log to info 
    // console.log("info is", info);

    // info.map((i) => console.log("all info ", i.x.map((x) => x)));


    return (
        <div className='container m-5'>
            <h3 className='text-dark text-decoration-underline text-center mb-5'>A comparison between multiple data sources  using line charts,
                scatterplots, and boxplots,</h3>
            <div className='col-md-3'>
                <select
                    className="form-select"
                    onChange={onChangeHandler}
                    aria-label="Default select example">
                    <option value="">select season</option>
                    {season.map((s) =>
                        <option
                            key={s.sessions}
                            value={s.sessions}
                        >{s.sessions}</option>)}
                </select>
            </div>
            {/* graph  */}
            <div className='col-md-12 mt-5'>
                <Plot
                    data={info}
                    layout={{ width: 1000, height: 500, title: 'A comparison between multiple data sources using line charts, scatterplots, and boxplots' }}
                />
            </div>
        </div >
    )
}
