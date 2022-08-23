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
        console.log(selectValue);


    }

    //post  yearly data to get the data of yearly
    const postYearlyData = async (e) => {
        try {
            e.preventDefault();
            // const {name,value}=e.target;
            // console.log(selectValue);
            const response = await axios.post(`http://localhost:3030/airData/get/aqi/all`, selectValue, { withCredentials: true })
            // console.log(response.data);
            // const result = response.data;
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

        // console.log(data);
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
                // console.log(j);
                struct.x.push(j.year);
                struct.y.push(j.avgAQI);
                struct.name = j.division;
            })
            arr.push(struct);

            plotData.push(...arr)
            // setChart(plotData);
            // console.log(plotData);
            setChart(plotData);
            return plotData
            // setChart(arr)
        })

        // console.log("plotData", plotData);


    }
    console.log(chart);
    //get all years
    const getYear = async () => {
        try {
            const response = await axios.get(`http://localhost:3030/airData/get/available/published/year/daily`);
            // console.log(response.data.years)
            setYears(response.data.years);
        } catch (error) {
            console.log(error);
        }

    }
    // console.log(chart)
    const layout = {
        title: "Division-Wise Time-based Air Quality Index (AQI) data visualization using line charts,"
    }
    useEffect(() => {
        getYear();

    }, [])
    return (
        <div className='container mt-5 mb-5'>
            <form onSubmit={postYearlyData} className='col-md-12 d-flex justify-content-around'>
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
            <div>
                <Plot
                    data={chart}
                    layout={layout}
                />
            </div>
        </div>
    )
}



