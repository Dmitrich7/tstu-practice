import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {useAppSelector} from "../../hooks/redux";

export const getStreamByName = createAsyncThunk(
    'stream/getStreamByName',
    async ({tid, currentStreamName}:{tid:string,currentStreamName:string}, thunkAPI) =>{
        try {
            const response = await axios.get('https://zdev.omobus.net/bridge/data',{
                headers:{
                    "X-REF": currentStreamName,
                    "X-TID": tid
                }
            });
            return response.data;
        }catch (e) {
            let errorMessage = "Failed to do something exceptional";
            if (e instanceof Error) {
                errorMessage = e.message;
            }
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
)

export const postStreamByName = createAsyncThunk(
    'stream/postStreamByName',
    async ({tid, currentStreamName, streamData}:{tid:string,currentStreamName:string,streamData: object[]}, thunkAPI) =>{
        try {
            await axios.post('https://zdev.omobus.net/bridge/data',{[currentStreamName]: streamData},{
                headers:{
                    "X-TID": tid
                }
            });
        }catch (e) {
            let errorMessage = "Failed to do something exceptional";
            if (e instanceof Error) {
                errorMessage = e.message;
            }
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
)
