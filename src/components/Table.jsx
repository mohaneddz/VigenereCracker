import React, { useEffect, useRef, useState } from "react";
import { Cell } from "./Cell";
export const Table = ({ cols, rows, word, key }) => {

    const titleRef = useRef(null);
    const [highlightedCell, setHighlightedCell] = useState({ i: null, j: null });

    function init(cols, rows) {
        const table = [];
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (let i = 0; i <= rows; i++) {
            const row = [];

            for (let j = 0; j <= cols; j++) {
                if (i === 0 && j === 0) {
                    row.push(<Cell key={`${i}-${j}`} className="class-cell" text="\" />);
                } else if (j === 0) {
                    row.push(<Cell key={`${i}-${j}`} className="class-cell" text={alphabet[i - 1]} />);
                } else if (i === 0) {
                    row.push(<Cell key={`${i}-${j}`} className="class-cell" text={alphabet[j - 1]} />);
                } else {
                    row.push(<Cell key={`${i}-${j}`} className={highlightedCell.i === i && highlightedCell.j === j ? "highlight-cell" : "normal-cell"}
                        text={alphabet[(j + i - 2) % 26]} />);
                }
            }

            table.push(<div key={i} className="flex"> {row} </div>);
        }
        return table;
    }

    const highlight = ({ i, j }) => {
        setHighlightedCell({ i, j });
    };


    useEffect(() => {
        if (word.length)
            for (let i = 0; i <= word.length; i++) {
                const j = word.charCodeAt(i - 1) - 64;
                highlight(2, 2);
            }
    }, []);

    return (
        <div ref={titleRef} className="b-4 bg-blue-300 rounded-lg z-0 p-2">
            {init(cols, rows)}
        </div>
    );
};

export default Table