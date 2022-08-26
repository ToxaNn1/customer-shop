import React from "react";
import { motion } from "framer-motion";

const ActiveLine = () => {
    return (
        <motion.div
            layoutId="activeItem"
            className="w-full h-1 absolute -bottom-2 bg-lime-500"
        ></motion.div>
    );
};

const Filter = ({ value, isSelected, toggleFilter , handleClick, CategoryType }) => {
    return (
        <div>
            <motion.label onClick={handleClick} className="relative px-3 pt-3 pb-2 bg-slate-200 rounded">
                <input className="checkbox mr-1" onChange={toggleFilter} type="checkbox" value={Object.values(CategoryType)} />
                {value}
                {isSelected && <ActiveLine />}
            </motion.label>
        </div>
    );
};

export default Filter;
