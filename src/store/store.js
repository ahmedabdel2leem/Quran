import { configureStore } from "@reduxjs/toolkit";
import quranReducer from './allQuranSlice';


export const getAllTheQuran =  configureStore({
    reducer:{
        quran: quranReducer
    }
})