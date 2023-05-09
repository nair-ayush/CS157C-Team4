import api from "./api";

export const listAllListings = (config = {}) =>
  api.get("listings", config).then((res) => res.data);
export const getListing = (listingId: string, config = {}) =>
  api.get(`listings/${listingId}`, config).then((res) => res.data);
export const addListing = (body: any, config = {}) =>
  api.post("listings", body, config).then((res) => res.data); // TODO body interface for listing
export const deleteListing = (listingId: string, config = {}) =>
  api.delete(`listings/${listingId}`, config).then((res) => res.data);
