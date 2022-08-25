import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';

export default function Graph8b() {
    const [years, setYears] = useState([]);
    const [agents, setAgents] = useState([]);
    const [stations, setStations] = useState([]);
    const [agentId, setAgentId] = useState("");
    const [changeValue, setChangeValue] = useState({
        agentId: "",
        yearOf: "",
        stationNo: ""
    })
    const [chart, setChart] = useState([]);

    const [show, setShow] = useState(false)

    // const []
    //get all years

    const getYear = async () => {
        const response = await axios.get(`http://localhost:3030/airData/get/available/published/year/daily`)

        setYears(response.data.years);

    }

    //get all agents
    const getAgents = async () => {
        const response = await axios.get(`http://localhost:3030/airData/get/available/agency/final`)

        setAgents(response.data.agents);


    }
    //pass agent id to get stations of agents 
    const postToGetStation = async (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        let agentOfId;
        if (name === "agentId") {
            agentOfId = value;
        }


        const body = {
            agentId: agentOfId,
        }
        setAgentId(body.agentId);


        //post to get agents station
        const response = await axios.post(`http://localhost:3030/airData/get/aqi/all/station/of/agency`, body)

        //set the data of agents along with stations

        if (body === null) {
            setStations([]);

        }
        else {
            setStations(response.data.airdata);
        }
        setShow(true);



    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setChangeValue({ ...changeValue, agentId: agentId, [name]: value })

    }
    const onClickHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post(`http://localhost:3030/airData/get/aqi/of/station/monthly`, changeValue)

        graphData(response.data.airData);


    }

    const graphData = (data) => {

        const plot = []
        if (data === null) {
            setChart([])
        }
        else {
            data.forEach(airData => {
                const struct = {
                    y: airData.valueOfPm,
                    type: 'box',
                    name: airData.year,
                    visible: airData.agencyName,

                }
                plot.push(struct)
            })
            setChart(plot);
        }


    }

    useEffect(() => {
        getYear();
        // getAgents()
    }, [])
    useEffect(() => {
        getAgents();
    }, [])
    return (
        <div className='container mt-5 text-center'>
            <h4 className='text-primary mb-4 text-decoration-underline'>Month Wise AVG AQI of PM2.5 value of a particular Station(monthly) </h4>
            <select name="agentId" id="" onChange={postToGetStation}>
                <option value="">select agents</option>
                {
                    agents.map((agent) =>
                        <option key={agent.agentId} value={agent.agentId}>{agent.name}</option>)
                }
            </select>
            {
                stations && show &&
                <div className='mt-2'>
                    <select name="yearOf" id="" onChange={onChangeHandler}>
                        <option value="">select years</option>
                        {years.map((year) => <option key={year.year} value={year.year}>{year.year}</option>)}
                    </select>
                    <select name="stationNo" className='mx-2' onChange={onChangeHandler} id="">
                        <option value="">select Station</option>
                        {stations.map((station) => <option key={station.station} value={station.station}>{station.station}</option>)}
                    </select>
                    <input type="submit" onClick={onClickHandler} value="showData" className='btn btn-success' />
                </div>
            }
            {/* graph 
              */}
            <div className="text-center mt-3">
                <Plot data={chart} />
            </div>

        </div>
    )
}
