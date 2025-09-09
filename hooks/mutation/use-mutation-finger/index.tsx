import { axiosInterceptor } from "@/lib/api/axios-config";
import { getApi } from "@/lib/api/endpoint";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";



interface PayloadDataMesin {
    SN: string,
    ClientName: string,
    device_name: string,
    webHookLink: string,
}

interface ResponseUpdateMesin {
    response: 200| 400| 500,
    success: null,
    error: boolean,
    message: string;
}

export const useUpdateMesin = () =>
  useMutation<
  ResponseUpdateMesin,
    AxiosError<ResponseUpdateMesin>,
    PayloadDataMesin
  >({
    mutationFn: async data => {
      const res = await axiosInterceptor.post<ResponseUpdateMesin>(
        getApi("updateMesin"),
        data
      );

      return res.data;
    },
    mutationKey: ["UPDATE_MESIN"],
  });

  export const useCreateMesin = () =>
    useMutation<
    ResponseUpdateMesin,
      AxiosError<ResponseUpdateMesin>,
      PayloadDataMesin
    >({
      mutationFn: async data => {
        const res = await axiosInterceptor.post<ResponseUpdateMesin>(
          getApi("updateMesin"),
          data
        );

        return res.data;
      },
      mutationKey: ["CREATE_MESIN"],
    });




