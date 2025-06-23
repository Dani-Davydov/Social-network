import * as SC from './styles';
import {useEffect} from "react";
import {getRandomUsers} from "../../Redux/slices/usersSlice.js";
import {useDispatch, useSelector} from "react-redux";

export const RightSideBar = () => {
    const {mayKnownUsers} = useSelector((state) => state.users.mayKnownUsersList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRandomUsers());
    }, [dispatch]);

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