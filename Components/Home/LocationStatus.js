import React from 'react'

export default function LocationStatus({ divisionData }) {
    // console.log(divisionData);
    let { airData, message, status } = divisionData;

    let data = {
        aqiColor: "",
        level: "",
        division: "",
        average: "",
    }
    if (!airData) {
        data.aqiColor = "green";
        data.level = "not found";
        data.average = "not found";
        data.division = "";

    }
    else {

        data.aqiColor = airData.aqiColor;
        data.level = airData.level;
        data.average = airData.average;
        data.division = airData.division;
    }
    let { aqiColor, level, average, division } = data;
    average = Number(average);

    return (
        <>
            <div className='col-md-10'>
                <div className='col-md-12 p-3' style={{ backgroundColor: aqiColor }}>
                    <h6 className='text-light text-center shadow-lg p-3 border border-3' style={{ width: "200px" }}>us Aqi:  {average.toFixed(2)}</h6>
                    <h6 className='text-grey'>  {level.toUpperCase()}</h6>
                </div>
                <div className="overview my-3">
                    <p className='text-primary'>overview</p>
                    {division && <p>
                        What is the current air quality in {division ? division : ""}?</p>}
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Air Pollution Level</th>
                            <th scope="col">Air quality index</th>
                            <th scope="col">Main Pollutant</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <tr >{level}</tr>
                            <td>{average} US AQI</td>
                            <td>PM2.5</td>

                        </tr>


                    </tbody>
                </table>
            </div >
        </>
    )
}
