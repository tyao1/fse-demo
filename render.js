var elem = document.getElementById("container");

function render(state) {
  elem.innerHTML = `<div style="background: ${state.color}">
    <p>Count: ${state.count}</p>
    <button type="button" id="plus">+</button>
    <button type="button" id="minus">-</button>
    <ul>
      ${state.messages.map(msg => `<li>${msg}</li>`).join("")}
    </ul>
    <input id="input" type="text" placeholder="Enter Message"/>
    <button id ="send" type="button">Send</button>
  </div>`;
}
