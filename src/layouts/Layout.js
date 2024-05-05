import Header from "../components/commons/Header";
import Sidebar from "../components/commons/Sidebar";
import Footer from "../components/commons/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <Header />
            <Sidebar />
            <Outlet />
            <Footer />
        </>
    );
}

export default Layout;