import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeFilter: 'All',
    value: '',
    searchTerm: '',
    sorting: 'relevance',
    startIndex: 0
}

const searchSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersChanged: (state, action) => { state.activeFilter = action.payload },
        valueChanged: (state, action) => { state.value = action.payload },
        searchTermChanged: (state, action) => { state.searchTerm = action.payload },
        sortingChanged: (state, action) => { state.sorting = action.payload },
        startIndexChanged: (state, action) => { state.startIndex = action.payload },
    }
});

const {actions, reducer} = searchSlice;

export default reducer;
export const {
    filtersChanged,
    valueChanged,
    searchTermChanged,
    sortingChanged,
    startIndexChanged
} = actions;