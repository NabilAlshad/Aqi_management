import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';

const ReqSeven = () => {
    const [chart, setChart] = useState([]);
    const structure = (data) => {
        let plotData = [];
        let struct = {
            x: [],
            y: [],
            mode: 'line',
            name: 'Scatter'
        }
        data.map((data) => {
            struct.x.push(data.division);
            struct.y.push(data.avgPM);
        })
        plotData.push(struct);
        return plotData;

    }
    let layout = {
        title: "line graph",
    }
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:3030/airData/get/aqi/all/division`)
                const result = response.data;

                setChart(structure(result.airData))
            }
            catch (error) {
                console.log(error.message);
            }
        })()
    }, [])
    return (
        <div className='mt-5 text-center'>
            <Plot
                data={chart}
                layout={layout}
            />
        </div>
    )
}

export default ReqSeven