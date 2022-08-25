import Link from 'next/link'
import React from 'react'
import Navbar from '../../Components/Home/Navbar'

export default function Dashboard() {
    return (
        <div>
            <Navbar></Navbar>
            {/* dashboard nav  */}
            <div className='d-flex justify-content-between'>
                <div className='col-md-3 mt-5 p-3'>
                    <ul className='list-group'>
                        <Link href="/Dashboard/addFile"><li className='list-group-item'>Add Data</li></Link>
                        {/* <li></li>
                        <li></li> */}
                    </ul>
                </div>
                {/* content  */}
                <div className='col-md-8 mt-5'>this is main</div>
            </div>
        </div>
    )
}
