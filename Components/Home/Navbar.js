import React from 'react'
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light container-fluid d-flex  bg-success">
            <div className="container-fluid">
                <Link className="navbar-brand " href="/"><p className='text-white me-5' style={{ cursor: "pointer" }}>Air Quality Management</p></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ml-auto" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto  mb-2 mb-lg-0">

                        <li className="nav-item ml-2 me-2">
                            <Link className="nav-link" href="/signUp"><p
                                style={{ cursor: "pointer" }}
                                className='text-decoration-none text-white'>Sign up</p></Link>
                        </li>
                        <li className="nav-item ml-2 me-2">
                            <Link className="nav-link" href="/login"><p
                                style={{ cursor: "pointer" }}
                                className='text-decoration-none text-white'>Login</p></Link>
                        </li>

                        <li className="nav-item ml-2">
                            <Link

                                className='nav-link ml-2' href="Dashboard/">
                                <p style={{ cursor: "pointer" }}
                                    className='text-white '>Dashboard</p>
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}
