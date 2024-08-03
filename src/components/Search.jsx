import React, { useContext, useState } from 'react';
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SearchResult from './SearchResult';
import ThemeContext from '../context/ThemeContext';
import { searchSymbols } from '../api/Stock-api';

const Search = () => {
    const [input, setInput] = useState("");
    const [bestMatches, setBestMatches] = useState([]);
    const { darkMode } = useContext(ThemeContext);

    const clear = () => {
        setInput("");
        setBestMatches([]);
    };

    const updateBestMatches = async () => {
        try {
            if (input) {
                const searchResult = await searchSymbols(input);
                const results = searchResult.result || [];
                setBestMatches(results);
            }
        } catch (error) {
            setBestMatches([]);
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <div className={`flex items-center my-4 border-2 rounded-md relative z-50 w-96 
            ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}>
            <input 
                type='text' 
                value={input}
                className={`w-full px-4 py-2 focus:outline-none rounded-md ${darkMode ? "bg-gray-900" : ""}`}
                placeholder='Search Stocks'
                onChange={(event) => setInput(event.target.value)}
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        updateBestMatches();
                    }
                }}
            />
            {input && (
                <button onClick={clear} className="m-1">
                    <XMarkIcon className="h-4 w-4 fill-gray-500" />
                </button>
            )}
            <button onClick={updateBestMatches} className='h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2'>
                <MagnifyingGlassIcon className='h-4 w-4 fill-gray-100' />
            </button>

            {input && bestMatches.length > 0 ? (
                <SearchResult results={bestMatches} />
            ) : null}
        </div>
    );
};

export default Search;
