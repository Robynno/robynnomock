import '../styles/main.css';
import { Dispatch, SetStateAction, useState} from 'react';
import { ControlledInput } from './ControlledInput';
import { jsonMap, mockedJson } from '../../mock-data/mockedJson';
import { Entry } from "./REPLHistory";
import { json } from 'stream/consumers';

/**
 * Interface defining the props for REPLInput Component 
 */
interface REPLInputProps{
  history: Entry[],
  setHistory: Dispatch<SetStateAction<Entry[]>>,

  mode: boolean,
  setMode: Dispatch<SetStateAction<boolean>>,
}
// REPLInput component responsible for handling user input and actions
export function REPLInput(props : REPLInputProps) {
  // state variables to manage input and filepath
  const [commandString, setCommandString] = useState<string>("");
  const [filepath, setFilepath] = useState<string>("");

  //Object to store the new entry with command and output
  const newEntry = {
    command: commandString,
    output: [[""]],
  };

  // This function is triggered when the button is clicked
  function handleSubmit(commandString: string) {
    const words = commandString.split(" ");

    //checks if the first word is load and if the a filepath is provided
    if (words[0].toLowerCase() === "mode") {
      handleMode(words);
    } else if (words[0].toLowerCase() === "load_file") {
      handleLoad(words);
    } else if (words[0].toLowerCase() === "view") {
      handleView();
    } else if (words[0].toLowerCase() === "search") {
      handleSearch(words);
    } else {
      //handles invalid commands
      newEntry.output = [["Please enter a valid command."]];
    }
    props.setHistory([...props.history, newEntry]);
    setCommandString("");
  }

  //handles the switching between mode commands
  function handleMode(words: string[]) {
    if (!words[1]) {
      newEntry.output = [["Please enter mode."]];
    } else if (words[1] === "brief") {
      props.setMode(true);
      newEntry.output = [["Mode changed to " + words[1] + "."]];
    } else if (words[1] == "verbose") {
      props.setMode(false);
      newEntry.output = [["Mode changed to " + words[1] + "."]];
    } else {
      newEntry.output = [["Please enter a valid command."]];
    }
  }

  //handles load_file command
  function handleLoad(words: string[]) {
    const filePath = words[1];
    if (!words[1]) {
      newEntry.output = [["Please enter filepath."]];
      return;
    }

    //Retrieves the mock response for the specified file path from mockedJson
    const mockedResponse = mockedJson[words[1]];

    //checks to see mockedResponse has a value
    if (mockedResponse) {
      newEntry.output = [["CSV file: " + filePath + " loaded successfully"]];
      setFilepath(filePath);
    } else {
      // if mockedResponse does not have a value
      newEntry.output = [["Error: " + filePath + " cannot be loaded"]];
    }
  }

  //handles the view command
  function handleView() {
    if (filepath) {
      newEntry.output = mockedJson[filepath];
    } else {
      //handles error if no file is loaded
      newEntry.output = [["Need to load first."]];
    }
  } // taken from https://stackoverflow.com/questions/15164655/generate-html-table-from-2d-javascript-array

  // handles search command
  function handleSearch(words: string[]) {
    if (!words[1] || !words[2]) {
      newEntry.output = [["Please enter column and value."]];
      return;
    }
    const key = JSON.stringify([words[1], words[2]]);
    if (filepath) {
      const mockedMap = jsonMap[filepath];
      if (key in mockedMap) {
        if (mockedMap[key].length == 0) {
          newEntry.output = [
            ["Value " + words[2] + " not found in column " + words[1]],
          ];
        } else {
          //displays search results if found
          newEntry.output = mockedMap[key];
        }
      } else {
        //handles invalid inputs
        newEntry.output = [
          ["Invalid inputs " + words[1] + ", " + words[2] + " for search."],
        ];
      }
    } else {
      newEntry.output = [["Need to load first before searching."]];
    }
  }

  /**
   * Component rendering the input form for user commands.
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>Submit</button>
    </div>
  );
}