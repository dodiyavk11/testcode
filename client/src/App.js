import './App.css'
import axios from 'axios';
import React, { useState } from 'react';

const App = (props) => {
  const [select, selected] = useState(null); // state for storing actual image
  const [state, setState] = useState(null);
  const [data, setData] = useState([]);

  const handleInputChange = (event) => {
    setState(event.target.files[0]);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", state);
    console.log(state);
    if(state.name.includes(".csv"))
    {
    axios.post("http://localhost:5000/product/add", formData)
      .then(res => {
        if(res.data.error){
          alert(res.data.error);
        }else{
          alert('file data uploaded successfully');
          tab2Click();
        }
      })
      .catch(function (error) {
        alert(error);
      })
    }
    else
    {
      alert('please upload csv file');
    }
  };

  const tab1Click = async (event) => {
    selected(1)
  };

  const tab2Click = async (event) => {
    selected(2)
    var self = this;
    axios.post("http://localhost:5000/product/getProducts", {})
      .then(res => {
        if(res.data.lenth==0)
        {
          alert('no data found');
        }
        else
        {
          setData(res.data);
        }
        
      })
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header">Demosite</div>
        <div className="Validate">
          <button className="validatebtn"> Validate</button>
        </div>
        <div className="tabs">
          <ul className="product">
            <li onClick={tab1Click} className={select === 1 ||  !select ? "tab Active" : "tab"}>
              Product
            </li>
            <li onClick={tab2Click} className={select === 2 ? "tab Active" : "tab"}>
              Result
            </li>
          </ul>
          <div className="tabsview">
            <div className={select === 1 ||  !select ? "resultview activeview" : "resultview"}>
              <h1>Upload CSV</h1>
              <form onSubmit={handleOnSubmit}>
                <input type='file' name='file' onChange={handleInputChange} />
                <button> Upload</button>
              </form>
            </div>
            <div className={select === 2 ? "resultview activeview" : "resultview"}>
            <table width="100%" border="1px">
              <tr>
                <th>Id</th>
                <th>name</th>
                <th>Dimansions</th>
                <th>Image</th>
              </tr>
              {data.map((pro, index) => (
                <tr data-index={index}>
                  <td style={{color: pro.id === "NA" ? "red" : ""}}>{pro.id}</td>
                  <td style={{color: pro.name === "NA" ? "red" : ""}}>{pro.name}</td>
                  <td style={{color: pro.picture.image === "NA" ? "red" : ""}}>{pro.picture.width} * {pro.picture.height}</td>
                  <td style={{color: pro.picture.image === "NA" ? "red" : ""}}>
                    {pro.picture.image != 'NA' ? (
                      <img src={pro.picture.image} width="100" />
                    ) : (
                      'NA'
                    )}
                  </td>
                </tr>
              ))}
            </table>
          </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
