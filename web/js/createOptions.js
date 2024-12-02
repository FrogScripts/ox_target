import { fetchNui } from "./fetchNui.js";

const optionsWrapper = document.getElementById("options-wrapper");

function onClick() {
  this.style.pointerEvents = "none";

  fetchNui("select", [this.targetType, this.targetId, this.zoneId]);
  setTimeout(() => (this.style.pointerEvents = "auto"), 100);
}

export function createOptions(type, data, id, zoneId) {
  if (data.hide) return;

  const option = document.createElement("div");
  const iconElement = `<i class="fa-fw ${data.icon} option-icon" ${
    data.iconColor ? `style = color:${data.iconColor} !important` : null
  }"></i>`;

  option.innerHTML = `${iconElement}`;
  option.className = "option-container menu-item itemClass";
  option.targetType = type;
  option.targetId = id;
  option.zoneId = zoneId;
  $('.center').text(data.label);
  option.addEventListener("click", onClick);
  optionsWrapper.appendChild(option);

  $(".option-container").hover((e) => {
    $(".option-icon").css("color", e.type === "mouseenter" ? "white" : "rgba(255,255,255,0.5)");
  });

  let icons = document.querySelectorAll('.option-icon');
  for (let i = 0, l = icons.length; i < l; i++) {
    if (!$(icons[i]).hasClass('fas')) {
      $(icons[i]).addClass('fa-solid fa-question');
      $(icons[i]).css('color', 'white');
    }
  }

  let radialItems = document.querySelectorAll('.itemClass');
  for (let i = 0, l = radialItems.length; i < l; i++) {
    radialItems[i].style.left = (50 - 35 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
    radialItems[i].style.top = (50 + 35 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
  }

  $(option).mouseleave(function() {
    $(option).css({ opacity: 0.8 });
    $('.center').text('Hover on the option');
    $('.center').css({ opacity: 0.0 });
  });

  $(option).mouseenter(function() {
    $(option).css({ opacity: 1 });
    $('.center').css({ opacity: 1 });
    $('.center').text(data.label);
  });
}
