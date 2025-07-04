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
        toRequestsLoading: false,
    },
    fromRequestsList: {
        fromRequests: null,
        fromRequestsLoading: false,
    },
}

export const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getToRequests.pending, (state) => {
            state.toRequestsList = {
                toRequests: null,
                toRequestsLoading: true,
            }
        })

        builder.addCase(getToRequests.fulfilled, (state, action) => {
            state.toRequestsList = {
                toRequests: action.payload.toRequests,
                toRequestsLoading: false,
            }
        })

        builder.addCase(getFromRequests.pending, (state) => {
            state.fromRequestsList = {
                fromRequests: null,
                fromRequestsLoading: true,
            }
        })

        builder.addCase(getFromRequests.fulfilled, (state, action) => {
            state.fromRequestsList = {
                fromRequests: action.payload.fromRequests,
                fromRequestsLoading: false,
            }
        })
    }
})

// export const {} = requestsSlice.actions

export default requestsSlice.reducer