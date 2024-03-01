import React, { useEffect, useState } from "react";
import axios from "axios";
import {MdDelete} from "react-icons/md" 
import { FaPen } from "react-icons/fa";

const App = () => {
  const [inputVal, setInputValue] = useState("");
  const [targetData, setTargetData] = useState([]);
  // console.log(targetData);
  const [isUpdate, setIsUpdate] = useState(false);
  const [index, setIndex] = useState(0);

  // Fetching Data From the Server!
  const fetchData = async () => {
    // let apiUrl = "http://192.168.100.5:5050/fetch/all/todos";
    let apiUrl = "http://localhost:5050/fetch/all/todos";
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
    // let apiUrl = "http://192.168.100.11:5050/todo-item/add";
    let apiUrl = "http://localhost:5050/todo-item/add";
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

  // Deleting Data from the Server!
  const deleteHandler = async (i) => {
    // console.log(i);
    let apiUrl = `http://localhost:5050/todo/delete/${i}`;
    try {
      let res = await axios({
        method: "DELETE",
        url: apiUrl,
      });
      if (res) {
        fetchData();
        if (targetData.length === 1) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log("Error while sending the data to the server: ", error);
    }
  };

  // Sending Data to the Server!
  const updateHandler = (e, i) => {
    setInputValue(e);
    setIsUpdate(true);
    setIndex(i);
  };
  const updateItem = async () => {
    // let apiUrl = "http://192.168.100.11:5050/todo-item/add";
    let apiUrl = "http://localhost:5050/todo-item/update";
    try {
      let res = await axios({
        method: "PUT",
        url: apiUrl,
        data: {
          key: index,
          updateValue: inputVal,
        },
      });
      if (res) {
        setInputValue("");
        fetchData();
        setIsUpdate(false);
      }
    } catch (error) {
      console.log("Error while sending the data to the server: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        textAlign: "center",
        marginTop: "20px",
      }}
    >
      <h1 style={{ fontSize: "24px", color: "#333" }}>
        My To-Do List with Node JS and Express JS!
      </h1>
      <input
        type="text"
        placeholder="Add a new task..."
        value={inputVal}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyPress={(e) => {
          // console.log(e);
          if (e.key === "Enter") {
            addItem();
          }
        }}
        autoFocus
        style={{
          width: "70%",
          padding: "10px",
          fontSize: "16px",
          marginRight: "5px",
          marginTop: "20px",
        }}
      />
      <button
        onClick={isUpdate ? updateItem : addItem}
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
        {isUpdate ? "Update" : "Add"} Item
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                {item}
              </span>
              <div>
                <button
                  style={{ padding: "5px", marginRight: "5px", backgroundColor: "#F70101" }}
                  onClick={() => {
                    deleteHandler(index);
                  }}
                >
                  <MdDelete style={{fontSize: "16px", color: "white"}} />
                </button>
                <button
                  style={{ padding: "5px", marginRight: "5px", backgroundColor: "#4D80C7" }}
                  onClick={() => {
                    updateHandler(item, index);
                  }}
                >
                  <FaPen  style={{fontSize: "16px", color: "white"}}/>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
