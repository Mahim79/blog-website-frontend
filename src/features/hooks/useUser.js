
import { useContext } from "react";
import { UserContext } from "../context/context";

export const useUserDetails = () => {
    return useContext(UserContext);
}