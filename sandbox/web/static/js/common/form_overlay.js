/*
FORM OVERLAY
To use, create a container with a button that runs the form_overlay() function
*/

function form_overlay(
    form_id="form_container",
    form_name="Form",
    submit_text="Submit",
    form=[]
) {
    document.getElementById(form_id).className = `form_overlay_background`;

    form_fields = ``;
    for (i in form) {
        field = form[i]
        form_fields += `
            <span>${field.name}</span><input type="${field.type}"/><br>
        `
    }

    document.getElementById(form_id).innerHTML = `
    <div class="form_overlay_container">
        <button class="close_button" onclick="remove_form_overlay('${form_id}')">x</button>
        <h2>${form_name}</h2>
        ${form_fields}
        <button class="submit_button">${submit_text}</button>
    </div>
    `;
}

function remove_form_overlay(form_id) {
    document.getElementById(form_id).className = ``;
    document.getElementById(form_id).innerHTML = ``;
}
