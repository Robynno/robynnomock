import '../styles/main.css';

/**
 * Defines the structure of each entry in the History 
 */
export interface Entry {
    command: string;
    output: string[][]; // output can be either String or String array
}

interface REPLHistoryProps{
    history: Entry[],
    mode: boolean
}

/**
 * Defines the properties for the REPLHistory component
 */
export function REPLHistory(props : REPLHistoryProps) {
  function makeTableHTML(tableData: string[][]) {
    const tableRows = tableData.map(
      (rowData) =>
        `<tr>${rowData.map((cellData) => `<td>${cellData}</td>`).join("")}</tr>`
    );

    return `<table border="1">${tableRows.join("")}</table>`;
  }

  //Renders the REPLHistory component
  return (
    <div className="repl-history">
      {props.history.map((entry) => (
        <div key={entry.command}>
          {props.mode ? (
            <div>
              <p>
                <strong>output</strong>:{" "}
              </p>
              <div
                className="center-table"
                dangerouslySetInnerHTML={{
                  __html: makeTableHTML(entry.output),
                }}
              />
            </div>
          ) : (
            <div>
              <p>
                <strong>command</strong>: {entry.command}
                <br />
                <strong>output</strong>:{" "}
              </p>
              <div
                className="center-table"
                dangerouslySetInnerHTML={{
                  __html: makeTableHTML(entry.output),
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}