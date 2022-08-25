import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import Plot from 'react-plotly.js';
import ComparisoBetweenMultipleData from '../Components/Home/ComparisoBetweenMultipleData';
import ComparisonBetweenTwo from '../Components/Home/ComparisonBetweenTwo';
import DivisionWiseAvgAqi from '../Components/Home/DivisionWiseAvgAqi';
import DivisonAqiLineCharts from '../Components/Home/DivisonAqiLineCharts';
import Graph10 from '../Components/Home/Graph10';
import Graph8A from '../Components/Home/Graph8A';
import Graph8b from '../Components/Home/Graph8b';
import LocationBasedAir from '../Components/Home/LocationBasedAir';
import Navbar from '../Components/Home/Navbar';
import ReqSeven from '../Components/Home/ReqSeven';
import YearlyAvgAqiBarCharts from '../Components/Home/YearlyAvgAqiBarCharts';
export default function HomePage() {

    return (

        <>
            <Navbar></Navbar>
            <LocationBasedAir></LocationBasedAir>
            <ComparisoBetweenMultipleData></ComparisoBetweenMultipleData>
            <ComparisonBetweenTwo></ComparisonBetweenTwo>
            <DivisionWiseAvgAqi></DivisionWiseAvgAqi>
            <DivisonAqiLineCharts></DivisonAqiLineCharts>
            <ReqSeven />
            <Graph8A></Graph8A>
            <Graph8b></Graph8b>
            {/* <YearlyAvgAqiBarCharts></YearlyAvgAqiBarCharts> */}
            <Graph10></Graph10>

        </>
    )
}
