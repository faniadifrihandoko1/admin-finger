// Shared storage untuk strategy map data
// Dalam implementasi nyata, gunakan database seperti PostgreSQL, MongoDB, dll.

let savedStrategyMapData: any = null;

export const strategyMapStorage = {
  save: (data: any) => {
    savedStrategyMapData = data;
    return data;
  },

  load: () => {
    return savedStrategyMapData;
  },

  clear: () => {
    savedStrategyMapData = null;
  },

  exists: () => {
    return savedStrategyMapData !== null;
  },
};
