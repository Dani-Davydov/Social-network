import * as SC from './styles';
import {useEffect} from "react";
import {getUsers} from "../../Redux/slices/usersSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {Loader} from "../UI/Loader/Loader.jsx";

export const RightSideBar = () => {
    const userList = useSelector((state) => state.users.userList);git
    const dispatch = useDispatch();

    const {mayKnownUsers, loading} = userList

    useEffect(() => {
        if (!mayKnownUsers) {
            dispatch(getUsers());
        }
    }, [dispatch, mayKnownUsers]);

    if (!mayKnownUsers && loading) {
        return <Loader/>
    }

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