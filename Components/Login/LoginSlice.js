
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
    "signIn/login",
    async (data) => {
        const response = await axios.post(`http://localhost:3030/agency/login`, data, { withCredentials: true })
        const result = response.data;
        console.log(result);
        return result;

    }

)
export const loginSlice = createSlice({
    name: "signIn",
    initialState: {
        message: "",
        agency: {
            emailOrAgentId: "",
            password: "",

        },
        status: "",

    },
    extraReducers: (builder) => {

        builder.addCase(login.fulfilled, (state, action) => {
            state.agency = action.payload.agency;
            state.message = action.payload.message
        })
        builder.addCase(login.rejected, (state, action) => {
            state.agency = "",
                state.message = "login failed"
        })
    },


})


export default loginSlice.reducer;