import React, { createContext, useState, useRef } from 'react';

export const PageContext = createContext();

export const PageProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const pageScrollerRef = useRef(null);

    const goToPage = (pageNumber) => {
        if (pageScrollerRef.current) {
            pageScrollerRef.current.goToPage(pageNumber);
            setCurrentPage(pageNumber);
        }
    };

    return (
        <PageContext.Provider value={{ currentPage, setCurrentPage, goToPage, pageScrollerRef }}>
            {children}
        </PageContext.Provider>
    );
};