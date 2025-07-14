import * as SC from './styles.js';
import {useEffect} from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {getUsers, generateRandomUsers} from "../../../Redux/slices/usersSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {getFromRequests} from "../../../Redux/slices/requestsSlice.js";
import {Loader} from "../../UI/Loader/Loader.jsx";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import {TooltipWrapper} from "../../UI/TooltipWrapper/TooltipWrapper.jsx";
import {IconBtn} from "../../UI/IconBtn/IconBtn.jsx";
import {useFetch} from "../../../hooks/useFetch.js";

export const RightSideBar = () => {
    const {mayKnownUsers, users, loading} = useSelector((state) => state.users.userList)
    const currentUser = useSelector((state) => state.users.currentUser)
    const {fromRequests, fromRequestsLoading} = useSelector((state) => state.requests.fromRequestsList)
    const {toRequests, toRequestsLoading} = useSelector((state) => state.requests.toRequestsList)
    const dispatch = useDispatch()

    const fetch = useFetch();

    useEffect(() => {
        if (!users && !loading) {
            dispatch(getUsers())
        }
    }, [dispatch, users, loading])

    useEffect(() => {
        if (!fromRequests) {
            if (currentUser?.email) {
                dispatch(getFromRequests({ fromUserEmail: currentUser.email }));
            }
        }
    }, [currentUser?.email, dispatch, fromRequests]);

    useEffect(() => {
        if (!users) return

        if (!currentUser) {
            if (!mayKnownUsers?.length) {
                dispatch(generateRandomUsers(null))
            }
            return
        }

        if ((fromRequests?.length || toRequests?.length) && !mayKnownUsers?.length) {
            dispatch(generateRandomUsers({
                toReq: toRequests || [],
                fromReq: fromRequests || []
            }))
        }
    }, [dispatch, users, currentUser, fromRequests, toRequests, mayKnownUsers])

    if (!users || loading || (currentUser && (toRequestsLoading || fromRequestsLoading))) {
        return <Loader />
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
            return <PersonAddIcon sx={{color: 'black'}}/>;
        }

        if (fromRequests) {
            const sentRequest = fromRequests.find(req => req.toUserEmail === user.email);
            if (sentRequest) {
                if (sentRequest.status === "expectation") {
                    return {icon: <HourglassBottomIcon/>, disabled: true, title: "awaiting response"}
                }
            }
        }

        if (toRequests) {
            const receivedRequest = toRequests.find(req => req.fromUserEmail === user.email);
            if (receivedRequest) {
                if (receivedRequest.status === "expectation") {
                    return {icon: <HourglassBottomIcon/>, disabled: true, title: "awaiting response"};
                }
            }
        }

        return {icon: <PersonAddIcon sx={{color: 'black'}}/>, disabled: false, title: "Add to friends"};
    }

    return (
        <SC.RightSideBarContainer>
            <SC.MayKnownUserContainer>
                <div>People you may know</div>
                <SC.UserContainer>
                    {mayKnownUsers && mayKnownUsers.map(user => {
                        const {disabled, icon, title} = checkStatus(user)

                        return (<SC.userContainer key={user._id}>
                            <div>
                                <div>{user.name}</div>
                                <div>{user.surname}</div>
                            </div>
                            {currentUser &&
                                <TooltipWrapper title={title}>
                                    <IconBtn icon={icon} disabled={disabled}
                                                onClick={() => addFriendRequest(user.email, user.name, user.surname)}>
                                    </IconBtn>
                                </TooltipWrapper>}
                        </SC.userContainer>)
                    })}
                </SC.UserContainer>
            </SC.MayKnownUserContainer>
        </SC.RightSideBarContainer>
    )
}
