import React, { useState, createContext } from 'react'

export const CollectionContext = createContext();

export const CollectionProvider = ({children}) => {

    const [collections, setCollections] = useState([])

    return (
        <CollectionContext.Provider value={[collections, setCollections]} >
            {children}
        </CollectionContext.Provider>
    )
}