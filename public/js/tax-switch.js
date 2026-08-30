let btn = document.querySelector("#switchCheckDefault");
let gst_text = document.querySelectorAll(".gst");
let checked = false;
for (gst of gst_text) {
    gst.style.display = "none";
    gst.style.color = "red";
}

btn.addEventListener("click", () => {
    if (checked) {
        checked = false;
    } else {
        checked = true;
    }

    if (checked) {
        for (gst of gst_text) {
            gst.style.display = "";
        }
    } else {
        for (gst of gst_text) {
            gst.style.display = "none";
        }
    }
})

