import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

type GetStreamResponse<T> = { data: T };

export const streamApi = createApi({
    reducerPath: 'streamApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://zdev.omobus.net/bridge/data",
        prepareHeaders: (headers,{getState})=>{
            const {persistedLoginReducer} = getState() as RootState;
            headers.set("X-TID",persistedLoginReducer.tid);
            return headers;
        }
    }),
    endpoints: (build)=> ({
        getStreamList: build.query<string[],void>({
            query: ()=> ({
                url: ""
            })
        }),
        getStreamByName: build.query<GetStreamResponse<unknown>,string>({
            query: (streamName)=> ({
                url: "",
                headers:{
                    "X-REF": streamName
                }
            })
        })
    })
})
