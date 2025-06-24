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

const initialState = {
    userList: {
        users: null,
        mayKnownUsers: null,
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
                mayKnownUsers: null,
                loading: true,
            }
        })

        builder.addCase(getUsers.fulfilled, (state, action) => {
            let filteredUsers = null

            if (!state.currentUser) {
                filteredUsers = action.payload;
            } else {
                filteredUsers = action.payload.filter(user => user._id !== state.currentUser._id)
            }

            const generateRandomUsers = (users, count) => {
                const newProducts = [...users]

                const randomUsers = [];

                do {
                    const randomNumber = Math.floor(Math.random() * newProducts.length)
                    randomUsers[randomUsers.length] = newProducts.splice(
                        randomNumber, 1)[0]
                } while (randomUsers.length < count)

                return randomUsers
            }

            state.userList = {
                users: filteredUsers,
                mayKnownUsers: generateRandomUsers(filteredUsers, 3),
                loading: false,
            }
        })

    }
})

export const { login, logout } = usersSlice.actions

export default usersSlice.reducer