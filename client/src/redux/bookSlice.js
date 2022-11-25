
import apiClient from "../helpers/baseURL";
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";


export const getList = createAsyncThunk(
    'book/list', 
    async (data) => await apiClient.post('/list',data)
)

export const getSelect = createAsyncThunk(
  'book/select', 
  async (data) =>await apiClient.get('/selectlist')
)

export const postNewRecord = createAsyncThunk(
    'book/form', 
    async (data) =>await apiClient.post('/form',data)
)

export const updateSort = createAsyncThunk(
    'book/sort', 
    async (data) =>await apiClient.put('/sort',data)
)



const initialState = { bookList:[], search:"", selectList:[], isFetching:false, loading: false, error: false, message: ""};

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers:{
      listDelete: (state) => {state.bookList=[]},
      messageDelete: (state) => {state.message=""}
    },

    extraReducers:(builder)=> {
      builder
      .addCase(getList.pending, (state, action) => {state.isFetching = true})
      .addCase(getList.fulfilled, (state, action) => { 
        state.loading=true ; state.isFetching = false;
        state.search=action.meta.arg.keyword;
        state.bookList=action.payload.data })
      .addCase(getList.rejected, (state, action) => {  
        state.isFetching = false; 
        state.error= true; 
        state.loading=false })

      .addCase(postNewRecord.pending , (state, action) => { 
        state.isFetching = true;
        state.error=false })
      .addCase(postNewRecord.fulfilled , (state, action) => {  
        state.message="Registration Successful";
        state.error=false
        state.loading=true ; 
        state.isFetching = false  })
      .addCase(postNewRecord.rejected , (state, action) => {  
        state.message="Registration failed";
        state.isFetching = false; 
        state.error= true; 
        state.loading=false })

      .addCase(updateSort.pending , (state, action) => { state.isFetching = true   })
      .addCase(updateSort.fulfilled , (state, action) => { 
        state.loading=true ; 
        state.isFetching = false;
        state.bookList=action.payload.data })
      .addCase(updateSort.rejected , (state, action) => { 
        state.isFetching = false; 
        state.error= true; 
        state.loading=false })

      .addCase(getSelect.pending , (state, action) => { state.isFetching = true })
      .addCase(getSelect.fulfilled , (state, action) => { 
        state.loading=true ; 
        state.isFetching = false;
        state.selectList=action.payload.data })
      .addCase(getSelect.rejected , (state, action) => { 
        state.isFetching = false; 
        state.error= true; 
        state.loading=false   })
    },
}); 


export const {listDelete,messageDelete} =bookSlice.actions;
export default bookSlice.reducer;

