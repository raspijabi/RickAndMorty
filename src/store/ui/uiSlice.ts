import { createSlice } from "@reduxjs/toolkit";


export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        termToSearch: '',
        isSearchingEpisode: true,
        nameForHeader: ''
    },
    reducers: {
        setTermToSearch: (state, payload) => {
            state.termToSearch = payload.payload;
        },
        setIsSearchingEpisode: (state, payload) => {
            state.isSearchingEpisode = payload.payload;
        },
        setNameForHeader: (state, payload) => {
            state.nameForHeader = payload.payload;
        }
    }
})

export const { setTermToSearch, setIsSearchingEpisode, setNameForHeader } = uiSlice.actions;