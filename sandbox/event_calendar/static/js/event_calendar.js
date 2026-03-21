
function create_new_event_form() {
    document.getElementById("new_event_form").innerHTML = `
        <span>Name</span>
        <input type="text" id="new_event_name">
        <br>
        <span>Description</span>
        <input type="text" id="new_event_description">
        <br>
        <span>Start</span>
        <input type="datetime-local" id="new_event_start">
        <br>
        <span>End</span>
        <input type="datetime-local" id="new_event_end">
        <br>
        <button onclick="create_new_event()">Create</button>
    `;
}


function fill_calendar_data(calendar_info) {
    formatted = "";
    for (i in calendar_info.events) {
        evt = calendar_info.events[i];
        formatted += `
            <div>
                <b>${evt.name}</b>
                <p>${evt.description}</p>
            </div>
        `;
    }
    document.getElementById("calendar_body").innerHTML = formatted;
}


function retrieve_and_format_calendar_data() {
    fetch("get")
    .then(resp => resp.json())
    .then(calendar_info => fill_calendar_data(calendar_info)); 
}


function create_new_event() {
    name = document.getElementById("new_event_name").value;
    description = document.getElementById("new_event_description").value;
    start = document.getElementById("new_event_start").value;
    end = document.getElementById("new_event_end").value;

    document.getElementById("new_event_form").innerHTML = `...`;
    fetch("create", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': document.getElementsByName("csrfmiddlewaretoken")[0].value
        },
        body: JSON.stringify({
            name: name,
            description: description,
            start: start,
            end: end,
        })
    })
    .then(function (resp) {
        document.getElementById("new_event_form").innerHTML = `
        <button onclick="create_new_event_form()">+ Create Event</button>
        `;
        retrieve_and_format_calendar_data();
    })
}


window.onload = function () {
    retrieve_and_format_calendar_data();
}
