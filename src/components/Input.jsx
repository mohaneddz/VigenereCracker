import React, { useEffect } from "react";

const Input = ({ className, value, setter, type, maxLength = 1, number }) => {

    function ForceUpperCase(e) {
        e.target.value = ('' + e.target.value).toUpperCase();
    }

    const getInputField = ({ type }) => {
        switch (type) {
            case 'text':
                return (
                    <input
                        type="text"
                        value={value}
                        maxLength={maxLength}
                        className={`text-black text-4xl text-center m-4 p-2 h-20 w-full bg-slate-400 rounded-lg border-2 border-transparent focus:border-blue-500 focus:outline-none focus:bg-slate-300 transition-colors duration-300 ${className}`}
                        onChange={(e) => {
                            setter(e.target.value);
                        }}
                    />
                );
            case 'number':
                return (
                    <input
                        type="number"
                        value={value}
                        maxLength={maxLength}
                        className={`text-black text-center m-4 p-2 text-2xl h-20 w-20 bg-slate-400 rounded-lg border-2 border-transparent focus:border-blue-500 focus:outline-none focus:bg-slate-300 transition-colors duration-300 ${className}`}
                        onChange={(e) => setter(e.target.value)}
                    />
                );
            case 'char':
                return (
                    <input
                        type="text"
                        maxLength={maxLength}
                        className={`text-black font-bold text-center text-2xl m-4 p-2 h-20 w-20 bg-slate-400 rounded-lg border-2 border-transparent focus:border-blue-500 focus:outline-none focus:bg-slate-300 transition-colors duration-300 ${className}`}
                        onChange={(e) => e.target.value = e.target.value.toUpperCase()}
                    />
                );
            case 'readonlyChar':
                return (

                    <div className="input-container m-0 p-0 " data-number={number}>
                        <input
                            type="text"
                            value={value}
                            maxLength={maxLength}
                            readOnly
                            className={`select-none text-black text-center text-2xl m-8 p-2 h-20 w-20 bg-blue-400 rounded-lg border-2 border-transparent hover:border-blue-500 focus:outline-none hover:bg-blue-700 hover:cursor-pointer transition-colors duration-300 ${className} input-with-number`}
                        />
                    </div>
                );
            case 'readonlyText':
                return (
                    <input
                        type="text"
                        value={value}
                        readOnly
                        maxLength={maxLength}
                        className={`text-black text-center m-4 p-2 font-bold text-3xl h-20 w-full bg-slate-400 rounded-lg border-2 border-transparent focus:border-blue-500 focus:outline-none focus:bg-slate-300 transition-colors duration-300 ${className}`}
                        onChange={(e) => setter(e.target.value)}
                    />
                );
            // Add more cases as needed
            default:
                return (
                    <input
                        type="text"
                        value={value}
                        maxLength={maxLength}
                        className={`text-black text-center m-4 p-2 text-xl w-full bg-slate-400 rounded-lg border-2 border-transparent focus:border-blue-500 focus:outline-none focus:bg-slate-300 transition-colors duration-300 ${className}`}
                        onChange={(e) => setter(e.target.value)}
                    />
                );
        }
    };

    return (
        getInputField({ type: type })
    );
};

export default Input;