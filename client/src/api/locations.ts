import api from "./api";

export const getTrendingLocations = (config = {}) =>
  api.get("trending-locations", config).then((res) => res.data);
