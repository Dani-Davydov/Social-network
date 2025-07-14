import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {postsApi} from "../../api/postsApi.js";
import {filtersAndPagin} from "../../helpers/filtersAndPagin.js";

export const getPosts = createAsyncThunk(
    'Posts/fetchUsers',
    async () => {
        return await postsApi.fetchPosts()
    }
)

export const getPostById = createAsyncThunk(
    'Posts/updatePostComent',
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

            return json.post;
        } catch (e) {
            console.log(e)
        }
    }
)

const initialState = {
    postFotViev: {
        post: null,
        loading: false,
    },
    postslist: {
        posts: null,
        filteredPosts: null,
        loading: false,
    },
    filtersParametrs: {
        searchInputValue: null,
        paginationInfo: {
            ActivePage: 0,
            pageCount: 0,
            perPage: 12
        },
        sort: "",
        friendsSort: ""
    },
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        updatePostsFiltersParametrs: (state, action) => {
            state.filtersParametrs = {
                ...state.filtersParametrs,
                ...action.payload
            };
        },

        filterPosts: (state, action) => {
            const { currentUser, users } = action.payload || {};

            state.postslist.filteredPosts = filtersAndPagin(
                state.filtersParametrs.searchInputValue,
                state.filtersParametrs.sort,
                state.filtersParametrs.paginationInfo,
                state.postslist.posts ? state.postslist.posts : [],
                "posts",
                currentUser,
                users,
                state.filtersParametrs.friendsSort
            );
        }
    },
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

        builder.addCase(getPostById.pending, (state) => {
            state.postFotViev = {
                post: null,
                loading: true,
            }
        })

        builder.addCase(getPostById.fulfilled, (state, action) => {
            state.postFotViev = {
                post: action.payload,
                loading: false,
            }
        });
    }
})

export const {filterPosts, updatePostsFiltersParametrs} = postsSlice.actions

export default postsSlice.reducer