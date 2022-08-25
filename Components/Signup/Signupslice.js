import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const register = createAsyncThunk(
    "signUp/register",
    async (data) => {
        const response = await axios.post(`http://localhost:3030/agency/registration`, data, { withCredentials: true });
        const result = response.data;
        console.log(result);
        return result;

    }

)


const signUpSlice = createSlice({
    name: "signUp",
    initialState: {
        data: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            area: '',
            division: "",
            district: "",
            motive: "",
            role: "",
        },

        status: "",


    }
    ,
    extraReducers: (builder) => {

        builder.addCase(register.fulfilled, (state, action) => {
            // state.data = action.payload;
            state.status = action.payload.status
        })
        builder.addCase(register.rejected, (state, action) => {
            state.status = action.payload.status
        })
    }

}
)



export default signUpSlice.reducer;
