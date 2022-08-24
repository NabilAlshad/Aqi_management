import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js';

export default function Graph8A() {
    const [chart, setChart] = useState([]);//state for stations

    const [agents, setAgents] = useState([]);// state of agents

    const getAgents = async () => {
        const response = await axios.get(`http://localhost:3030/airData/get/available/agency/final`)

        setAgents(response.data.agents);
    }

    //   get all stations
    const getStations = async (e) => {
        // const { name, value } = e.target;

        const body = {
            agentId: e.target.value
        }
        const response = await axios.post(`http://localhost:3030/airData/get/aqi/all/station/of/agency`, body)
        // console.log("stations", response.data.airdata);
        graphData(response.data.airdata);

    }

    const graphData = (data) => {

        const plot = []
        data.forEach(airData => {
            const struct = {
                y: airData.valueOfPm,
                type: 'box',
                name: airData.station,
                visible: airData.agencyName,

            }
            plot.push(struct)
        })

        setChart(plot);

    }



    useEffect(() => {
        getAgents();
    }, [])

    return (
        <div>
            <div className=' container mt-5'>
                <h4 className='text-center text-primary mb-3 text-decoration-underline'>Station-Wise AQI data visualization using a box plot</h4>
                <form action="" className='col-md-2 mt-3'>
                    {/* select agents   */}
                    <select className='form-select' name="agentId" onChange={getStations} id="">
                        <option value="">Select Agent</option>
                        {
                            agents.map((agent, index) =>
                                <option key={agent.agentId} value={agent.agentId}>{agent.name}</option>)
                        }
                    </select>
                </form>
            </div>

            {/* grpah  */}
            <div className='text-center'>
                <Plot
                    data={chart}

                />
            </div>
        </div>
    )
}
