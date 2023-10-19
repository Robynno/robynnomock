// Import the JSON data
import data1 from './mock1.json';
import data2 from './mock2.json';
import data3 from './search1.json';
import data4 from "./search2.json";

import smallData from './mock3.json'

// Export the JSON data as mockedJson
const mock1: string[][] = data1;
const mock2: string[][] = data2;
const mock3: string[][] = smallData;

// Create a mapping from file paths to parsed data
export const mockedJson: { [key: string]: string[][] } = {
  "ten-star.csv": mock1,
  "ri_city_town_income_short.csv": mock2,
  "towns.csv": mock3,
};

// Define a Map where the keys are tuples of two strings and the values are 2D arrays

// Define your tuples as keys
const key1: string = JSON.stringify(["City/Town", "Barrington"]);
const key2: string = JSON.stringify(["0", "Barrington"]);
const key3: string = JSON.stringify(["City/Town", "130,455.00"]);

// Define the associated 2D arrays as values
const search1: string[][] = data3

export const mockedIncomeSearch: { [key: string]: string[][] } = {
  [key1]: search1,
  [key2]: search1,
  [key3]: [[]]
};

const starkey1: string = JSON.stringify(["StarID", "70667"]);
const starkey2: string = JSON.stringify(["0", "70667"]);
const starkey3: string = JSON.stringify(["X", "130,455.00"]);

const star1: string[][] = data4;

export const mockedStarSearch: { [key: string]: string[][] } = {
  [starkey1]: star1,
  [starkey2]: star1,
  [starkey3]: [],
};

const smallkey1: string = JSON.stringify(["City/Town", "Cranston"]);
const smallkey2: string = JSON.stringify(["0", "Exeter"]);
const smallkey3: string = JSON.stringify(["0", "blah"]);

const data: string[][] = smallData;

export const mockedSmallSearch: { [key: string]: string[][] } = {
  [smallkey1]: [["Cranston"]],
  [smallkey2]: [["Exeter"]],
  [smallkey3]: [],
};

export const jsonMap: { [key: string]: { [key: string]: string[][] } } = {
  "ri_city_town_income_short.csv": mockedIncomeSearch,
  "ten-star.csv": mockedStarSearch,
  "towns.csv": mockedSmallSearch,
};

export default jsonMap;