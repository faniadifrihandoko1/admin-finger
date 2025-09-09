export const endpoints = {

  // mesin finger
  getListMesin: "getListDataMesinFinger",
  updateMesin: "setDataMesinFinger",

} as const;

export type ApiEndpoint = keyof typeof endpoints;
const host = "https://altiusapi.altius.id/api/v3";
export const getApi: (key: ApiEndpoint) => string = key => {
  return `${host}/${endpoints[key]}`;
};
