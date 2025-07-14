import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ArticleIcon from '@mui/icons-material/Article';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import * as SC from './styles.js';
import {routerPathes} from "../../../constans/routerPathes.js";
import {useDispatch, useSelector} from "react-redux";
import {getUsers, logout} from "../../../Redux/slices/usersSlice.js";
import {useNavigate} from "react-router-dom";
import {IconStyles} from "../../../constans/stylesConstant.js";

export const LeftSideBar = () => {
    const navigate = useNavigate();

    const {findFriends, posts, registration, writePost, main} = routerPathes

    const currentUser = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(logout("currentUser"))
        dispatch(getUsers());
        navigate("/")
    }

    return (
        <SC.LeftSideBarContainer>
            <SC.PanelContainer>
                <SC.PanelItemsContainer>
                        <SC.ItemsContainer>
                            <SC.NavigateLink to={findFriends}>
                                <Diversity3Icon sx={IconStyles}/>
                                <div>Find friends</div>
                            </SC.NavigateLink>
                        </SC.ItemsContainer>
                        {currentUser && <SC.ItemsContainer>
                            <SC.NavigateLink to={writePost}>
                                <RateReviewIcon sx={IconStyles}/>
                                <div>Write post</div>
                            </SC.NavigateLink>
                        </SC.ItemsContainer>}
                        <SC.ItemsContainer>
                            <SC.NavigateLink to={posts}>
                                <ArticleIcon sx={IconStyles}/>
                                <div>Publications</div>
                            </SC.NavigateLink>
                        </SC.ItemsContainer>
                    {currentUser && <SC.ItemsContainer>
                        <SC.LogOut onClick={() => logOut()}>
                            <LogoutIcon sx={IconStyles}/>
                            <div>Log out</div>
                        </SC.LogOut>
                    </SC.ItemsContainer>}
                    {!currentUser && <SC.ItemsContainer>
                        <SC.NavigateLink to={main}>
                            <LoginIcon sx={IconStyles}/>
                            <div>Log in</div>
                        </SC.NavigateLink>
                    </SC.ItemsContainer>}
                    {!currentUser && <SC.ItemsContainer>
                        <SC.NavigateLink to={registration}>
                            <AppRegistrationIcon sx={IconStyles}/>
                            <div>Registration</div>
                        </SC.NavigateLink>
                    </SC.ItemsContainer>}
                </SC.PanelItemsContainer>
            </SC.PanelContainer>
        </SC.LeftSideBarContainer>
    )
}