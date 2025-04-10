import api from "../../store/api";
import { createSlice } from "@reduxjs/toolkit";
/*
TODO: Define the following 4 endpoints:
  1. getPuppies (query)
  2. getPuppy (query)
  3. addPuppy (mutation)
  4. deletePuppy (mutation)

The query endpoints should provide the "Puppy" tag.
The mutation endpoints should invalidate the "Puppy" tag.

(Optional) TODO: Write `transformResponse` and `transformErrorResponse`
functions for each endpoint.
*/

const puppyApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetPuppies: build.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Puppy"],
      transformResponse: (pen) => pen.data.players,
    }),
    GetPuppy: build.query({
      query: (puppyId) => ({
        url: `/${puppyId}`,
        method: "GET",
      }),
      providesTags: ["Puppy"],
    }),
    AddPuppy: build.mutation({
      query: ({name, breed, status, imageUrl, teamId}) => ({
        url: "/",
        method: "POST",
        body: {
          name,
          breed,
          status,
          imageUrl,
          teamId,
        }
      }),
      invalidatesTags: ["Puppy"],
    }),
    DeletePuppy: build.mutation({
      query: ({puppyId}) => ({
        url: `/${puppyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Puppy"],
    }),
  }),
});

const storeToken = (state, { payload }) => {
  localStorage.setItem("token", payload.token);
};
const AddPuppiesSlice = createSlice({
  name: "AddPuppies",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    if (api.endpoints?.AddPuppies?.matchFulfilled) {
      builder.addMatcher(api.endpoints.AddPuppies.matchFulfilled, storeToken);
    }
  },
});
export default AddPuppiesSlice.reducer;

export const {
  useGetPuppiesQuery,
  useGetPuppyQuery,
  useAddPuppyMutation,
  useDeletePuppyMutation,
} = puppyApi;
