import React from "react";
import { Outlet } from "react-router-dom";

import "./index.scss";

import Footer from "./Footer";
import Header from "./Header";

const ShopLayout = () => {
    return (
        <>
            <Header />
            <main className="main-wrapper">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default ShopLayout;
