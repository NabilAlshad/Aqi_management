import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';

export default function DivisionWiseAvgAqi() {
    const [data, setData] = useState([]);
    const [chart, setChart] = useState([]);


    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:3030/airData/get/aqi/all/division/data`)
            const result = response.data;
            if (result.status === 202) {
                structData(result.airData);
            }
            else {
                console.log("an error occurred");

            }
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, [])




    const structData = (data) => {
        let plotData = [];
        data.map((data) => {
            let struct = {
                type: "scattermapbox",
                fill: "toself",
                lon: [],
                lat: [],
                marker: { size: 2, color: "" }
            }
            struct.lon.push(...data.lon);
            struct.lat.push(...data.lat);
            struct.marker.color = data.color;
            plotData.push(struct);
        })


        setChart(plotData);

    }


    let layout = {
        mapbox: {
            style: "stamen-terrain",
            // fill: "toself",
            center: { lon: 90.3563, lat: 23.6850 },
            zoom: 5
        },
        showlegend: false,
        height: 600,
        width: 800
    }

    return (
        <div className='container mt-5 '>
            <h4 className='text-center text-primary'>Division Wise Average Air Quality Index</h4>
            <div className='text-center'>
                <Plot
                    data=
                    {
                        chart
                    }
                    layout={layout}
                />
            </div>
        </div>
    )
}
