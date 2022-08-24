import axios from 'axios';

import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';
export default function DivisonAqiLineCharts() {
    const [years, setYears] = useState([]);//get all years state
    const [yearlyData, setYearlyData] = useState({});
    const [selectValue, setChangeValue] = useState({});
    const [chart, setChart] = useState([]);
    const h = "h1"

    const changleHandler = (e) => {
        const { name, value } = e.target;
        setChangeValue({ ...selectValue, [name]: value });



    }

    //post  yearly data to get the data of yearly
    const postYearlyData = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post(`http://localhost:3030/airData/get/aqi/all`, selectValue, { withCredentials: true })

            if (response.data.status === 202) {
                graphData(response.data.airData);
                // setChart(data)

            }
            else {
                console.log("there is an error");
            }

        }
        catch (error) {
            console.log(error);

        }

    }
    const graphData = (data) => {

        let plotData = [];
        data.map((i) => {
            let arr = [];
            let struct = {
                x: [],
                y: [],
                mode: "lines",
                name: ""
            }
            i.map((j) => {

                struct.x.push(j.year);
                struct.y.push(j.avgAQI);
                struct.name = j.division;
            })
            arr.push(struct);

            plotData.push(...arr)

            setChart(plotData);
            return plotData
            // setChart(arr)
        })




    }

    //get all years
    const getYear = async () => {
        try {
            const response = await axios.get(`http://localhost:3030/airData/get/available/published/year/daily`);

            setYears(response.data.years);
        } catch (error) {
            console.log(error);
        }

    }

    const layout = {
        title: "Division-Wise Time-based Air Quality Index (AQI) data visualization using line charts,"
    }
    useEffect(() => {
        getYear();

    }, [])
    return (
        <div className='container mt-5 mb-5'>
            <h4 className='text-center text-decoration-line text-primary'>Division wise time basae air quality index data visualization using line charts</h4>
            <form onSubmit={postYearlyData} className='col-md-12 d-flex justify-content-around mt-4'>
                {/* yearly monthly select  */}
                <select className='form-select' onChange={changleHandler} name="queryBy">
                    <option value="">select a value</option>
                    <option value="yearly" >yearly</option>
                    <option value="monthly">monthly</option>
                </select>

                {/* from year select */}

                <select className='form-select' onChange={changleHandler} name="yearFrom"  >
                    <option value="">Choose year</option>
                    {years.map((year) =>

                        <option key={year.year} value={year.year}>{year.year}</option>)}
                </select>

                <select className='form-select' onChange={changleHandler} name="yearTo"  >
                    <option value="">Choose year</option>
                    {years.map((year) =>

                        <option key={year.year} value={year.year}>{year.year}</option>)}
                </select>

                <input type="submit" className='btn btn-success' />
            </form>
            <div className='text-center '>
                <Plot
                    data={chart}
                    layout={layout}
                />
            </div>
        </div>
    )
}



