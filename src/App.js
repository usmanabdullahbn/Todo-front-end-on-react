import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [inputVal, setInputValue] = useState("");
  const [targetData, setTargetData] = useState([]);


  // Fetching Data From the Server!
  const fetchData = async () => {
    let apiUrl = "http://192.168.100.11:5050/fetch/all/todos";
    try {
      let res = await axios({
        method: "GET",
        url: apiUrl,
      });
      setTargetData(res.data.data);
    } catch (error) {
      console.log("Error while fetching the data from the server: ", error);
    }
  };


  // Sending Data to the Server!
  const addItem = async () => {
    let apiUrl = "http://192.168.100.11:5050/todo-item/add";
    try {
      let res = await axios({
        method: "POST",
        url: apiUrl,
        data: {
          todoInput: inputVal,
        },
      });
      if (res) {
        setInputValue("");
        fetchData(); // Fetch data after adding an item to update the list
      }
    } catch (error) {
      console.log("Error while sending the data to the server: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center", marginTop: "20px" }}>
      <h1 style={{ fontSize: "24px", color: "#333" }}>My To-Do List with Node JS and Express JS!</h1>
      <input
        type="text"
        placeholder="Add a new task..."
        value={inputVal}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        autoFocus
        style={{
          width: "70%",
          padding: "10px",
          fontSize: "16px",
          marginRight: "5px",
          marginTop: "20px"
        }}
      />
      <button
        onClick={addItem}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 15px",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Item
      </button>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {targetData.map((item, index) => (
          <li
            key={index}
            style={{
              margin: "10px 0",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              textAlign: "left",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
