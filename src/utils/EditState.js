import { useSelector } from "react-redux"

export const editState = () => {
  return useSelector((state)=> state.edit.isOpen)
}


