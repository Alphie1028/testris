import React, { createContext, useState } from "react";

const ControlsContext = createContext();

export const ControlsProvider = ({ children }) => {


    return (<ControlsContext.Provider value={{

    }}>
        {children}
    </ControlsContext.Provider>
    )
}

export default ControlsContext;