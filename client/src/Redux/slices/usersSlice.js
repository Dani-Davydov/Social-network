import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {filtersAndPagin} from "../../helpers/filtersAndPagin.js";
import {usersApi} from "../../api/usersApi.js";
import {localStorageHelper} from "../../helpers/localStorageHelper.js";

const {getLocalStorage, deleteLocalStorage} = localStorageHelper()

export const getUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        return await usersApi.fetchUsers()
    }
)

const initialState = {
    currentUser: null,
    userList: {
        users: null,
        filteredUsersBySearch: null,
        mayKnownUsers: null,
        loading: false,
    },
    filtersParametrs: {
        searchInputValue: "",
        paginationInfo: {
            ActivePage: 0,
            pageCount: 0,
            perPage: 14
        },
    },
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

        updateFiltersParametrs: (state, action) => {
            state.filtersParametrs = {
                ...state.filtersParametrs,
                ...action.payload
            };
        },

        filtrBySearchUser: (state) => {
            state.userList.filteredUsersBySearch = filtersAndPagin(
                state.filtersParametrs.searchInputValue,
                null,
                state.filtersParametrs.paginationInfo,
                state.userList.users ? state.userList.users : [],
                "users"
            )
        },

        generateRandomUsers: (state, action) => {
            const randomUsers = (users, count) => {
                const newUsers = [...users]
                const randomUsers = []

                do {
                    const randomNumber = Math.floor(Math.random() * newUsers.length)
                    randomUsers.push(newUsers.splice(randomNumber, 1)[0])
                } while (randomUsers.length < count && newUsers.length > 0)

                return randomUsers
            }

            if (!state.currentUser && action.payload === null) {
                state.userList.mayKnownUsers = randomUsers(state.userList.users || [], 3)
                return
            }

            const { toReq , fromReq } = action.payload

            const filteredUsers = (state.userList.users || []).filter(user => {
                if (user._id === state.currentUser?._id) {
                    return false;
                }

                const safeFromReq = Array.isArray(fromReq) ? fromReq : [];
                const safeToReq = Array.isArray(toReq) ? toReq : [];

                const hasActiveRequest =
                    safeFromReq.some(req =>
                        req?.toUserEmail === user.email &&
                        (req?.status === "expectation" || req?.status === "completed")
                    ) ||
                    safeToReq.some(req =>
                        req?.fromUserEmail === user.email &&
                        (req?.status === "expectation" || req?.status === "completed")
                    );

                return !hasActiveRequest;
            });

            state.userList.mayKnownUsers = randomUsers(filteredUsers, 3)
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

            state.userList = {
                users: filteredUsers,
                filteredUsersBySearch: filteredUsers,
                mayKnownUsers: null,
                loading: false,
            }
        })

    }
})

export const { login, logout, filtrBySearchUser, generateRandomUsers, updateFiltersParametrs } = usersSlice.actions

export default usersSlice.reducer