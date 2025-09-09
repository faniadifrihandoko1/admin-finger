import { axiosInterceptor } from "@/lib/api/axios-config";
import { getApi } from "@/lib/api/endpoint";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface MesinFingerData {
  id: number;
  SN: string;
  tables: unknown | null;
  device_name: string;
  mac_address: string;
  ip_address: string;
  firmware_version: string;
  push_version: string;
  platform: string;
  oem_vendor: string;
  transaction_count: number;
  max_attlog_count: number;
  user_count: number;
  max_user_count: number;
  finger_fun_on: boolean;
  finger_count: number;
  max_finger_count: number;
  fp_version: string;
  face_fun_on: boolean;
  face_count: number;
  max_face_count: number;
  face_version: string;
  photo_fun_on: boolean;
  max_user_photo_count: number;
  fv_fun_on: boolean;
  fv_count: number;
  max_fv_count: number;
  fv_version: string;
  pv_fun_on: boolean;
  pv_count: number;
  max_pv_count: number | null;
  pv_version: string;
  language: string;
  webHookLink: string;
  raw_data: string;
  lastUpdate_at: string;
  created_at: string;
  updated_at: string;
  ClientName: string;
}



interface MesinFingerResponse {
  response: number;
  message: string;
  success: MesinFingerData[];
  error: boolean;
}

export const useGetDataPeriod = () => {
  return useQuery<MesinFingerData[], AxiosError>({
    queryFn: async () => {
      try {
        const res = await axiosInterceptor.post<MesinFingerResponse>(
          getApi("getListMesin"), {
              "CustomerId":"ALL"
          }
        );

        console.log("res", res.data);
        // Ensure we always return an array, never undefined
        if (res.data && res.data.success) {
          return res.data.success;
        }

        // Return empty array if no data
        return [];
      } catch (error) {
        console.error("Error fetching mesin finger data:", error);
        throw error;
      }
    },
    queryKey: ["LIST_DATA_MESIN_FINGER"],
  });
};
