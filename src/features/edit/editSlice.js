const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    isOpen:false,
    blogID : ""
}
const editSlice = createSlice({
    name:"edit",
    initialState,
    reducers:{
        openEdit : (state,action)=>{
            state.isOpen = true
            state.blogID = action.payload
        },
        closeEdit : (state,action)=>{
            state.isOpen = false
            state.blogID = ""
        }
    }
})

export default editSlice.reducer
export const {openEdit,closeEdit} = editSlice.actions