import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {postsApi} from "../../api/postsApi.js";

export const getPosts = createAsyncThunk(
    'posts/fetchUsers',
    async () => {
        return await postsApi.fetchPosts()
    }
)

export const updatePostComent = createAsyncThunk(
    'posts/updatePostComent',
    async (bodyData) => {
        try {
            const res = await fetch("http://localhost:3002/api/posts/findById", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });

            const json = await res.json();

            if (!res.ok) {
                alert(json.message || "Ошибка");
                return null;
            }

            return json;
        } catch (e) {
            console.log(e)
        }
    }
)

const initialState = {
    postslist: {
        posts: null,
        loading: false,
    },
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state) => {
            state.postslist = {
                posts: null,
                loading: true,
            }
        })

        builder.addCase(getPosts.fulfilled, (state, action) => {
            const postsArr = [];

            const docs = action.payload;

            docs.forEach(doc => {
                doc.userPosts.forEach(post => {
                    postsArr.push({
                        ...post,
                        userId: doc.userId
                    });
                });
            });

            postsArr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            state.postslist = {
                posts: postsArr,
                loading: false,
            };
        });

        builder.addCase(updatePostComent.pending, (state) => {
            state.postslist = {
                posts: state.postslist.posts,
                loading: true,
            }
        })

        builder.addCase(updatePostComent.fulfilled, (state, action) => {
            if (action.payload?.post) {
                const updatedPost = action.payload.post;

                state.postslist.posts = state.postslist.posts.map(post =>
                    post._id === updatedPost._id ? { ...updatedPost, userId: post.userId } : post
                );
            }
            state.postslist.loading = false;
        });
    }
})

// export const {} = postsSlice.actions

export default postsSlice.reducer