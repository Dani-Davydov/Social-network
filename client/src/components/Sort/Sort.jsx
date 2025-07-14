import {useDispatch, useSelector} from "react-redux";
import {filterPosts, updatePostsFiltersParametrs} from "../../Redux/slices/postsSlice.js";
import {Selector} from "../UI/Selector/Selector.jsx";

export const Sort = () => {
    const {sort, paginationInfo} = useSelector((state) => state.posts.filtersParametrs);
    const currentUser = useSelector((state) => state.users.currentUser);
    const users = useSelector((state) => state.users.userList.users);
    const dispatch = useDispatch();

    const handleSelectChange = (value) => {
        dispatch(updatePostsFiltersParametrs({
            sort: value,
            paginationInfo: { ...paginationInfo, ActivePage: 0 }
        }));
        dispatch(filterPosts({ currentUser, users }));
    }

    return (
        <div style={{ textAlign: "center" }} className="sort">
            <Selector value={sort} onChange={(e) => handleSelectChange(e.target.value)} className="input" id="sort">
                <option value="">Relevance</option>
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
            </Selector>
        </div>
    )
}