import { test, expect } from "@playwright/test";

const mockedStar: string =
  "StarIDProperNameXYZ0Sol0001282.434850.004495.36884243.043290.00285-15.241443277.113580.02422223.27753375996 " + 
  "G. Psc7.263881.556430.6869770667Proxima Centauri-0.47175-0.36132-1.1503771454Rigel " + 
  "Kentaurus B-0.50359-0.42128-1.176771457Rigel Kentaurus A-0.50362-0.42139-1.1766587666Barnard's " + 
  "Star-0.01729-1.815330.14824118721-2.282620.646970.29354";


test("handleMode function sets mode to brief", async ({ page }) => {
  // Navigate to the application
  await page.goto("http://localhost:8000/");

  // Command to set mode to brief
  const commandString = "mode brief";

  // Fill the input field with the command and click the submit button
  await page.fill('[aria-label="Command input"]', commandString);
  await page.click("button");

  // Extract the output text content and expect it to contain the mode change message
  const outputText = await page.textContent(".repl-history");
  expect(outputText).toContain("output: Mode changed to brief.");
});

test("handleMode function sets mode to verbose", async ({ page }) => {
  // Navigate to the application
  await page.goto("http://localhost:8000/");

  // Command to set mode to brief
  const commandString = "mode verbose";

  // Fill the input field with the command and click the submit button
  await page.fill('[aria-label="Command input"]', commandString);
  await page.click("button");

  // Extract the output text content and expect it to contain the mode change message
  const outputText = await page.textContent(".repl-history");
  expect(outputText).toContain("command: mode verboseoutput: Mode changed to verbose.");
});

// Test for handleLoad function
test("handleLoad function loads a valid CSV file", async ({ page }) => {
  // Navigate to the application
  await page.goto("http://localhost:8000/");

  // Command to load the 'ten-star.csv' file
  const commandString = "load_file ten-star.csv";

  // Fill the input field with the command and click the submit button
  await page.fill('[aria-label="Command input"]', commandString);
  await page.click("button");

  // Extract the output text content and expect it to contain the successful loading message
  const outputText = await page.textContent(".repl-history");
  expect(outputText).toContain("output: CSV file: ten-star.csv loaded successfully");
});

test("handleView function displays loaded data", async ({ page }) => {
  // Navigate to the application
  await page.goto("http://localhost:8000/");

  // Command to load the 'ten-star.csv' file
  const loadCommand = "load_file ten-star.csv";
  await page.fill('[aria-label="Command input"]', loadCommand);
  await page.click("button");

  // Command to view the loaded data
  const viewCommand = "view";
  await page.fill('[aria-label="Command input"]', viewCommand);
  await page.click("button");

  // Extract the output text content and expect it to contain the data from 'ten-star.csv'
  const outputText = await page.textContent(".repl-history");
  expect(outputText).toContain(
    "output: CSV file: ten-star.csv loaded successfullyoutput: " + mockedStar
  );
});

test("handleSearch function searches for data", async ({ page }) => {
  // Navigate to the application
  await page.goto("http://localhost:8000/");

  // Command to load the 'ten-star.csv' file
  const loadCommand = "load_file ten-star.csv";
  await page.fill('[aria-label="Command input"]', loadCommand);
  await page.click("button");

  // Command to search for 'StarID 70667' in the loaded data
  const searchCommand = "search StarID 70667";
  await page.fill('[aria-label="Command input"]', searchCommand);
  await page.click("button");

  // Extract the output text content and expect it to contain the search results for 'StarID 70667'
  const outputText = await page.textContent(".repl-history");
  expect(outputText).toContain(
    "output: CSV file: ten-star.csv loaded successfully" +
    "output: 70667Proxima Centauri-0.47175-0.36132-1.15037"
  );
});

// Test for handleLoad function
test("invalid filepath in load", async ({ page }) => {
  // Navigate to the application
  await page.goto("http://localhost:8000/");

  // Command to load the 'ten-star.csv' file
  const commandString = "load_file wrong.csv";

  // Fill the input field with the command and click the submit button
  await page.fill('[aria-label="Command input"]', commandString);
  await page.click("button");

  // Extract the output text content and expect it to contain the successful loading message
  const outputText = await page.textContent(".repl-history");
  expect(outputText).toContain("output: Error: wrong.csv cannot be loaded");
});

// Test for handleLoad function with no filepath
test("No filepath in load", async ({ page }) => {
  // Navigate to the application
  await page.goto("http://localhost:8000/");

  // Command to load the 'ten-star.csv' file
  const commandString = "load_file";

  // Fill the input field with the command and click the submit button
  await page.fill('[aria-label="Command input"]', commandString);
  await page.click("button");

  // Extract the output text content and expect it to print error message.
  const outputText = await page.textContent(".repl-history");
expect(outputText).toContain("output: Please enter filepath.");
});

