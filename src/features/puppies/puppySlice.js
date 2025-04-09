import api from "../../store/api";

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
        url: "/players",
        method: "GET",
      }),
      providesTags: ["Puppy"],
    }),
    GetPuppy: build.query({
      query: ({puppyId}) => ({
        url: `/players/${puppyId}`,
        method: "GET",
      }),
      providesTags: ["Puppy"],
    }),
    AddPuppy: build.mutation({
      query: () => ({
        url: "/players",
        method: "POST",
        body: {
          name,
          breed,
          status,
        }
      }),
      invalidatesTags: ["Puppy"],
    }),
    DeletePuppy: build.mutation({
      query: ({puppyId}) => ({
        url: `/players/${puppyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Puppy"],
    }),
  }),
});

export const {
  useGetPuppiesQuery,
  useGetPuppyQuery,
  useAddPuppyMutation,
  useDeletePuppyMutation,
} = puppyApi;
