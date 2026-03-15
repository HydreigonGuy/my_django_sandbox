
function fill_button_info(button_info) {
    if (button_info.state == "Nonexistant") {
        document.getElementById("button_info_container").innerHTML = `
        <p>
            Button does not exist
        </p>
        <button onclick="createButton()">Create button</button>
        `;
    } else if (button_info.state == true) {
        document.getElementById("button_info_container").innerHTML = `
        <p>
            Button is active
        </p>
        <button onclick="deactivate()">deactivate</button>
        `;
    } else if (button_info.state == false) {
        document.getElementById("button_info_container").innerHTML = `
        <p>
            Button is not active
        </p>
        <button onclick="activate()">activate</button>
        `;
    } else {
        document.getElementById("button_info_container").innerHTML = `Error`;
    }
}


function retrieve_and_fill_button_info() {
    fetch("get")
    .then(resp => resp.json())
    .then(button_info => fill_button_info(button_info)); 
}


window.onload = function () {
    retrieve_and_fill_button_info();
}


function createButton() {
    fetch("create")
    .then(() => {retrieve_and_fill_button_info()}); 
}


function activate() {
    fetch("activate")
    .then(() => {retrieve_and_fill_button_info()}); 
}


function deactivate() {
    fetch("deactivate")
    .then(() => {retrieve_and_fill_button_info()}); 
}

