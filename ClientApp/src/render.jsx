import React, { Component, useState, setState } from 'react';
import styled from 'styled-components';
import './stylesMain.css';
import { Script } from './assets/app.js'
import axios from 'axios';
import { InsertForm } from './Component/insert.jsx';


const Main = styled.section`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    font-family:'Calibri';
    background:url('./Media/form-template.jpg');
    width:100vw;
    height:auto;
    background:#112337;
`
const Header = styled.header`
& {
    display:flex;
    align-items:center;
    justify-content:flex-start;
    font-family:'Calibri';
    background:#112337;
    width:100vw;
    height:100px;
}
& h1 {
    font-size:3rem;
    width:500px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:#fff;
    text-transform:uppercase;
    letter-spacing:-.2rem;
}
`
const FormContainerAll = styled.div`
& {
    width:100vw;
    background:#112337;
    height:auto;
    display:flex;
    flex-direction:row;
    overflow:hidden;
}`
const FormContainerLeft = styled.div`
& {
    width:20vw;
    height:auto;
display:none;
}
& img {
    width:100%;
    height:90vh;
    object-fit:cover;
    object-position:center;

}
`
const FormContainerRight = styled.div`
& {
    width:100vw;
    height:90vh;
    background:#112337;
    overflow-y:scroll;
overflow-x:hidden;
}
`
const ResultsTable = styled.table`
& {
    display:table;
    font-family:'Calibri';
    background:#ffff;
    width:100%;
    height:auto;
}
& th {
    background:black;
    color:white;
    padding:10px;
    font-size:1.3rem;
    text-transform:uppercase;
    border:0px;
    }
& td {
    font-size:1.1rem;
    align-items:center;
    text-align:center;
    padding:10px;
    border:0px;
    font-weight:bold;
}
& tr:nth-of-type(odd) {
    background:#fff;
    border:0px;

}
& tr:nth-of-type(even) {
    background:#E7E7E7;
    border:0px;
}
& input {
    border:0px;
    border-bottom:2px solid black;
    background:transparent;
    padding:10px;
    outline:none;
}
& input[type=submit] {
    padding:10px;
    background:black;
    text-transform:uppercase;
    color:#fff;
    font-weight:bold;    
}
& button {
    border:0px;
    border-bottom:2px solid black;
    padding:10px;
    background:black;
    text-transform:uppercase;
    color:#fff;
    font-weight:bold;
}
`
const modalContainer = styled.div`
 & {
    width:100vw;
    height:100vh;
    background:rgba(255,255,255,0.66);
    position:fixed;
    z-index:99;
    top:0;
}
`
function fetchData(url_api) {
    return new Promise((resolve, reject) => {
        let xhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject("Microsoft.XMLHTTP");
        xhttp.open('GET', url_api, true);
        xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest', 'Content-Type');
        xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4) {
                (xhttp.status === 200)
                    ? resolve(JSON.parse(xhttp.responseText))
                    : reject(new Error('Error ', url_api))
            }
        }
        xhttp.send();
    });

}
function deleteClick(props) {
    console.log(props);
    fetchData('/delete/id=' + props).then(() => {
        console.log("deleted element");
    });
}
function updateValue(name, value) {
    console.log(name + value);
    fetchData('/modifyvalue/name=' + name + '&value=' + value).then(() => {
        console.log("changed element");
        window.location.reload();
    });
}
const getInputValue = (event) => {
    const userValue = event.target.value;

    console.log(userValue);
};


/*export classApps  {
    state = {
        employees: [],
        val: ''
    };
    componentDidMount() {
        axios.get('http://localhost:5000/Employees').then((response) => {
            this.setState({
                employees: response.data
            })
        })
    }
}*/
export function App() {
    const [count, setCount] = useState(0);






    return (
        <Main>
            <Header>
                <h1>Metricell</h1>
            </Header>
            <FormContainerAll>
                <FormContainerLeft>
                    <img src="https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687" alt="form_main" />
                </FormContainerLeft>
                <FormContainerRight>
                    <ResultsTable id="listingTable">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Value</th>
                                <th colSpan="3">Opciones</th>
                            </tr>

                        </thead>
                        <tbody>
                            <InsertForm></InsertForm>


                            {this.state.employees.map((employees: any) => (
                                <tr>
                                    <td key={employees.name} id={employees.name}>
                                        <input
                                            type="text"
                                            placeholder={employees.name}
                                            value={employees.name}
                                            readOnly

                                        />
                                    </td>
                                    <td
                                        key={employees.value}
                                    >
                                        <input
                                            type="number"
                                            placeholder={employees.value}
                                            onChange={getInputValue}
                                        />
                                    </td>
                                    <td key="option_update"> <button value={employees.name} onClick={() => updateValue(employees.name, 999)}> Actualizar valor </button> </td>
                                    <td key="option_delete"> <button id={employees.value} className="borrar" value={employees.value} onClick={() => deleteClick(employees.value)} > Borrar </button> </td>


                                </tr>
                            ))


                            }

                        </tbody>
                    </ResultsTable>
                </FormContainerRight>
            </FormContainerAll>
            <modalContainer />
            <Script></Script>
        </Main>
    );
}


export default App;
