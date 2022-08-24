import axios from 'axios';

import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';
import { Comparison } from '../../Utils/Comparison';

export default function ComparisonBetweenTwo() {
    const [availableYear, setAvailableYear] = useState([]);//state for get all available years
    // const [yearValue, setYearValue] = useState([])//start year and end year value;

    const [agency, setAgency] = useState([]);// agenciens value
    let valueBody = {
        startYear: '',
        endYear: '',
        agencyOne: 0,
        agencyTwo: 0,
    }
    const [values, setValues] = useState(valueBody)
    const [airData, setAirData] = useState([])
    const [layout, setLayout] = useState([])

    //get all years
    const getYears = async () => {

        try {
            const response = await axios.get(`http://localhost:3030/airData/get/available/published/year/daily`)

            const result = response.data.years;
            setAvailableYear(result);
        }
        catch (error) {
            console.log(error);

        }
    }

    //get all agencies
    const getAgency = async () => {
        try {
            const response = await axios.get(`http://localhost:3030/airData/get/available/agency/final`)
            const result = response.data.agents;

            setAgency(result);

        }
        catch (error) {
            console.log(error);
        }
    }

    //submit to get the data
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(`http://localhost:3030/airData/get/daily/basis/mean/inRange/between/two`, values, { withCredentials: true })
            // console.log(response.data.airData);
            const result = response.data.airData;
            // setAirData(result);
            const {
                data,
                layout
            } = Comparison(result, values.agencyOne, values.agencyTwo)
            setLayout(layout)
            setAirData(data)
        }
        catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {
        getYears();
        getAgency()

    }, [])


    return (
        <div className='container mt-5 text mb-5'>
            <h4 className='text-center text-decoration-underline text-primary mb-4'>Comparison between two agenciens data</h4>
            <form className='form text-center mt-4' onSubmit={handleSubmit}>
                {/* start  year  */}
                <select name="startYear" onChange={(e) => setValues({ ...values, startYear: e.target.value })} className=''>
                    <option value="">select start year</option>
                    {availableYear.map((year) =>
                        <option key={year.year}
                            value={year.year}>{year.year}</option>)}

                </select>

                {/* end year   */}
                <select name="endYear" onChange={(e) => setValues({ ...values, endYear: e.target.value })} className=' mx-5'>

                    <option value="">select end year</option>
                    {availableYear.map((year) =>
                        <option key={year.year}
                            value={year.year}>{year.year}</option>)}

                </select>
                {/* first agent  */}
                <select name="agencyOne" onChange={(e) => setValues({ ...values, agencyOne: e.target.value })} className='  mx-5'>

                    <option value="">agent 1</option>
                    {agency.map((ag) =>
                        <option key={ag.name}
                            value={ag.agentId}>{ag.name}</option>)}
                </select>

                {/* second agent  */}
                <select name="agencyTwo" onChange={(e) => setValues({ ...values, agencyTwo: e.target.value })} className=' mx-5'>

                    <option value="">agent2</option>
                    {agency.map((ag) =>
                        <option key={ag.name}
                            value={ag.agentId}>{ag.name}</option>)}
                </select>
                <button className='btn btn-success'> submit </button>
            </form>

            <div className='text-center'>
                <Plot
                    layout={layout}
                    data={airData}
                />
            </div>
        </div>
    )
}
