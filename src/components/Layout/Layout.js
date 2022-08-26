import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
    return (
        <div className="container bg-white shadow-lg  shadow-gray-300 rounded-2xl p-6 flex flex-col mx-auto layout">
            <Header></Header>
            <hr className="m-10" />
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;
