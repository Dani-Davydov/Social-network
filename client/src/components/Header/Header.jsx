import logo from '../../icons/logo.svg';
import searchIcon from '../../icons/search.svg';
import notificationIcon from '../../icons/notification.svg';
import * as SC from './styles';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState, useMemo, useCallback} from "react";
import {login, updateSearch, filtrBySearchUser} from "../../Redux/slices/usersSlice.js";
import {Modal} from "../UI/Modal/Modal.jsx";
import {Notifications} from "../Notifications/Notifications.jsx";
import { useLocation } from "react-router-dom";


export const Header = () => {
    const [showMoadal, setShowMoadal] = useState(false);

    const currentUser = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch();

    const location = useLocation();

    useEffect(() => {
        if (!currentUser) {
            dispatch(login({key: "currentUser"}))
        }
    }, [dispatch, currentUser]);

    const debounce = (func, delay) => {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    };


    const debounceFilter = useCallback((value) => {
        dispatch(updateSearch(value));

        dispatch(filtrBySearchUser())
    }, [dispatch]);

    const debouncedFilter = useMemo(() => debounce(debounceFilter, 500), [debounceFilter]);

    const onChange = (value) => {
        dispatch(updateSearch(value));
        debouncedFilter(value)
    }

    return (
        <SC.HeaderContainer className="headerContainer">
            {showMoadal &&
                <Modal title={"Notifications"} setShowMoadal={setShowMoadal}>
                    <Notifications setShowMoadal={setShowMoadal}/>
                </Modal>
            }
            <SC.LeftSideContainer>
                <NavLink to={'/'}>
                    <div>
                        <img src={logo} alt="logo"/>
                    </div>
                </NavLink>
                {location.pathname === "/findFriends" &&
                    <SC.SearchContainer>
                        <SC.SearchLable>
                            <SC.SearchIcon src={searchIcon} alt="search-icon"/>
                            <SC.SearchInput
                                onChange={(e) => onChange(e.target.value)}
                                name="findFriends"
                                placeholder="Search for friends here..."
                                type="text"
                            />
                        </SC.SearchLable>
                    </SC.SearchContainer>}
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
                        {currentUser && <img onClick={() => setShowMoadal(true)} src={notificationIcon} alt=""/>}
                    </SC.RightSideItem>
                </SC.IconContainer>
            </SC.RightSideContainer>
        </SC.HeaderContainer>
    )
}
