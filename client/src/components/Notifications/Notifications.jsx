import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getToRequests} from "../../Redux/slices/requestsSlice.js";
import {useFetch} from "../../hooks/useFetch.js";
import {useNavigate} from "react-router-dom";
import {Loader} from "../UI/Loader/Loader.jsx";
import * as SC from "./styles.js";

export const Notifications = () => {
    const {toRequests, loading} = useSelector((state) => state.requests.toRequestsList);
    const currentUser = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetch = useFetch();

    useEffect(() => {
        dispatch(getToRequests({toUserEmail: currentUser.email}))
    }, []);

    if (!toRequests && loading) {
        return <Loader/>
    }

    const sendedRequestUsers = async (reqId, friendEmail, friendName, friendSurname) => {
        console.log(friendEmail)
        console.log(friendName)
        console.log(friendSurname)

        await fetch(
            "http://localhost:3002/api/friendRequest/chengeRequestStatus",
            {
                id: reqId
            },
            "PATCH"
        )

        await fetch(
            "http://localhost:3002/api/users/addFriend",
            {
                friendEmail: friendEmail,
                friendName: friendName,
                friendSurname: friendSurname,
                currentUserEmail: currentUser.email,
                currentUserName: currentUser.name,
                currentUserSurname: currentUser.surname,
            },
            "PATCH"
        )

        navigate("/")
    }

    const checkRequests = () => {
        if (!toRequests) {
            return
        }

        const iaAllApplyed = toRequests.forEach(request => {
            request.status === true
        })

        iaAllApplyed === true ? true : false;
    }

    return (
        <div>
            {checkRequests() == false ?
                <SC.Notifications>
                    {toRequests.map((request, index) => (
                        request.status === false ?
                        <SC.Notification key={index}>
                            <div>{request.extraInfoFrom.fromName}</div>
                            <div>{request.extraInfoFrom.fromSurname}</div>
                            <button onClick={() => sendedRequestUsers(
                                request._id,
                                request.fromUserEmail,
                                request.extraInfoFrom.fromName,
                                request.extraInfoFrom.fromSurname
                            )}>add to friends</button>
                        </SC.Notification> : null
                    ))}
                </SC.Notifications>
            : "no fresh requests"}
        </div>
    )
}