import React, { useState } from 'react'
import Navbar from '../Home/Navbar'
import Styles from '../../styles/signup.module.css';
import Link from 'next/dist/client/link';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './Signupslice';

export default function Signup() {
    const disPatch = useDispatch();
    const status = useSelector((state) => state.signUp.status);
    // console.log(users);

    const formValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        area: '',
        division: "",
        district: "",
        country: "",
        motive: "",
        userType: "",

    }

    const [inputValues, setInputValues] = useState(formValues);
    const [errors, setError] = useState({})
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");


    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setInputValues({ ...inputValues, [name]: value });

    }

    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            console.log(inputValues);
            setError(validate(inputValues));
            disPatch(register(inputValues))
            setInputValues({})
        }
        catch (error) {
            return console.log(error);

        }

    }
    const validate = (values) => {
        let errors = {}
        if (!values.name) {
            errors.name = "name is required";
        }
        if (!values.email) {
            errors.email = "email is required"
        }
        if (!values.password || !values.confirmPassword) {
            errors.password = "password is required"
        }
        if (values.password != values.confirmPassword) {
            errors.confirmPassword = "password does not match";

        }
        if (!values.area) {
            errors.area = "area is required";
        }
        if (!values.division) {
            errors.division = "division is required";
        }
        if (!values.district) {
            errors.district = "district is required";
        }
        if (!values.motive) {
            errors.motive = "motive is required";

        }
        if (!values.country) {
            errors.country = "country is required";
        }
        if (!values.userType) {
            errors.userType = "userType is required"
        }
        return errors;

    }
    const revealPassword = () => {
        setShowPassword(!showPassword);

    }
    // if (status === 201) {
    //     alert("agent saved successfully");

    // }



    return (
        <div className='text-center mb-5'>

            <Navbar></Navbar>

            <form className="col-md-6" id={Styles.form} onSubmit={submitHandler}>

                <h2 className='text-warning text-center text-decoration-underline'>New to Us? Sign up</h2>
                {(status === 201) &&
                    <p className='text-success'>Agent Saved successfully</p>

                }
                {(status === 402) &&
                    <p className='text-danger'>Sign up failed</p>
                }
                {/* form fields */}

                {/* email  */}
                <div className="mb-3">
                    <input type="email" values={inputValues.email} onChange={onChangeHandler} name="email" placeholder='enter your email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </input>
                    <p className='text-danger'>{errors.email}</p>
                </div>
                <div className="mb-3">
                    <input type="text" value={inputValues.name} placeholder='enter your name' name="name" className="form-control" onChange={onChangeHandler} id="name" aria-describedby="emailHelp">
                    </input>
                    <p className='text-danger'>{errors.name}</p>
                </div>
                <div className="mb-3">
                    <p className='text-success'>password must contain one uppercase letter and special character</p>
                    <input type={showPassword ? "text" : "password"} value={inputValues.password} placeholder='enter your password' name="password" onChange={onChangeHandler} className="form-control" autoComplete='on' id="exampleInputPassword1"></input>
                    <p className='text-danger'>{errors.password}</p>
                </div>
                <div className="mb-3">
                    <input type={showPassword ? "text" : "password"} placeholder='confirm password' name="confirmPassword" className="form-control"
                        value={inputValues.confirmPassword} onChange={onChangeHandler}
                        autoComplete='on' id="exampleInputPassword2"></input>

                    <p style={{ cursor: 'pointer', width: "150px" }} className="my-2 bg-success text-light" onClick={revealPassword}>
                        {showPassword ? "Hide password" : "show password"}</p>
                    <p className='text-danger'>{errors.confirmPassword}</p>
                </div>

                <div className="mb-3">
                    <input type="text" placeholder='area' name="area" value={inputValues.area} onChange={onChangeHandler} className="form-control" id="area"></input>
                    <p className='text-danger'>{errors.area}</p>
                </div>
                <div className="mb-3">
                    <input type="text" placeholder='country' name="country" value={inputValues.country} onChange={onChangeHandler} className="form-control" id="country"></input>
                    <p className='text-danger'>{errors.country}</p>
                </div>
                <div className="mb-3">
                    <input type="text" placeholder='division' name="division" value={inputValues.division} onChange={onChangeHandler} className="form-control" id="division"></input>
                    <p className='text-danger'>{errors.division}</p>
                </div>
                <div className="mb-3">
                    <input type="text" placeholder='district' name="district" value={inputValues.district} onChange={onChangeHandler} className="form-control" id="district"></input>
                    <p className='text-danger'>{errors.district}</p>
                </div>
                <div className="mb-3">
                    <input type="text" value={inputValues.value} onChange={onChangeHandler} placeholder='motive' name="motive" className="form-control" id="motive"></input>
                    <p className='text-danger'>{errors.motive}</p>
                </div>

                <select className='form-select' name="userType" onChange={onChangeHandler} id="">
                    <option value="">Select a userType</option>
                    <option value="municipali">municipali</option>
                    <option value="researchOr">researchOr</option>
                    <option value="admin">admin</option>
                    <option value="meteorolog">meteorolog</option>

                </select>
                <p className='text-danger'>{errors.role}</p>

                <button type="submit" className="btn btn-primary">Sign up</button>
                <p className='mt-3 text-danger'>{message && message}</p>
                <h5>Already have an account ? <Link href='/login'>login</Link></h5>
            </form>

        </div>
    )
}
