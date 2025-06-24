import {useState, useEffect} from "react"
import {useFetch} from "../../hooks/useFetch.js";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {getPosts} from "../../Redux/slices/postsSlice.js";
import writePostIcon from "../../icons/writePost.svg";
import {getUsers} from "../../Redux/slices/usersSlice.js";
import {Form} from "../../components/UI/Form/Form.jsx";
import {Input} from "../../components/UI/Input/Input.jsx";
import {Post} from "../../components/Post/Post.jsx";
import {FormBtn} from "../../components/UI/FormBtn/FormBtn.jsx";
import * as SC from "./styles.js";
import {Loader} from "../../components/UI/Loader/Loader.jsx";

const DEFAULT_STATE = {title: "", body: ""}

export const PostsPage = () => {
    const currentUser = useSelector((state) => state.users.currentUser);
    const {posts, loading} = useSelector((state) => state.posts.postslist);
    const users = useSelector((state) => state.users.userList.users);

    const [formValues, setFormValues] = useState(DEFAULT_STATE);
    const [showComments, setShowComments] = useState({});
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const dispatch = useDispatch();

    const fetch = useFetch();

    useEffect(() => {
        if (!posts) {
            dispatch(getPosts())
        }
    }, [dispatch, posts]);

    useEffect(() => {
        if (!users) {
            dispatch(getUsers());
        }
    }, [dispatch, users]);

    if (!posts && loading) {
        return <Loader/>
    }


    const onChange = (name, value) => {
        setFormValues({...formValues, [name]: value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        console.log(isChecked);

        await fetch(
            "http://localhost:3002/api/posts/add",
            {
                userId: String(currentUser._id),
                postData: {
                    title: formValues.title,
                    content: formValues.body,
                    viewStatus: isChecked
                },
            },
            "POST"
        )

        dispatch(getPosts());

        setFormValues(DEFAULT_STATE)
        setIsChecked(false)
    }

    const disabled = !formValues.title || !formValues.body;

    const openComentForm = (postId)  => {
        setShowCommentForm(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    }

    const toggleComments = (postId) => {
        setShowComments(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const deletePost = async (postId, userId) => {
        await fetch(
            "http://localhost:3002/api/posts/delete",
            {
                userId: userId,
                id: postId,
            },
            "DELETE"
        )

        dispatch(getPosts());
    }

    const checkPrivatStatus = (post) => {
        if (currentUser.adminStatus === true) {
            return true
        }

        if (post.viewStatus === false) return true;

        if (post.userId === currentUser._id) return true;

        const ownerOfPost = users.find(user => user._id === post.userId);
        if (!ownerOfPost) return false;

        return ownerOfPost.friends?.some(friend =>
            friend.friendEmail === currentUser.email
        ) || false;
    };

    return(
        <SC.PostPageContainer>
            {currentUser &&
                <Form onSubmit={onSubmit} action="">
                    <div>
                        <img src={writePostIcon} alt=""/>
                    </div>
                        <Input
                            height={"title"}
                            name='title'
                            placeholder="Write title here..."
                            type="text"
                            value={formValues.title}
                            onChange={(e) => onChange(e.target.name, e.target.value)}
                        />
                        <Input
                            height={"content"}
                            name='body'
                            placeholder="Write something here..."
                            value={formValues.body}
                            onChange={(e) => onChange(e.target.name, e.target.value)}>
                        </Input>
                    <div>
                        <input
                            type="checkbox"
                            id="scales"
                            checked={!isChecked ? true : false}
                            onChange={() => setIsChecked(false)}
                        />
                        <label htmlFor="scales">All</label>

                        <input
                            type="checkbox"
                            id="horns"
                            checked={isChecked ? true : false}
                            onChange={() => setIsChecked(true)}
                        />
                        <label htmlFor="horns">For friends</label>
                    </div>
                    <FormBtn title={"Save"} disabled={disabled} type='submit'>Save</FormBtn>
                </Form>
            }
            <SC.PostsContainer>
                {posts && users ? posts.map(post => (
                        checkPrivatStatus(post) === true ? (
                        <Post
                            key={post._id}
                            post={post}
                            currentUser={currentUser}
                            openComentForm={openComentForm}
                            toggleComments={toggleComments}
                            deletePostFunc={deletePost}
                            showCommentForm={showCommentForm}
                            ownerId={post.userId}
                            setShowCommentForm={setShowCommentForm}
                            showComments={showComments}
                        />
                        ) : null
                    )): null}
            </SC.PostsContainer>
        </SC.PostPageContainer>
    )
}