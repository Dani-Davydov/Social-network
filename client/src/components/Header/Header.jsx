import logo from '../../icons/logo.svg';
import searchIcon from '../../icons/search.svg';
import changeThemeIcon from '../../icons/changeTheme.svg';
import notificationIcon from '../../icons/notification.svg';
import settingsIcon from '../../icons/settings.svg';
import * as SC from './styles';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {login} from "../../Redux/slices/usersSlice.js";
import {Modal} from "../Modal/Modal.jsx";
import {Notifications} from "../Notifications/Notifications.jsx";


export const Header = () => {
    const [showMoadal, setShowMoadal] = useState(false);

    const currentUser = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!currentUser) {
            dispatch(login({key: "currentUser"}))
        }
    }, [dispatch, currentUser]);

    return (
        <SC.HeaderContainer className="headerContainer">
            {showMoadal &&
                <Modal title={"Notifications"} setShowMoadal={setShowMoadal}>
                    <Notifications/>
                </Modal>
            }
            <SC.LeftSideContainer>
                <NavLink to={'/'}>
                    <div>
                        <img src={logo} alt="logo"/>
                    </div>
                </NavLink>
                <SC.SearchContainer>
                    <SC.SearchLable>
                        <SC.SearchIcon src={searchIcon} alt="search-icon"/>
                        <SC.SearchInput name="findFriends"
                               placeholder="Search for friends here..."
                               type="text"
                        />
                    </SC.SearchLable>
                </SC.SearchContainer>
            </SC.LeftSideContainer>
            <SC.RightSideContainer>
                {currentUser &&
                    <div>
                        <div>{currentUser.name}</div>
                        <div>{currentUser.surname}</div>
                        {currentUser.adminStatus === true ? <div>(Admin)</div> : null}
                    </div>
                }
                <SC.IconContainer>
                    <SC.RightSideItem>
                        <NavLink to={'/settings'}>
                            {currentUser && <img src={settingsIcon} alt=""/>}
                        </NavLink>
                    </SC.RightSideItem>
                    <SC.RightSideItem>
                        <img src={changeThemeIcon} alt=""/>
                    </SC.RightSideItem>
                    <SC.RightSideItem>
                        {currentUser && <img onClick={() => setShowMoadal(true)} src={notificationIcon} alt=""/>}
                    </SC.RightSideItem>
                </SC.IconContainer>
            </SC.RightSideContainer>
        </SC.HeaderContainer>
    )
}