import {useDispatch, useSelector} from "react-redux";
import {getToRequests} from "../../Redux/slices/requestsSlice.js";
import {Icon} from "../../constans/stylesConstant.js"
import {useFetch} from "../../hooks/useFetch.js";
import {useToast} from "../../hooks/useToast.js";
import AddIcon from '@mui/icons-material/Add';
import * as SC from "./styles.js";
import {TooltipWrapper} from "../UI/TooltipWrapper/TooltipWrapper.jsx";

export const Notifications = ({setShowMoadal}) => {
    const {toRequests} = useSelector((state) => state.requests.toRequestsList);
    const currentUser = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch();

    const toast = useToast()
    const fetch = useFetch();

    const sendedRequestUsers = async (reqId, friendEmail, friendName, friendSurname) => {
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

        toast("success", `${friendName} ${friendSurname} has been added`);
        dispatch(getToRequests({ toUserEmail: currentUser.email }));
        setShowMoadal(false)
    }

    const checkNotifications = () => {
        if (!toRequests) {
            return false
        }

        const newNotifications = toRequests.filter(req => req.status === "expectation")

        if (newNotifications.length > 0) {
            return true
        } else return false
    }

    return (
        <div>
                {checkNotifications() === true ? <SC.Notifications>
                    {toRequests.map((request, index) => (
                        request.status === "expectation" ?
                        <SC.Notification key={index}>
                            <div>{request.extraInfoFrom.fromName}</div>
                            <div>{request.extraInfoFrom.fromSurname}</div>
                            <TooltipWrapper title={"apply request"}>
                                <AddIcon sx={Icon} onClick={() => sendedRequestUsers(
                                    request._id,
                                    request.fromUserEmail,
                                    request.extraInfoFrom.fromName,
                                    request.extraInfoFrom.fromSurname
                                )}>add to friends</AddIcon>
                            </TooltipWrapper>
                        </SC.Notification> : null
                    ))}
                </SC.Notifications> : "no fresh requests"}
        </div>
    )
}
