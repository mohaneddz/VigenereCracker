import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const Cell = ({ className, text }) => {
    const titleRef = useRef(null);

    return (
        <motion.div
            ref={titleRef}
            className={`${(() => {
                switch (className) {
                    case "class-cell":
                        return "text-center flex items-center justify-center bg-blue-700 w-10 h-10 m-1 b-blue-800 hover:bg-blue-950 z-10 rounded-sm";
                    case "highlight-cell":
                        return "text-center flex items-center justify-center bg-yellow-500 w-10 h-10 m-1 b-yellow-600 hover:bg-yellow-700 z-10 rounded-sm";
                    default:
                        return "text-center flex items-center justify-center bg-blue-500 w-10 h-10 m-1 b-blue-800 hover:bg-blue-800 z-10 rounded-sm";
                }
            })()} ${className}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >{text}
        </motion.div>
    );
};

export default Cell;