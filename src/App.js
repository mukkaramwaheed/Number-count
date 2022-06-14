import "./App.css";
import { useEffect, useState } from "react";
import Papa from "papaparse";

function App() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store the values
  const [values, setValues] = useState("");
  const [error, setError] = useState("");
  // useEffect(() => {
  //   setValues("");
  //   setError("");
  // }, []);
  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: false,
      complete: function (results) {
        let result = results?.meta?.fields?.filter((val) => {
          let value = parseInt(val);
          if (!isNaN(val) && val > 0) {
            return parseInt(value);
          }
        });
        console.log(result);
        if (result.length > 0 && result !== undefined) {
          let getValue = Math.max(...result);
          let num = 532 - getValue;
          num += getValue;
          setValues(num);
          setError("");
        } else {
          setValues("");
          setError("Invalid csv or there is not data in the uploaded csv");
        }
      }
    });
  };
  return (
    <div className="text-center">
      <h1>Upload csv file</h1>
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <div className="text-center">
        <>
          {values && <p>You target number is {values}</p>}
          {error && <p className="danger">{error}</p>}
        </>
      </div>
    </div>
  );
}

export default App;
