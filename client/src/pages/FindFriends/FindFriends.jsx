import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {login} from "../../Redux/slices/usersSlice.js";
import {updateFiltersParametrs, filtrBySearchUser} from "../../Redux/slices/usersSlice.js";
import * as SC from "./styles";
import {useFetch} from "../../hooks/useFetch.js";
import {getFromRequests} from "../../Redux/slices/requestsSlice.js";
import {Loader} from "../../components/UI/Loader/Loader.jsx";
import {Pagination} from "../../components/Pagination/Pagination.jsx";
import {Container} from "../../components/UI/Container/Container.jsx";
import {TooltipWrapper} from "../../components/UI/TooltipWrapper/TooltipWrapper.jsx";
import {IconBtn} from "../../components/UI/IconBtn/IconBtn.jsx";
import {useToast} from "../../hooks/useToast.js";

export const FindFriends = () => {
    const {users, loading, filteredUsersBySearch } = useSelector((state) => state.users.userList);
    const {paginationInfo} = useSelector((state) => state.users.filtersParametrs);
    const {fromRequests, fromRequestsLoading} = useSelector((state) => state.requests.fromRequestsList);
    const {toRequests, toRequestsLoading} = useSelector((state) => state.requests.toRequestsList);
    const currentUser = useSelector((state) => state.users.currentUser);

    const toast = useToast()
    const dispatch = useDispatch();
    const fetch = useFetch();

    useEffect(() => {
        if (users) {
            dispatch(filtrBySearchUser());
        }
    }, [dispatch, users]);

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
    }, [currentUser?.email, dispatch, fromRequests]);

    if (!users || loading || toRequestsLoading || fromRequestsLoading) {
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

        toast("success", "request has been sent")
        dispatch(getFromRequests( {fromUserEmail: currentUser.email}));
    }


    const checkStatus = (user) => {
        if (!user?.email) {
            return <PersonAddIcon sx={{color: 'black'}}/>;
        }

        if (fromRequests) {
            const sentRequest = fromRequests.find(req => req.toUserEmail === user.email);
            if (sentRequest) {
                if (sentRequest.status === "completed") {
                    return {icon: <OfflinePinIcon/>, disabled: true, title: "Already friends"};
                } else return {icon: <HourglassBottomIcon/>, disabled: true, title: "awaiting response"}
            }
        }

        if (toRequests) {
            const receivedRequest = toRequests.find(req => req.fromUserEmail === user.email);
            if (receivedRequest) {
                if (receivedRequest.status === "completed") {
                    return {icon: <OfflinePinIcon/>, disabled: true, title: "Already friends"};
                } else return {icon: <HourglassBottomIcon/>, disabled: true, title: "awaiting response"}
            }
        }

        return {icon: <PersonAddIcon sx={{color: 'black'}}/>, disabled: false, title: "Add to friends"};
    }

    return (
        <Container>
            <SC.FindFriends>
                <div>
                    {filteredUsersBySearch && filteredUsersBySearch.length > 0 ? "Find friends ": "no matches found"}
                </div>
                <SC.FriendsList>
                    {filteredUsersBySearch ? filteredUsersBySearch.map((user) => {
                        const {disabled, icon, title} = checkStatus(user)

                        return (<SC.FriendItem key={user._id}>
                            <div>
                                <div>{user.name}</div>
                                <div>{user.surname}</div>
                            </div>
                            {currentUser &&
                                <TooltipWrapper title={title}>
                                    <IconBtn icon={icon} disabled={disabled}
                                                onClick={() => addFriendRequest(user.email, user.name, user.surname)}>
                                    </IconBtn>
                                </TooltipWrapper>
                            }
                        </SC.FriendItem>)
                    }) : "no friends"}
                </SC.FriendsList>
                <Pagination paginationInfo={paginationInfo} updateFiltersParametrs={updateFiltersParametrs} filterList={filtrBySearchUser}/>
            </SC.FindFriends>
        </Container>
    )
}
