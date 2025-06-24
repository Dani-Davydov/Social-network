import profileIcon from '../../icons/profileIcon.svg';
import findFriensIcon from '../../icons/findFriendsIcon.svg';
import loginIcon from '../../icons/loginIcon.svg';
import logoutIcon from '../../icons/logoutIcon.svg';
import registerIcon from '../../icons/registration.png';
import * as SC from './styles';
import {useDispatch, useSelector} from "react-redux";
import {getUsers, logout} from "../../Redux/slices/usersSlice.js";
import {useNavigate} from "react-router-dom";

export const LeftSideBar = () => {
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(logout("currentUser"))
        dispatch(getUsers());
        navigate("/auth")
    }

    return (
        <SC.LeftSideBarContainer>
            <SC.PanelContainer>
                <SC.PanelItemsContainer>
                    <SC.sectionTitle>Explore panel</SC.sectionTitle>
                        {currentUser &&
                            <SC.ItemsContainer>
                                <SC.NavigateLink to={'/userProfile'}>
                                    <img src={profileIcon} alt=""/>
                                    <div>Profile</div>
                                </SC.NavigateLink>
                            </SC.ItemsContainer>
                        }
                        <SC.ItemsContainer>
                            <SC.NavigateLink to={'/findFriends'}>
                                <img src={findFriensIcon} alt=""/>
                                <div>Find friends</div>
                            </SC.NavigateLink>
                        </SC.ItemsContainer>
                </SC.PanelItemsContainer>
                <SC.PanelItemsContainer>
                    <SC.sectionTitle>Control</SC.sectionTitle>
                        {currentUser && <SC.ItemsContainer>
                            <SC.LogOut onClick={() => logOut()}>
                                <img src={logoutIcon} alt=""/>
                                <SC.sectionTitle>Log out</SC.sectionTitle>
                            </SC.LogOut>
                        </SC.ItemsContainer>}
                        {!currentUser && <SC.ItemsContainer>
                            <SC.NavigateLink to={'/auth'}>
                                <img src={loginIcon} alt=""/>
                                <div>Log in</div>
                            </SC.NavigateLink>
                        </SC.ItemsContainer>}
                        {!currentUser && <SC.ItemsContainer>
                            <SC.NavigateLink to={'/regestration'}>
                                <SC.regestrationIcon src={registerIcon} alt=""/>
                                <div>Regestretion</div>
                            </SC.NavigateLink>
                        </SC.ItemsContainer>}
                </SC.PanelItemsContainer>
            </SC.PanelContainer>
        </SC.LeftSideBarContainer>
    )
}