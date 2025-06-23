import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const getToRequests = createAsyncThunk(
    'requests/getToRequests',
    async (bodyData) => {
        try {
            const res = await fetch("http://localhost:3002/api/friendRequest/getToReq", {
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

export const getFromRequests = createAsyncThunk(
    'requests/getFromRequests',
    async (bodyData) => {
        try {
            const res = await fetch("http://localhost:3002/api/friendRequest/getFromReq", {
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
    toRequestsList: {
        toRequests: null,
        loading: false,
    },
    fromRequestsList: {
        fromRequests: null,
        loading: false,
    },
}

export const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        sort: (state, action) => {
            //sort
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getToRequests.pending, (state) => {
            state.toRequestsList = {
                toRequests: null,
                loading: true,
            }
        })

        builder.addCase(getToRequests.fulfilled, (state, action) => {
            state.toRequestsList = {
                toRequests: action.payload.toRequests,
                loading: false,
            }
        })

        builder.addCase(getFromRequests.pending, (state) => {
            state.fromRequestsList = {
                fromRequests: null,
                loading: true,
            }
        })

        builder.addCase(getFromRequests.fulfilled, (state, action) => {
            state.fromRequestsList = {
                fromRequests: action.payload.fromRequests,
                loading: false,
            }
        })
    }
})

export const {sort} = requestsSlice.actions

export default requestsSlice.reducer