/*
FORM OVERLAY
To use, create a container with a button that runs the form_overlay() function
*/

function form_overlay(
    form_id="form_container",
    submit_text="Submit"
) {
    document.getElementById(form_id).className = `form_overlay_background`;
    document.getElementById(form_id).innerHTML = `
    <div class="form_overlay_container">
        <button class="submit_button">${submit_text}</button>
    </div>
    `;
}
