import {Header} from "../UI/Header/Header.jsx";
import {LeftSideBar} from "../SideBars/LeftSideBar/LeftSideBar.jsx";
import {RightSideBar} from "../SideBars/RightSideBar/RightSideBar.jsx";
import {Outlet} from "react-router";
import {Toaster} from "react-hot-toast";

export const Root = () => {
    return (
        <>
            <Header />
            <div className="test-container">
                <LeftSideBar/>
                <Outlet/>
                <RightSideBar/>
                <Toaster/>
            </div>
        </>
    )
}