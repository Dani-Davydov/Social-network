import logo from '../../icons/logo.svg';
import searchIcon from '../../icons/search.svg';
import changeThemeIcon from '../../icons/changeTheme.svg';
import notificationIcon from '../../icons/notification.svg';
import settingsIcon from '../../icons/settings.svg';
import * as SC from './styles';

export const Header = () => {


    return (
        <SC.HeaderContainer className="headerContainer">
            <SC.LeftSideContainer>
                <div>
                    <img src={logo} alt="logo"/>
                </div>
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
                <div>user info</div>
                <SC.IconContainer>
                    <SC.RightSideItem>
                        <img src={settingsIcon} alt=""/>
                    </SC.RightSideItem>
                    <SC.RightSideItem>
                        <img src={changeThemeIcon} alt=""/>
                    </SC.RightSideItem>
                    <SC.RightSideItem>
                        <img src={notificationIcon} alt=""/>
                    </SC.RightSideItem>
                </SC.IconContainer>
            </SC.RightSideContainer>
        </SC.HeaderContainer>
    )
}