import { WeightData } from "@/dashboardApp/types/WeightData";
import { apiSlice } from "./ApiSlice";
import { WeightDisplayUnitEnum } from "@/dashboardApp/types/WeightUnits";

interface BodyMeasurementPayload {
  value: number;
  unit: WeightDisplayUnitEnum;
  measuredAt: Date;
  topic: string;
}

export interface BodyMeasurement {
  id: number;
  topic: string;
  measuredAt: Date;
  data: WeightData;
  createdAt: Date;
  updatedAt: Date;
}

export const healthBodyMeasurementsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBodyMeasurements: builder.query<BodyMeasurement[], void>({
      query: () => "/health/body_measurements",
      providesTags: ["bodyMeasurements"],
    }),
    addBodyMeasurement: builder.mutation<
      BodyMeasurement,
      BodyMeasurementPayload
    >({
      query: (payload) => ({
        url: "/health/body_measurements",
        method: "POST",
        body: { measurement: payload },
      }),
      invalidatesTags: ["bodyMeasurements"],
    }),
    updateBodyMeasurement: builder.mutation<
      BodyMeasurement,
      { id: number; payload: BodyMeasurementPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/health/body_measurements/${id}`,
        method: "PUT",
        body: { measurement: payload },
      }),
      invalidatesTags: ["bodyMeasurements"],
    }),
    deleteBodyMeasurement: builder.mutation<
      { success: boolean; id: number },
      number
    >({
      query: (id) => ({
        url: `/health/body_measurements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bodyMeasurements"],
    }),
  }),
});

export const {
  useGetBodyMeasurementsQuery,
  useAddBodyMeasurementMutation,
  useUpdateBodyMeasurementMutation,
  useDeleteBodyMeasurementMutation,
} = healthBodyMeasurementsApiSlice;
