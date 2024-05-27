import Header from "../components/commons/Header";
import Sidebar from "../components/commons/Sidebar";
import Footer from "../components/commons/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
    // const unReadNum = useSelector(state => state.mailReducer.unreadmail || 0);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(callGetUnreadMailAPI());
    // }, [dispatch]);

    // useEffect(() => {
    //     console.log("Unread mail count updated: ", unReadNum);
    // }, [unReadNum]);

    return (
        <>
            <Header />
            <Sidebar />
            <div className="d-flex justify-content-between" style={{height:"100vh", flexDirection:"column"}}>
                <Outlet />
                <Footer />
            </div>
        </>
    );
}

export default Layout;