import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormHelperText, Stack, TextField, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { loginSlice } from '../store/reducers/LoginSlice'
import { streamApi } from '../services/StreamService'
import { skipToken } from '@reduxjs/toolkit/query'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../router/Routes'

export const LoginPage = () => {
  const [skip,setSkip] = useState(true);
  const [textField,setTextField] = useState("");
  const navigate = useNavigate();

  const {data, error, isLoading, isSuccess, refetch} = streamApi.useGetStreamListQuery(undefined,{skip:skip});

  const {updateTid} = loginSlice.actions;
  const dispatch = useAppDispatch();

  const handleClick = ()=>{
    dispatch(updateTid(textField))
    setSkip(false)
    if(skip==false){
      refetch()
    }
  }
  useEffect(() => {
    if (isSuccess) {
      navigate(RoutePath.admin);
    }
  }, [isSuccess]);

  return (
    <>
      <Stack width={"35vw"} gap={"10px"}>
        <TextField value={textField} onChange={(e)=>{setTextField(e.target.value)}} error={error?true:false} label={error?"Неверный t-id":"Введите t-id"} type='password'></TextField>
        <Button onClick={()=>handleClick()} disabled={isLoading} sx={{marginLeft: "auto",width: "10vw"}} variant='contained'>Войти</Button>
      </Stack>  
    </>
  )
}
