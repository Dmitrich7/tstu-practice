import {createSlice} from "@reduxjs/toolkit";

interface ILoginSlice{
    tid: string
}

const initialState: ILoginSlice = {
    tid: ''
}

export const loginSlice = createSlice({
    name: "login",
    initialState: initialState,
    reducers: {
        updateTid(state, action){
            state.tid = action.payload
        }
    }
})

export default loginSlice.reducer;

