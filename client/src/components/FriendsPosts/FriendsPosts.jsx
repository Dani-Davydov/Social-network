import {useDispatch, useSelector} from "react-redux";
import {filterPosts, updatePostsFiltersParametrs} from "../../Redux/slices/postsSlice.js";
import {Selector} from "../UI/Selector/Selector.jsx";

export const FriendsPosts = () => {
    const {friendsSort, paginationInfo} = useSelector((state) => state.posts.filtersParametrs);
    const currentUser = useSelector((state) => state.users.currentUser);
    const users = useSelector((state) => state.users.userList.users);
    const dispatch = useDispatch();

    const handleSelectChange = (value) => {
        dispatch(updatePostsFiltersParametrs({
            friendsSort: value,
            paginationInfo: { ...paginationInfo, ActivePage: 0 }
        }));
        dispatch(filterPosts({ currentUser, users }));
    }
    return (
        <div style={{ textAlign: "center" }} className="sortFriends">
            <Selector
                value={friendsSort}
                onChange={(e) => handleSelectChange(e.target.value)}
                className="input"
                id="sortFriends"
            >
                <option value="">All posts</option>
                <option value="friends">Friends posts</option>
            </Selector>
        </div>
    )
}