import './App.css'
import React, { setSelected, useState } from "react";

// Defining our App Component
const App = () => {

  const [selected, setSelected] = useState({});
   
  const  tab1Click = (tabId = null) => {
    setSelected({ ...selected, [tabId]: !selected[tabId] })
  } 
     
  // Returning our JSX code
  return <>
    <div className="App">
      <header className="App-header">
        <div className="header">Demosite</div>
        <div className="Validate"><button className="validatebtn"> Validate </button></div>
        <div className="tabs">
          <ul className="product">
            <li onClick={tab1Click[1]} className={selected == 1 ? "tab Active" : "tab"}>
              Product
            </li>
            <li onClick={tab1Click[2]} className={selected == 2 ? "tab Active" : "tab"}>
              Result
            </li>
          </ul>
          <div className="tabsview">
            <div className="productview activeview">
              <h1>Upload CSV</h1>
              <form enctype="multipart/form-data">
                <input type='file'  />
                <button > Upload </button>
              </form>
            </div>
          </div>
          <div className="resultview">abcd</div>
        </div>
      </header>
    </div>
  </>;
}
export default App