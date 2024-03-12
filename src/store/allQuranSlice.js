import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const allQuranObj = createAsyncThunk('quran/getAllQuran',async()=>{
    const response =  await axios('https://api.quran.com/api/v4/quran/verses/words_fildes=uthmani_tajweed');
    // console.log(response?.data?.verses[0]?.verse_key)
    return response.data.verses
} )



export const quranSlice = createSlice({
    name:"quran",
    initialState:{
        isLoading : false,
        allQuran : null,
        error : null,
    },
    extraReducers:(builder)=>{
        builder.addCase(allQuranObj.pending,(state,action)=>{
            console.log('pend')
            state.isLoading = false;
            state.error = null;
            state.allQuran = null
        })
        builder.addCase(allQuranObj.fulfilled , (state,action)=>{
            state.isLoading = false;
            state.allQuran = action.payload;
            state.error = null;
        })
        builder.addCase(allQuranObj.rejected,(state,action)=>{
            console.log('err')
            state.isLoading = false;
            state.allQuran = null;
            state.error = true;
        });
    }
}) 
export  default quranSlice.reducer;