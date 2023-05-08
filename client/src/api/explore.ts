import { TSearch } from "../lib/types";
import api from "./api";

function createData(name: string, city: string, price: number) {
  return { name, city, price };
}
const listingsData = [
  createData("Cozy downtown apartment", "New York City", 99),
  createData("Spacious condo with stunning views", "Los Angeles", 500),
  createData("Charming studio in historic district", "Boston", 170),
  createData("Downtown apartment", "Chicago", 80),
  createData("Sunny studio", "Los Angeles", 60),
  createData("Cozy cottage", "Seattle", 100),
  createData("Luxury penthouse", "New York City", 500),
  createData("Beachfront villa", "Miami", 250),
  createData("Charming bungalow", "Austin", 75),
  createData("Private room in historic home", "Boston", 50),
  createData("Spectacular view apartment", "San Francisco", 200),
  createData("Rustic cabin", "Denver", 120),
  createData("Treehouse retreat", "Portland", 150),
  createData("Tropical getaway", "Honolulu", 300),
  createData("Spacious loft", "Toronto", 80),
  createData("Country estate", "Nashville", 400),
  createData("Rooftop terrace apartment", "Paris", 150),
  createData("Bohemian flat", "Berlin", 90),
  createData("Historic mansion", "Washington D.C.", 350),
  createData("Modern townhouse", "Sydney", 180),
  createData("Secluded cabin", "Asheville", 100),
  createData("Beach house", "Rio de Janeiro", 220),
  createData("Ski chalet", "Zurich", 400),
].sort((a, b) => (a.price < b.price ? -1 : 1));

const eventsData = [
  createData("Food festival", "Chicago", 80),
  createData("Live music concert", "Austin", 280),
  createData("Art exhibition", "Chicago", 0),
  createData("Wine tasting", "San Francisco", 50),
  createData("Music festival", "Austin", 100),
  createData("Art fair", "New York City", 75),
  createData("Film festival", "Los Angeles", 120),
  createData("Craft beer expo", "Denver", 40),
  createData("Book festival", "Boston", 25),
  createData("Street fair", "Seattle", 20),
  createData("Fashion show", "Miami", 150),
  createData("Car show", "Detroit", 30),
  createData("Tech conference", "San Jose", 200),
  createData("Comedy festival", "Toronto", 60),
  createData("Fitness expo", "Las Vegas", 35),
  createData("Design conference", "Portland", 175),
  createData("Gaming convention", "Orlando", 80),
  createData("Science fair", "Washington D.C.", 15),
  createData("Outdoor concert", "Nashville", 90),
  createData("Sake tasting", "Tokyo", 70),
  createData("Wellness retreat", "Bali", 300),
  createData("Beer and brat festival", "Munich", 45),
].sort((a, b) => (a.price < b.price ? -1 : 1));

const restaurantsData = [
  createData("Italian bistro", "Miami", 145),
  createData("Sushi restaurant", "Seattle", 75),
  createData("Farm-to-table eatery", "Portland", 50),
  createData("French bistro", "New York City", 75),
  createData("Savor", "New Orleans", 75),
  createData("Citrus Grove", "Miami", 50),
  createData("Heritage Tavern", "Madison", 80),
  createData("The Whisk and Ladle", "San Francisco", 120),
  createData("Elevate", "Denver", 100),
  createData("Copper and Oak", "Austin", 60),
  createData("Gourmet Garden", "Seattle", 40),
  createData("Plated", "Los Angeles", 90),
  createData("Aroma", "Portland", 50),
  createData("Harvest Bistro", "Boston", 75),
  createData("Urban Butcher", "Washington D.C.", 100),
  createData("Miso Hungry", "Chicago", 30),
  createData("Amber", "Sydney", 120),
  createData("Pizzeria Mamma Mia", "Rome", 15),
  createData("Savory & Sweet", "San Diego", 50),
  createData("Brew & Chew", "London", 40),
  createData("Tapasville", "Barcelona", 30),
  createData("Gusto", "Florence", 80),
  createData("Gourmet Garage", "Paris", 100),
  createData("Basilico", "Milan", 60),
  createData("Taste of Thai", "Bangkok", 20),
  createData("Flamingo Grill", "Dubai", 150),
  createData("Sumptuous", "Toronto", 70),
  createData("Noble Grains", "Minneapolis", 90),
  createData("Farmhouse Cafe", "Portland", 40),
  createData("Authentic sushi bar", "Tokyo", 100),
  createData("Italian gelateria", "Florence", 5),
  createData("Modern Australian cuisine", "Melbourne", 80),
  createData("Chic rooftop lounge", "Dubai", 150),
].sort((a, b) => (a.price < b.price ? -1 : 1));

export const getSearch = async (data: TSearch, config = {}) => {
  return {
    restaurants: restaurantsData,
    events: eventsData,
    listings: listingsData,
  };
};

export const getTrendingLocations = (config = {}) =>
  api.get("trending-locations", config).then((res) => res.data);
