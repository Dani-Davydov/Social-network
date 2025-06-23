import {Header} from "../Header/Header.jsx";
import {LeftSideBar} from "../LeftSideBar/LeftSideBar.jsx";
import {RightSideBar} from "../RightSideBar/RightSideBar.jsx";
import {Outlet} from "react-router";

export const Root = () => {
    return (
        <>
            <Header />
            <div className="test-container">
                <LeftSideBar/>
                <Outlet/>
                <RightSideBar/>
            </div>
        </>
    )
}