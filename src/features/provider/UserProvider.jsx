"use client";
import { useState } from "react";

import { UserContext } from "../context/context";

function UserProvider({ children }) {
    const [userDetails, setUserDetails] = useState({});
    return (
        <UserContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;