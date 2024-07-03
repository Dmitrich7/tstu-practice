import { Fab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import { accountExample } from '../models/Accounts';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { streamSlice } from '../store/reducers/StreamSlice';
import { StreamConfig } from '../models/StreamConfig';
import { FC } from 'react';

interface IDynamicTableProps{
    handleModal: (arg0: number)=>void
}

export const DynamicTable: FC<IDynamicTableProps> = (props) => {
    const {handleModal} = props
    const {streamData, currentStreamName} = useAppSelector(state=>state.streamReducer)

    return (
        <TableContainer sx={{width: "95vw"}}>
          <Table>
            <TableHead>
              <TableRow >
                <TableCell>
                  Actions
                </TableCell>
                {Object.keys(StreamConfig[currentStreamName]).map((e)=>(
                  <TableCell key={e}>
                    {e}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {streamData.map((row, index: number)=>{
                return (
                  <TableRow>
                    <TableCell>
                      <Fab onClick={()=>handleModal(index)} size="small">
                        <CreateIcon/>
                      </Fab>
                    </TableCell>
                    {Object.keys(StreamConfig[currentStreamName]).map((element)=>{
                      return (
                          <TableCell>
                            {row[element as keyof typeof row]}
                          </TableCell>
                        )
                      })
                    }
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
    )
}
