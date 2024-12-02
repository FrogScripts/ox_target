import { createOptions } from "./createOptions.js";

const optionsWrapper = document.getElementById("options-wrapper");
const body = document.body;
const eye = document.getElementById("eyeSvg");

window.addEventListener("message", (event) => {
  optionsWrapper.innerHTML = "";

  switch (event.data.event) {
    case "visible": {
      body.style.visibility = event.data.state ? "visible" : "hidden";
      $('#eyeSvg').css('transform', 'translateY(0px)');
      $('.iconClass').removeClass('fa-check');
      $('#eyeSvg').css('color', 'white');
      $('.center').text('');
      $('.iconClass').addClass('fa-question');
      return eye.classList.remove("eye-hover");
    }

    case "leftTarget": {
      $('.center').text('');
      $('#eyeSvg').css('transform', 'translateY(0px)');
      $('.iconClass').removeClass('fa-check');
      $('#eyeSvg').css('color', 'white');
      $('.iconClass').addClass('fa-question');
      return eye.classList.remove("eye-hover");
    }

    case "setTarget": {
      $('.center').text('');
      eye.style.fill = '#cfd2da';
      $('#eyeSvg').css('transform', 'translateY(30px)');
      $('#eyeSvg').css('color', 'rgb(0,247,181)');
      $('.iconClass').removeClass('fa-question');
      $('.iconClass').addClass('fa-check');
      eye.classList.add("eye-hover");

      if (event.data.options) {
        for (const type in event.data.options) {
          event.data.options[type].forEach((data, id) => {
            createOptions(type, data, id + 1);
          });
        }
      }

      if (event.data.zones) {
        for (let i = 0; i < event.data.zones.length; i++) {
          event.data.zones[i].forEach((data, id) => {
            createOptions("zones", data, id + 1, i + 1);
          });
        }
      }
    }
  }
});
