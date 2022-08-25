import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Components/Login/LoginSlice";
import signUpReducer from "../Components/Signup/Signupslice";


export const store = configureStore({
    reducer: {
        signUp: signUpReducer,
        login: loginReducer,

    }
})