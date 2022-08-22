import React, { useState } from 'react'

export default function DivisonAqiLineCharts() {
    return (
        <div className='container mt-5 mb-5'>
            <div className='col-md-12 d-flex justify-content-around'>
                {/* yearly monthly select  */}
                <div className='col-md-3'>
                    <select className='form-select' name="">
                        <option value="yearly">yearly</option>
                        <option value="monthly">monthly</option>
                    </select>
                </div>

                {/* from year select */}
                <div className='col-md-3'>
                    <select className='form-select' name="firstYear" id="">
                        <option value="">Choose year</option>

                    </select>
                </div>
                <div className='col-md-3'>
                    <select className='form-select' name="secondYear" id="">
                        <option value="">Choose year</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
