import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function YearlyAvgAqiBarCharts() {
    const [year, setYear] = useState([]);

    const getYear = async () => {
        const result = await axios.get(`http://localhost:3030/airData/get/available/published/year/final`)
        // console.log(result.data);
        setYear(result.data);
        // return result;

    }

    useEffect(() => {
        getYear()
    }, [])

    return (
        <div>YearlyAvgAqiBarCharts</div>
    )
}
