import profileIcon from '../../icons/profileIcon.svg';
import findFriensIcon from '../../icons/findFriendsIcon.svg';
import sideBarSettingsIcon from '../../icons/sideBarSettingsIcon.svg';
import loginIcon from '../../icons/loginIcon.svg';
import logoutIcon from '../../icons/logoutIcon.svg';

export const LeftSideBar = () => {
    return (
        <div>
            <div>
                user info
            </div>
            <div>
                <div>Explore panel</div>
                <div>
                    <div>
                        <img src={profileIcon} alt=""/>
                        <div>Profile</div>
                    </div>
                    <div>
                        <img src={findFriensIcon} alt=""/>
                        <div>Find friends</div>
                    </div>
                </div>
            </div>
            <div>
                <div>Settings</div>
                <div>
                    <div>
                        <img src={sideBarSettingsIcon} alt=""/>
                        <div>Settings</div>
                    </div>
                    <div>
                        <img src={logoutIcon} alt=""/>
                        <div>Log out</div>
                    </div>
                    <div>
                        <img src={loginIcon} alt=""/>
                        <div>Log in</div>
                    </div>
                </div>
            </div>
        </div>
    )
}