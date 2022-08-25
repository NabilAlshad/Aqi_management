import React, { useState } from 'react'
import Navbar from '../Home/Navbar'
import Styles from '../../styles/signup.module.css';
import Link from 'next/dist/client/link';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './LoginSlice';
export default function Login() {
    const disPatch = useDispatch();
    const { message, agency, status } = useSelector((state) => state.login);
    console.log("message ,agency,status", message, agency, status);


    const loginInfo = {
        emailOrAgentId: "",
        password: "",
    }
    const [loginData, setLoginData] = useState(loginInfo);
    const [error, setError] = useState({})
    // const [message, setMessage] = useState("")
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }
    const postLogin = async (e) => {
        try {
            e.preventDefault();
            setError(validate(loginData));
            disPatch(login(loginData));
            setLoginData({
                emailOrAgentId: "",
                password: "",
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    const validate = (values) => {
        const error = {

        }
        if (!values.emailOrAgentId) {
            emailOrAgentId.email = "email is required";
        }
        if (!values.password) {
            error.password = "password is required";
        }
        return error;
    }
    return (
        <>
            <Navbar></Navbar>
            <form id={Styles.form} className="col-md-6" onSubmit={postLogin}>
                <h1 className='text-success text-decoration-underline text-center'>Login</h1>
                <p className='text-success'>{message}</p>
                <div className="mb-3">
                    <input
                        type="email"
                        name="emailOrAgentId"
                        value={loginData.email}
                        onChange={handleChange}
                        className="form-control" placeholder='enter your email' id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                </div>
                <p className='text-danger'>{error.email}</p>
                <div className="mb-3">

                    <input
                        name="password"
                        type="password"
                        value={loginData.password}
                        onChange={handleChange}
                        placeholder='enter your password'
                        className="form-control"
                        id="exampleInputPassword1"></input>
                </div>
                <p className='text-danger'>{error.password}</p>

                <button type="submit" className="btn btn-primary">Login</button>
                <p className='text-center mt-4'>Don't have any account? <Link href="/signUp">Sign Up</Link></p>
            </form>



        </>
    )
}
