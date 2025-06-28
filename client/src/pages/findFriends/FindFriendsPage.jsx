import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getUsers, login} from "../../Redux/slices/usersSlice.js";
import * as SC from "./styles";
import {useFetch} from "../../hooks/useFetch.js";
import {getFromRequests, getToRequests} from "../../Redux/slices/requestsSlice.js";
import {Loader} from "../../components/UI/Loader/Loader.jsx";

export const FindFriendsPage = () => {
    const {users, loading, filteredUsersBySearch} = useSelector((state) => state.users.userList);
    const {fromRequests} = useSelector((state) => state.requests.fromRequestsList);
    const {toRequests} = useSelector((state) => state.requests.toRequestsList);
    const currentUser = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch();
    const fetch = useFetch();

    useEffect(() => {
        if (!currentUser) {
            dispatch(login({key: "currentUser"}))
        }
    }, [dispatch, currentUser]);

    useEffect(() => {
        if (!fromRequests) {
            if (currentUser?.email) {
                dispatch(getFromRequests({ fromUserEmail: currentUser.email }));
            }
        }
        if (!toRequests) {
            if (currentUser?.email) {
                dispatch(getToRequests({ toUserEmail: currentUser.email }));
            }
        }
    }, [currentUser?.email, dispatch, fromRequests, toRequests]);

    useEffect(() => {
        if (!users) {
            dispatch(getUsers());
        }
    }, [dispatch, users]);

    if (!users && loading) {
        return <Loader/>
    }

    const addFriendRequest = async (toEmail, toName, toSurname) => {
        await fetch(
            "http://localhost:3002/api/friendRequest/add",
            {
                fromUserEmail: currentUser.email,
                toUserEmail: toEmail,
                extraInfoFrom: {
                    fromName: currentUser.name,
                    fromSurname: currentUser.surname,
                },
                extraInfoTo: {
                    toName: toName,
                    toSurname: toSurname,
                },
            },
            "POST"
        )

        dispatch(getFromRequests( {fromUserEmail: currentUser.email}));
    }


    const checkStatus = (user) => {
        if (!user?.email) {
            return "Добавить в друзья";
        }

        if (fromRequests) {
            const sentRequest = fromRequests.find(req => req.toUserEmail === user.email);
            if (sentRequest) {
                if (sentRequest.status) {
                    return {text: "Уже друзья", disabled: true};
                } else return {text: "Ожидает ответа", disabled: false}
            }
        }

        if (toRequests) {
            const receivedRequest = toRequests.find(req => req.fromUserEmail === user.email);
            if (receivedRequest) {
                if (receivedRequest.status) {
                    return {text: "Уже друзья", disabled: true};
                } else return {text: "Ожидает вашего ответа", disabled: false}
            }
        }

        return {text: "Добавить в друзья", disabled: false};
    }

    return (
        <SC.FindFriends>
            <div>Find friends</div>
            <SC.FriendsList>
                {filteredUsersBySearch ? filteredUsersBySearch.map((user) => (
                    <SC.FriendItem key={user._id}>
                        <div>
                            <div>{user.name}</div>
                            <div>{user.surname}</div>
                        </div>
                        {currentUser &&
                            <SC.AddFriendButton disabled={checkStatus(user).disabled}
                                    onClick={() => addFriendRequest(user.email, user.name, user.surname)}>
                                {checkStatus(user).text}
                            </SC.AddFriendButton>
                        }
                    </SC.FriendItem>
                )) : "no friends"}
            </SC.FriendsList>
        </SC.FindFriends>
    )
}
