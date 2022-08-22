import React from 'react'
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-success">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Air Quality Management</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ml-auto" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">

                        <li className="nav-item ml-2">
                            <Link className="nav-link" href="/signUp">Sign up</Link>
                        </li>

                        <li className="nav-item ml-2">
                            <Link className='nav-link ml-2' href="/dashboard">Dashboard</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}
