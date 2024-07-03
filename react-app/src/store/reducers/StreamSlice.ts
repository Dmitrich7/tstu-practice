import {createSlice} from "@reduxjs/toolkit";
import {getStreamByName, postStreamByName} from "./ActionCreators";

interface IStreamsSlice{
    unsavedData: boolean,
    currentStreamName: string,
    streamData: object[],
    isLoading: boolean,
    error: string
}

const initialState: IStreamsSlice = {
    unsavedData: false,
    currentStreamName: "",
    streamData: [],
    isLoading: false,
    error: ""
}

export const streamSlice = createSlice({
    name: "stream",
    initialState: initialState,
    reducers: {
        changeStream(state,action){
            state.currentStreamName = action.payload
        },
        updateStreamData(state,action){
            state.streamData[action.payload.current] = action.payload.controlledForm
            state.unsavedData = true
        }
    },
    extraReducers: builder=>{
        builder
            .addCase(getStreamByName.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(getStreamByName.fulfilled,(state, action)=>{
                state.streamData = action.payload[state.currentStreamName]
                state.isLoading = false;
                state.unsavedData = false;
                state.error = '';
            })
            .addCase(getStreamByName.rejected,(state,action)=>{
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(postStreamByName.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(postStreamByName.fulfilled,(state)=>{
                state.isLoading = false;
                state.unsavedData = false;
                state.error = '';
            })
            .addCase(postStreamByName.rejected,(state,action)=>{
                state.isLoading = false;
                state.error = action.payload as string;
            })
    }
})

export default streamSlice.reducer;

