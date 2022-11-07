import type { AxiosStatic, AxiosInstance } from "axios";

declare module "@nlw-copa/axios-config" {
  export const axios: AxiosStatic;
  export const api: AxiosInstance;
}
