import React, { useEffect, useState } from 'react'
import axios from 'axios';
import LocationStatus from './LocationStatus';


export default function LocationBasedAir() {
    const [divisions, setDivision] = useState([]);// all divisions
    const [divisionData, setDivisionData] = useState({});//divisons data
    const [divisionvalue, setdivisonValue] = useState("");// value from select element


    const changeHandler = async (e) => {
        e.preventDefault()
        const value = e.target.value;

        //will get value from input
        setdivisonValue(value);
        //get particular dta
        const result = await axios.get(`http://localhost:3030/airData/get/avg/pm/${value}`, { withCredentials: true })

        //set the data of all divisions
        setDivisionData(result.data);
    }

    const getData = async () => {
        const result = await axios.get(`http://localhost:3030/airData/get/available/division`);
        // console.log(result)
        const allDivisions = result.data.session;

        // //set all divisions 
        console.log("division", result)
        setDivision(allDivisions);


    }

    useEffect(() => {
        getData();

    }, [])

    return (
        <div className='container'>
            <h4 className='text-center mt-5 text-primary text-decoration-underline'>Division wise Data</h4>
            <div className='col-md-2 my-4'>
                <select className="form-select"
                    onChange={changeHandler}
                    value={divisionvalue} aria-label="select division">
                    <option >select division</option>
                    {divisions.map((division) =>
                        <option key={division.division} value={division.division}>{division.division}</option>)}

                </select>
            </div>
            <LocationStatus divisionData={divisionData} ></LocationStatus>
        </div>
    )
}
