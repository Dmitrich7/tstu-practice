import {Box, MenuItem, TextField} from '@mui/material'
import React, {useEffect} from 'react'
import { StreamNames } from '../models/StreamConfig'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { streamSlice } from '../store/reducers/StreamSlice';
import {getStreamByName} from "../store/reducers/ActionCreators";

export const StreamSelect = () => {
    const {changeStream} = streamSlice.actions;
    const dispatch = useAppDispatch();
    const {currentStreamName, streamData, unsavedData} = useAppSelector(state=>state.streamReducer)
    const {tid} = useAppSelector(state=>state.persistedLoginReducer)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>{
        dispatch(changeStream(e.target.value))
        dispatch(getStreamByName({tid, currentStreamName: e.target.value}))
    }
    return (
        <Box width={"25vw"}>
            <TextField disabled={unsavedData} fullWidth onChange={(e)=>handleChange(e)} value={currentStreamName} label={unsavedData?"Есть несохранённые данные":"Выбор потока"} select>
                {Object.values(StreamNames).map((element)=>{
                    return (
                        <MenuItem value={element}>
                            {element}
                        </MenuItem>
                    )
                })}
            </TextField>
        </Box>
    )
}
