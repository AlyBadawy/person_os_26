import { apiSlice } from "./ApiSlice";

export interface Me {
  id: number;
  email: string;
}

export const meApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<{ me: Me }, void>({
      query: () => "/me",
      keepUnusedDataFor: 1800, // cache for 30 minutes
      providesTags: [{ type: "ME" as const }],
    }),
  }),
});

export const { useGetMeQuery } = meApiSlice;