// Test for view with no csv loaded
test("view command without load_file first", async ({ page }) => {
  // Navigate to the application
  await page.goto("http://localhost:8000/");

  // Command to view the data (not loaded)
  const viewCommand = "view";
  await page.fill('[aria-label="Command input"]', viewCommand);
  await page.click("button");

  // Extract the output text content and expect it to print error message.
  const outputText = await page.textContent(".repl-history");
  expect(outputText).toContain("output: Need to load first.");
});

// Test for invalid number of search arguments
test("Search with wrong number of arguments", async ({ page }) => {
  // Navigate to the application
  await page.goto("http://localhost:8000/");

  await page.fill('[aria-label="Command input"]', "search");
  await page.click("button");

  // Extract the output text content and expect it to print error message.
  const outputText = await page.textContent(".repl-history");
  expect(outputText).toContain("output: Please enter column and value.");


  await page.fill('[aria-label="Command input"]', "search 1");
  await page.click("button");

  const outputText2 = await page.textContent(".repl-history");
  expect(outputText2).toContain("output: Please enter column and value.");
});

// Test for invalid search arguments
test("Search with wrong arguments", async ({ page }) => {
  // Navigate to the application
  await page.goto("http://localhost:8000/");

  await page.fill(
    '[aria-label="Command input"]',
    "load_file ri_city_town_income_short.csv"
  );
  await page.click("button");

  const commandString = "search 1 1";
  await page.fill('[aria-label="Command input"]', commandString);
  await page.click("button");

  // Extract the output text content and expect it to print error message.
  const outputText = await page.textContent(".repl-history");
  expect(outputText).toContain(
    "output: CSV file: ri_city_town_income_short.csv loaded successfully" +
      "output: Invalid inputs 1, 1 for search."
  );
});

test("Multiple load and mode change", async ({ page }) => {
  // Navigate to the application
  await page.goto("http://localhost:8000/");

  await page.fill(
    '[aria-label="Command input"]',
    "load_file ri_city_town_income_short.csv"
  );
  await page.click("button");

  // Command to load the 'ten-star.csv' file
  await page.fill('[aria-label="Command input"]', "load_file ten-star.csv");
  await page.click("button");

  // Command to view the loaded data
  const viewCommand = "view";
  await page.fill('[aria-label="Command input"]', viewCommand);
  await page.click("button");

  // Extract the output text content and expect it to contain the data from 'ten-star.csv'
  const outputText = await page.textContent(".repl-history");
  expect(outputText).toContain(
    "output: CSV file: ri_city_town_income_short.csv loaded successfully" +
      "output: CSV file: ten-star.csv loaded successfully" +
      "output: " +
      mockedStar
  );

  const modeCommand = "mode verbose";
  await page.fill('[aria-label="Command input"]', modeCommand);
  await page.click("button");

  // Extract the output text content and expect it to contain the data from 'ten-star.csv'
  const outputText2 = await page.textContent(".repl-history");
  expect(outputText2).toContain(
    "command: load_file ri_city_town_income_short.csv" +
      "output: CSV file: ri_city_town_income_short.csv loaded successfully" +
      "command: load_file ten-star.csv" +
      "output: CSV file: ten-star.csv loaded successfully" +
      "command: view" +
      "output: " +
      mockedStar +
      "command: mode verbose" +
      "output: Mode changed to verbose."
  );
});

// Test search without load
test("Search without first loading file", async ({ page }) => {
  // Navigate to the application
  await page.goto("http://localhost:8000/");

  const commandString = "search 1 1";
  await page.fill('[aria-label="Command input"]', commandString);
  await page.click("button");

  // Extract the output text content and expect it to print error message.
  const outputText = await page.textContent(".repl-history");
  expect(outputText).toContain("output: Need to load first before searching.");
});

// Test for search with one column data
test("Search with one column data", async ({ page }) => {
  // Navigate to the application
  await page.goto("http://localhost:8000/");

  await page.fill(
    '[aria-label="Command input"]',
    "load_file towns.csv"
  );
  await page.click("button");

  const commandString = "search 0 Exeter";
  await page.fill('[aria-label="Command input"]', commandString);
  await page.click("button");

  // Extract the output text content and expect it to print error message.
  const outputText = await page.textContent(".repl-history");
  expect(outputText).toContain(
    "output: CSV file: towns.csv loaded successfully" +
      "output: Exeter"
  );
});