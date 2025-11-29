import { apiSlice } from "./ApiSlice";
import { HealthHeartData } from "@/dashboardApp/types/HealthHeartData";

interface HeartMeasurementPayload {
  measuredAt: Date;
  bpm?: number;
  systolic?: number;
  diastolic?: number;
}

export interface HeartMeasurement {
  id: number;
  measuredAt: Date;
  data: HealthHeartData;
  createdAt: Date;
  updatedAt: Date;
}

export const healthHeartMeasurementsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeartMeasurements: builder.query<HeartMeasurement[], void>({
      query: () => "/health/heart_measurements",
      providesTags: ["heartMeasurements"],
    }),

    addHeartMeasurement: builder.mutation<
      HeartMeasurement,
      HeartMeasurementPayload
    >({
      query: (payload) => ({
        url: "/health/heart_measurements",
        method: "POST",
        body: { measurement: payload },
      }),
      invalidatesTags: ["heartMeasurements"],
    }),

    updateHeartMeasurement: builder.mutation<
      HeartMeasurement,
      { id: number; payload: HeartMeasurementPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/health/heart_measurements/${id}`,
        method: "PUT",
        body: { measurement: payload },
      }),
      invalidatesTags: ["heartMeasurements"],
    }),
    deleteHeartMeasurement: builder.mutation<
      { success: boolean; id: number },
      number
    >({
      query: (id) => ({
        url: `/health/heart_measurements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["heartMeasurements"],
    }),
  }),
});

export const {
  useGetHeartMeasurementsQuery,
  useAddHeartMeasurementMutation,
  useUpdateHeartMeasurementMutation,
  useDeleteHeartMeasurementMutation,
} = healthHeartMeasurementsApiSlice;
