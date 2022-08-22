import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import Plot from 'react-plotly.js';
import ComparisoBetweenMultipleData from '../Components/Home/ComparisoBetweenMultipleData';
import ComparisonBetweenTwo from '../Components/Home/ComparisonBetweenTwo';
import DivisionWiseAqi from '../Components/Home/DivisionWiseAqi';
import LocationBasedAir from '../Components/Home/LocationBasedAir';
import Navbar from '../Components/Home/Navbar';
import YearlyAvgAqiBarCharts from '../Components/Home/YearlyAvgAqiBarCharts';
export default function HomePage() {

    // const [chart, setChart] = useState([]);
    // const getData = async () => {
    //     const result = await axios.get(`https://data.cityofnewyork.us/resource/rc75-m7u3.json`)

    //     const data = result.data;

    //     let plotData = [];
    //     let x = [];
    //     let y = [];
    //     data.map((data) => {
    //         x.push(data.date_of_interest);
    //         y.push(data.case_count);

    //     })
    //     plotData["x"] = x;
    //     plotData["y"] = y;
    //     // console.log(plotData);
    //     setChart(plotData);

    // }

    // useEffect(() => {
    //     getData();

    // }, [])

    // // console.log(`x is ${chart.x} y is ${chart.y}`)
    return (

        <>
            <Navbar></Navbar>
            <LocationBasedAir></LocationBasedAir>
            <ComparisoBetweenMultipleData></ComparisoBetweenMultipleData>
            <ComparisonBetweenTwo></ComparisonBetweenTwo>
            <YearlyAvgAqiBarCharts></YearlyAvgAqiBarCharts>
            <DivisionWiseAqi></DivisionWiseAqi>
        </>
    )
}
