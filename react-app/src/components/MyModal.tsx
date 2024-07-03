import React, { FC, useEffect, useState } from 'react'
import { Box, Button, DialogProps, Modal, Stack, TextField, Typography } from '@mui/material'
import { streamApi } from '../services/StreamService';
import { Height, Stream } from '@mui/icons-material';
import { IAccounts, accountExample } from '../models/Accounts';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import { StreamConfig } from '../models/StreamConfig';
import { streamSlice } from '../store/reducers/StreamSlice';

interface IMyModalProps{
    isModal: boolean;
    setModal: (arg0: boolean)=>void;
    current: number;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    width: "50vw",
    Height: "50vh",
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
  };

export const MyModal: FC<IMyModalProps> = (props) => {
    const {
        isModal,
        setModal,
        current
    } = props

    const dispatch = useAppDispatch();
    const {updateStreamData} = streamSlice.actions;
    const {streamData, currentStreamName} = useAppSelector(state=>state.streamReducer);
    const [controlledForm, setControlledForm] = useState(streamData[current]);
    const [dataChanged,setDataChanged] = useState(false)

    const handleClose: DialogProps["onClose"] = (reason) => {
        if (reason && reason === "backdropClick"||"escapeKeyDown")
            return;
        setModal(false)
    }

    useEffect(() => {
        setControlledForm(streamData[current])
    }, [current,streamData,isModal])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        setControlledForm({...controlledForm,[e.target.name]:e.target.value})
        setDataChanged(true)
    }

    const handleSave = () =>{
        dispatch(updateStreamData({controlledForm,current}))
        setModal(false)
    }

    return (
        <Modal
            open={isModal}
            onClose={handleClose}
        >
            <Stack alignItems={"center"} direction={"column"} sx={style}>
                <Stack width={"35vw"}>
                    {controlledForm && Object.keys(StreamConfig[currentStreamName]).map((element)=>(
                        <TextField
                            name={element}
                            onChange={(e)=>handleChange(e)}
                            label={element}
                            margin='dense'
                            maxRows={2}
                            multiline
                            size='small'
                            value={controlledForm[element as keyof typeof controlledForm]}>
                        </TextField>
                    ))}
                    <Stack height={"6vh"} justifyContent={"space-between"} direction={'row'}>
                        <Button onClick={()=>handleSave()} disabled={!dataChanged} variant='contained'>Сохранить изменения</Button>
                        <Button onClick={()=>setModal(false)} color="warning" variant='outlined'>Отменить изменения</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Modal>
    )
}
