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
        filteredUsersBySearch: null,
        mayKnownUsers: null,
        loading: false,
    },
    searchInputValue: null,
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

        updateSearch: (state, action) => {
            state.searchInputValue = action.payload;
        },

        filtrBySearchUser: (state) => {
            const filterBySearchValue = (users, value) => {
                return users.filter((user) => {
                    return user.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || user.surname.toLocaleLowerCase().includes(value.toLocaleLowerCase())
                })
            }

            const filterList = (searchValue) => {
                let filteredUsers = [...state.userList.users]

                if (searchValue) {
                    filteredUsers = filterBySearchValue(filteredUsers, searchValue)
                }

                return filteredUsers
            }

            state.userList.filteredUsersBySearch = filterList(state.searchInputValue)
        }
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

            const mayKnownUsers = state.userList.mayKnownUsers || generateRandomUsers(filteredUsers, 3);

            state.userList = {
                users: filteredUsers,
                filteredUsersBySearch: filteredUsers,
                mayKnownUsers: mayKnownUsers,
                loading: false,
            }
        })

    }
})

export const { login, logout, filtrBySearchUser, updateSearch } = usersSlice.actions

export default usersSlice.reducer