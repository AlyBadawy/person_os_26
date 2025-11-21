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

export const bodyMeasurementsApiSlice = apiSlice.injectEndpoints({
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
  }),
});

export const { useGetBodyMeasurementsQuery, useAddBodyMeasurementMutation } =
  bodyMeasurementsApiSlice;
