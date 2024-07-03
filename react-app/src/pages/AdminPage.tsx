import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RoutePath } from '../router/Routes'
import { streamApi } from '../services/StreamService'
import { IAccounts, accountExample } from '../models/Accounts'
import {useAppDispatch, useAppSelector} from '../hooks/redux'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box, Button, Dialog, DialogTitle, Fab, Modal, Stack, Typography} from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import {MyModal} from "../components/MyModal"
import { DynamicTable } from '../components/DynamicTable'
import { StreamSelect } from '../components/StreamSelect'
import {getStreamByName, postStreamByName} from "../store/reducers/ActionCreators";

export const AdminPage = () => {
  const [modal,setModal] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);
  const [dialog,setDialog] = useState(false);
  const dispatch = useAppDispatch();
  const {currentStreamName, streamData, unsavedData, isLoading} = useAppSelector(state=>state.streamReducer)
  const {tid} = useAppSelector(state=>state.persistedLoginReducer)

  const handleModal = (current: number) =>{
    setModal(true)
    setCurrent(current)
  }

  const handleSaveData = () =>{
    dispatch(postStreamByName({tid, currentStreamName,streamData}))
  }

  const handleRefetch = () =>{
    dispatch(getStreamByName({tid, currentStreamName}))
  }

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      setDialog(true)
    };
  }, []);

  return (
    <>
      <Stack height={"90vh"}>
        <Stack justifyContent={"space-between"} direction={"row-reverse"}>
          {streamData.length==0 ? null :
              <Stack spacing={2} direction={"row"}><Button disabled={isLoading||!unsavedData} onClick={()=>handleSaveData()} variant='contained'>Сохранить изменения</Button>
                <Button disabled={!unsavedData} onClick={()=>handleRefetch()} color="error" variant='outlined'>Отменить изменения</Button></Stack>
          }
          <StreamSelect></StreamSelect>
        </Stack>
        {streamData.length==0 ? null : <DynamicTable handleModal={handleModal}></DynamicTable>}
        <MyModal current={current} isModal={modal} setModal={setModal}></MyModal>
        <Dialog open={dialog}>
          <DialogTitle>Есть несохранённые изменения</DialogTitle>
          <Stack>
            <Button onClick={()=>{}} variant={"contained"}>Выйти</Button>
            <Button onClick={()=>setDialog(false)} variant={"outlined"}>Отмена</Button>
          </Stack>
        </Dialog>
      </Stack>
    </>
  )
}
