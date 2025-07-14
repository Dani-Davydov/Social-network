import {useEffect} from "react"
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {filterPosts, getPosts, updatePostsFiltersParametrs} from "../../Redux/slices/postsSlice.js";
import {Post} from "../../components/Post/Post.jsx";
import * as SC from "./styles.js";
import {Loader} from "../../components/UI/Loader/Loader.jsx";
import {Pagination} from "../../components/Pagination/Pagination.jsx";
import {Container} from "../../components/UI/Container/Container.jsx";
import {Sort} from "../../components/Sort/Sort.jsx";
import {FriendsPosts} from "../../components/FriendsPosts/FriendsPosts.jsx";
import {Sorts} from "./styles.js";

export const Posts = () => {
    const currentUser = useSelector((state) => state.users.currentUser);
    const {posts, loading, filteredPosts} = useSelector((state) => state.posts.postslist);
    const {paginationInfo} = useSelector((state) => state.posts.filtersParametrs);
    const users = useSelector((state) => state.users.userList.users);

    const dispatch = useDispatch();

    useEffect(() => {
        if (posts) {
            dispatch(updatePostsFiltersParametrs({
                paginationInfo: { ...paginationInfo, ActivePage: 0 }
            }));
            dispatch(filterPosts({ currentUser, users }));
        }
    }, [dispatch, posts, currentUser, users])

    useEffect(() => {
        if (!posts) {
            dispatch(getPosts())
        }
    }, [dispatch, posts]);

    if ((!posts && loading) || !users) {
        return <Loader/>
    }

    const checkPrivatStatus = (post) => {
        if (!currentUser) {
            return post.viewStatus === false;
        }
    
        if (currentUser.adminStatus === true) {
            return true;
        }
    
        if (post.viewStatus === false || post.userId === currentUser._id) {
            return true;
        }
    
        const ownerOfPost = users.find(user => user._id === post.userId);
        if (!ownerOfPost) return false;
    
        return ownerOfPost.friends?.some(friend => 
            friend.friendEmail === currentUser.email
        ) || false;
    };

    return(
        <Container>
            <SC.PostPageContainer>
                <div>
                    {filteredPosts && filteredPosts.length > 0 ? "Publications": "no matches found"}
                </div>
                <SC.SortAndConst>
                    {filteredPosts &&
                        <SC.Sorts>
                            <Sort/>
                            <FriendsPosts/>
                        </SC.Sorts>}
                    <SC.PostsContainer>
                        {filteredPosts && users ? filteredPosts.map(post => (
                            checkPrivatStatus(post) === true ? (
                                <Post
                                    key={post._id}
                                    post={post}
                                    currentUser={currentUser}
                                    ownerId={post.userId}
                                />
                            ) : null
                        )): null}
                    </SC.PostsContainer>
                </SC.SortAndConst>
                <Pagination paginationInfo={paginationInfo} updateFiltersParametrs={updatePostsFiltersParametrs} filterList={filterPosts}/>
            </SC.PostPageContainer>
        </Container>
    )
}
