import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';

export default function Graph10() {


    const [years, setYears] = useState([]);//state for all available years
    const [selectValue, setSelectValue] = useState({});
    const [chart, setChart] = useState([])//contains the value of charts


    //get all available years
    const getYears = async () => {
        const response = await axios.get(`http://localhost:3030/airData/get/available/published/year/daily`)
        // console.log(response);
        setYears(response.data.years);
    }

    //get the data by posting the start and end year
    const onChangeHandler = (e) => {

        const { name, value } = e.target;
        setSelectValue({ ...selectValue, [name]: value })
        console.log(selectValue);

    }

    //post the data to get the data
    const submitHandler = async (e) => {
        e.preventDefault()
        const res = await axios.post(`http://localhost:3030/airData/get/avg/aqi/by/year`, selectValue, { withCredentials: true })
        console.log("yearly post data", res.data);
        graphData(res.data.airData);

    }

    //function that returns data that manipulate the graph

    function graphData(data) {
        // console.log(data);
        let plotData = [];
        let struct = {
            x: [],
            y: [],
            type: 'bar'
        }
        data.map((i) => {
            struct.y.push(i.avgPmValue);
            struct.x.push(i.year);
        })
        plotData.push(struct)
        console.log(plotData);
        setChart(plotData)

    }
    // console.log(chart);
    let layout = { title: "Yearly average AQI data visualization using Bar Charts" }
    useEffect(() => {
        getYears();
    }, [])
    return (
        <div className='container mt-5 mb-5'>
            <form onSubmit={submitHandler} className='container d-flex justify-content-between' >
                <select name="startYear" onChange={onChangeHandler}>
                    <option value="">select start year</option>
                    {years.map((year) =>
                        <option key={year.year}
                            value={year.year}>{year.year}
                        </option>)}
                </select>
                <select name="endYear" onChange={onChangeHandler}>
                    <option
                        value="">select end year</option>
                    {years.map((year) =>
                        <option key={year.year}
                            value={year.year}>{year.year}
                        </option>)}
                </select>
                <input type="submit" value="submit" className='btn btn-primary ' />
            </form>
            <div className='mt-5 text-center'>
                <Plot
                    data={chart}
                    layout={layout}
                />

            </div>
        </div>
    )
}
