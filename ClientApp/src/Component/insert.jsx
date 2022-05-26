import React, { useRef } from 'react';

export function InsertForm() {
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
    function showModal(textMessage) {
        document.getElementById("modalContainer").style.display = "flex";
        document.getElementById("modalContainerText").textContent = textMessage
    }
    
    const inputName = useRef(null);
    const inputValue = useRef(null);
    function insertData(props, props1) {
        fetchData('/add/id='+ props1 + '&name='+ props).then(() => {
            console.log('data added');
            showModal("Se ha insertado el usuario.");
        })
    }
    return (
        <>
            <tr>
                <td><input
                    type="text"
                    name="insertEmployeeName"
                    placeholder="Introduce el nombre"
                    ref={inputName}


                /> </td>
                <td> <input
                    type="number"
                    name="insertEmployeeValue"
                    placeholder="Introduce el valor"
                    ref={inputValue}



                /> </td>
                <td> <input
                    type="submit"
                    value="Insertar"
                    onClick={() => insertData(inputName.current.value, inputValue.current.value)} /> </td>
            </tr>
        </>
    );
}
export default InsertForm;
