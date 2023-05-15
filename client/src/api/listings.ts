import { GenericAndErrorResponse, TListing } from "../lib/types";
import { getRandomCityImage } from "../lib/util";
import api from "./api";

export const listAllListings = (config = {}): Promise<TListing[]> =>
  api.get("listings", config).then((res) =>
    res.data.map((item: TListing) => ({
      ...item,
      imageURL: getRandomCityImage(),
    }))
  );

export const getListing = (listingId: string, config = {}): Promise<TListing> =>
  api
    .get(`listings/${listingId}`, config)
    .then((res) => ({ ...res.data, imageURL: getRandomCityImage() }));

export const addListing = (
  body: TListing,
  config = {}
): Promise<GenericAndErrorResponse> =>
  api.post("listings", body, config).then((res) => res.data);

export const updateListing = (
  body: TListing,
  config = {}
): Promise<GenericAndErrorResponse> =>
  api.post(`listings/${body.id}`, body, config).then((res) => res.data);

export const deleteListing = (
  listingId: string,
  config = {}
): Promise<GenericAndErrorResponse> =>
  api.delete(`listings/${listingId}`, config).then((res) => res.data);

export const getListingsByLocation = async (
  location: string,
  config = {}
): Promise<TListing[]> =>
  api
    .get(`listings/location/${encodeURIComponent(location)}`, config)
    .then((res) =>
      res.data.map((item: TListing) => ({
        ...item,
        imageURL: getRandomCityImage(),
      }))
    );

export const getTrendingListings = async (
  limit: number = 5,
  config = {}
): Promise<TListing[]> =>
  api.get(`listings/trending/${limit}`, config).then((res) =>
    res.data.map((item: TListing) => ({
      ...item,
      imageURL: getRandomCityImage(),
    }))
  );
