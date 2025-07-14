import logo from '../../../assets/logo.svg';
import notificationIcon from '../../../assets/notification.svg';
import * as SC from './styles.js';
import {NavLink} from 'react-router-dom';
import {routerPathes} from "../../../constans/routerPathes.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState, useMemo, useCallback} from "react";
import {login, updateFiltersParametrs, filtrBySearchUser} from "../../../Redux/slices/usersSlice.js";
import {filterPosts, updatePostsFiltersParametrs} from '../../../Redux/slices/postsSlice.js'
import {Modal} from "../Modal/Modal.jsx";
import {Notifications} from "../../Notifications/Notifications.jsx";
import { useLocation } from "react-router-dom";
import {getToRequests} from "../../../Redux/slices/requestsSlice.js";
import SearchIcon from '@mui/icons-material/Search';
import {Loader} from "../Loader/Loader.jsx";

export const Header = () => {
    const [showMoadal, setShowMoadal] = useState(false);
    const [inputValue, setInputValue] = useState("");
    
    const {posts, findFriends} = routerPathes

    const currentUser = useSelector((state) => state.users.currentUser);
    const {toRequests, toRequestsLoading} = useSelector((state) => state.requests.toRequestsList);
    const dispatch = useDispatch();

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === posts) {
            dispatch(updatePostsFiltersParametrs({ searchInputValue: '' }));
            dispatch(filterPosts());
        } else if (location.pathname === findFriends) {
            dispatch(updateFiltersParametrs({ searchInputValue: '' }));
            dispatch(filtrBySearchUser());
        }

        setInputValue("");
    }, [location.pathname, dispatch, findFriends]);

    useEffect(() => {
        if (!currentUser) {
            dispatch(login({key: "currentUser"}))
        }
    }, [dispatch, currentUser]);

    useEffect(() => {
        if (!toRequests) {
            if (currentUser?.email) {
                dispatch(getToRequests({toUserEmail: currentUser.email}))
            }
        }
    }, [currentUser?.email, dispatch, toRequests]);


    const debounce = (func, delay) => {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    };


    const debounceFilter = useCallback((value) => {
        if (location.pathname === findFriends) {
            dispatch(updateFiltersParametrs({
                searchInputValue: value
            }));
            dispatch(filtrBySearchUser())
        } else if (location.pathname === posts) {
            dispatch(updatePostsFiltersParametrs({
                searchInputValue: value
            }));
            dispatch(filterPosts())
        }
    }, [dispatch, location.pathname]);

    const debouncedFilter = useMemo(() => debounce(debounceFilter, 500), [debounceFilter]);

    const onChange = (value) => {
        setInputValue(value);

        if (location.pathname === findFriends) {
            dispatch(updateFiltersParametrs({
                searchInputValue: value
            }));
        } else if (location.pathname === posts) {
            dispatch(updatePostsFiltersParametrs({
                searchInputValue: value
            }));
        }

        debouncedFilter(value)
    }

    if (currentUser && toRequestsLoading) {
        return <Loader/>
    }

    const checkNotificationsCount = () => {
        if (!toRequests) {
            return 0
        }

        const newNotifications = toRequests.filter(req => req.status === "expectation")

        if (newNotifications.length > 0) {
            return newNotifications.length
        } else return 0
    }

    return (
        <SC.HeaderContainer className="headerContainer">
            {showMoadal &&
                <Modal title={"Notifications"} setShowMoadal={setShowMoadal}>
                    <Notifications setShowMoadal={setShowMoadal}/>
                </Modal>
            }
            <SC.LeftSideContainer>
                <NavLink to={posts}>
                    <div>
                        <img src={logo} alt="logo"/>
                    </div>
                </NavLink>
                {location.pathname === posts || location.pathname === findFriends ?
                    <SC.SearchContainer>
                        <SC.SearchLable>
                            <SearchIcon/>
                            <SC.SearchInput
                                value={inputValue}
                                onChange={(e) => onChange(e.target.value)}
                                name="findFriends"
                                placeholder="Search..."
                                type="text"
                            />
                        </SC.SearchLable>
                    </SC.SearchContainer> : null
                }
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
                    {currentUser && <SC.NotifiCationsCount>{checkNotificationsCount()}</SC.NotifiCationsCount>}
                </SC.IconContainer>
            </SC.RightSideContainer>
        </SC.HeaderContainer>
    )
}
