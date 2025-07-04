import * as SC from './styles';
import {useEffect} from "react";
import {getUsers} from "../../Redux/slices/usersSlice.js";
import {useDispatch, useSelector} from "react-redux";

export const RightSideBar = () => {
    const mayKnownUsers = useSelector((state) => state.users.userList.mayKnownUsers);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!mayKnownUsers) {
            dispatch(getUsers());
        }
    }, [dispatch, mayKnownUsers]);

    return (
        <SC.RightSideBarContainer>
            <SC.MayKnownUserContainer>
                <div>People you may know</div>
                <SC.UserContainer>
                    {mayKnownUsers && mayKnownUsers.map(user => (
                        <SC.userContainer key={user._id}>
                            <div>{user.name}</div>
                            <div>{user.surname}</div>
                        </SC.userContainer>
                    ))}
                </SC.UserContainer>
            </SC.MayKnownUserContainer>
        </SC.RightSideBarContainer>
    )
}