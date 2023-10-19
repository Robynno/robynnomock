# Mock-rjecroi1-stang52
Team members: stang52, Robynno
Time spent on project: 25 hours
Github repo: https://github.com/cs0320-f23/mock-rjecroi1-stang52

## Design Choices
 ### High Level Design 
 1. **App.tsx:** render the highest level of the application's user interface. 
 2. **ControlledInput.tsx:** component is a reusable React component designed to manage controlled text input fields in a React application. It facilitates a controlled approach to handling input state, making it easier to manage and synchronize the input value with React's state management system.
 3. **Repl.tsx:** component serves as a top-level container for a (REPL) interface in a React application. It orchestrates the interaction between two components: REPLHistory and REPLInput.  Manages a history of REPL interactions using the history state variable. Keeps track of the current mode of the REPL using the mode state variable. 
 4. **ReplHistory.tsx:** The REPLHistory component is responsible for rendering the history of interactions within a (REPL) interface in a React application. It displays past commands and their corresponding outputs, allowing users to review their interactions.
 5. **REPLInput:**The REPLInput component handles user input within a (REPL) interface in a React application. It manages the input state, processes user commands, and communicates with the REPLHistory component to maintain a history of interactions. while also managing the state of our modes: brief and verbose. 
 6. **mock-data:** The provided code handles the import of JSON data and organizes it into specific structures for use within the REPL interface. It creates mock data based on different JSON files and provides a mapping between file paths and parsed data. Additionally, it defines search keys as tuples and associates them with corresponding 2D arrays for search functionalities in the REPL.

 ### Commands: 
 1. **load_file:**The load_file command allows users to load specific CSV files into the REPL system. Users provide the command followed by the file path of the CSV file they want to load.
 2. **view:** The view command is used to display the content of the currently loaded CSV file. It provides users with a view of the data they have loaded into the REPL
 3. **search:** The search command enables users to search for specific data within the loaded CSV file. Users provide the command followed by the column name and the value they want to search for.
 4. **mode brief:** The mode brief command sets the REPL system to operate in brief mode. In this mode, the system provides only the ouput 
 5. **mode verbose:** The mode verbose command sets the REPL system to operate in verbose mode. In this mode, the system provides the command line and output 


## Errors/Bugs
none that we know of. 
## Tests

## How to setup and run
Once cloned:

### Setup Mock from root directory
`cd mock` — Change into the `mock` directory

`npm install` — Installs node_modules folder for dependencies

`npx install playwright` — Installs everything needed to run PlayWright

### Running Mock
`npm start` — This starts a local server that compiles your code in real time.


### Running tests witih Playwright
`npx playwright test` — Runs tests

`npx playwright show-report` — Shows a code breakdown of test progressions

`npx playwright test --ui`— Opens a UI that allows you to watch and trace your (failing) tests live in a browser

`npx playwright codegen <url>` — Opens a URL and generates tests with locators for elements on the page. 