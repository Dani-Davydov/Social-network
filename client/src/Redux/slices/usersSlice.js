import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {usersApi} from "../../api/usersApi.js";

const getLocalStorage = (key) => {
    try {
        const item = localStorage.getItem(key);
        if (!item || item === "undefined") return null;
        return JSON.parse(item);
    } catch (e) {
        console.log(e);
        return null;
    }
};

const deleteLocalStorage = (key) => {
    localStorage.removeItem(key);
}

export const getUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        return await usersApi.fetchUsers()
    }
)

export const getRandomUsers = createAsyncThunk(
    'users/fetchRandomUsers',
    async () => {
        return await usersApi.fetchRandomUsers()
    }
)


const initialState = {
    currentUser: null,
    mayKnownUsersList: {
        mayKnownUsers: null,
        loading: false,
    },
    userList: {
        users: null,
        loading: false,
    }
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login: (state, action) => {

            let currentUser = getLocalStorage(action.payload.key);

            if (!currentUser) {
                state.currentUser = null
            }

            state.currentUser = currentUser
        },
        logout: (state, action) => {
            deleteLocalStorage(action.payload);

            state.currentUser = null

        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.userList = {
                users: null,
                loading: true,
            }
        })

        builder.addCase(getUsers.fulfilled, (state, action) => {
            let filteredUsers = null

            console.log(state.currentUser)

            if (!state.currentUser) {
                filteredUsers = action.payload;
            } else {
                console.log(state.currentUser)
                filteredUsers = action.payload.filter(user => user._id !== state.currentUser._id)
            }

            state.userList = {
                users: filteredUsers,
                loading: false,
            }
        })

        builder.addCase(getRandomUsers.pending, (state) => {
            state.mayKnownUsersList = {
                mayKnownUsers: null,
                loading: true,
            }
        })

        builder.addCase(getRandomUsers.fulfilled, (state, action) => {
            state.mayKnownUsersList = {
                mayKnownUsers: action.payload,
                loading: false,
            }
        })
    }
})

export const { login, logout } = usersSlice.actions

export default usersSlice.reducer