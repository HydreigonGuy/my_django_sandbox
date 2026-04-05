
function format_calendar_day_events(events) {
    formatted = ``;

    for (j in events) {
        evt = events[j];
        formatted += `
        <p>${evt.name}</p>
        <p>${evt.description}</p>
        `
    }
    return formatted;
}


function create_day(day, events) {
    formatted = ``
    console.log(events)
    for (i = 0; i  < 24; i += 1) {
        hour = i
        formatted += `
        <div class="calendar_hour_box">
            <p class="calendar_hour_name">${hour}</p>
            ${format_calendar_day_events(events.filter(function (evt) {
                return evt.start_time.split(":")[0] == `${hour}`
            }
            ))}
        </div>
        `;
    }
    return formatted
}


function fill_calendar_data(calendar_info) {
    console.log(calendar_info)
    formatted = "";
    day = new Date(calendar_info.start);
    end = new Date(calendar_info.end);
    while (day < end) {
        formatted += `<div class="day_container">
            <b>${day.toLocaleDateString()}</b>
            ${create_day(day, calendar_info.events.filter(function (evt) {
                    return evt.start_day == day.toISOString().split("T")[0]
                }))}
        </div>`;
        day.setDate(day.getDate() + 1);
    }
    document.getElementById("calendar_body").innerHTML = formatted;
}


function retrieve_and_format_calendar_data() {
    fetch("get")
    .then(resp => resp.json())
    .then(calendar_info => fill_calendar_data(calendar_info)); 
}


function create_new_event() {
    name = document.getElementById("form_name").value;
    description = document.getElementById("form_description").value;
    start = document.getElementById("form_start").value;
    end = document.getElementById("form_end").value;

    set_form_sending();
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
        remove_form_overlay('form_overlay_container');
        retrieve_and_format_calendar_data();
    })
}


window.onload = function () {
    document.getElementById("new_event_form").innerHTML = `
        <button class="new_event_btn" onclick="form_overlay(
            form_id='form_overlay_container',
            form_name='Create Event',
            submit_text='Create',
            form=[
                {
                    'name':'name',
                    'type':'text'
                },
                {
                    'name':'description',
                    'type':'text'
                },
                {
                    'name':'start',
                    'type':'datetime-local'
                },
                {
                    'name':'end',
                    'type':'datetime-local'
                }
            ],
            submit_function='create_new_event()'
        )">+ Create Event</button>
    `;

    retrieve_and_format_calendar_data();
}
