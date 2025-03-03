const PICKED_TRAITS = [];

function characterType(type) {
  document.getElementById("character-type-box").innerHTML =
    CHARACTER_TYPES[type];
  document.getElementById("character-trait-box").innerHTML =
    CHARACTER_TRAITS[type];

  if (type === "mutant") {
    document.getElementById("special-minmaxes").innerHTML = `
      <span>6 - 12</span><br />
      <span>4 - 10</span><br />
      <span>6 - 12</span><br />
      <span>4 - &nbsp;&nbsp;6</span><br />
      <span>4 - &nbsp;&nbsp;6</span><br />
      <span>4 - 10</span><br />
      <span>4 - 10</span>
    `;
  } else {
    document.getElementById("special-minmaxes").innerHTML = `
      <span>4 - 10</span><br />
      <span>4 - 10</span><br />
      <span>4 - 10</span><br />
      <span>4 - 10</span><br />
      <span>4 - 10</span><br />
      <span>4 - 10</span><br />
      <span>4 - 10</span>
    `;
  }
}

function toggleDerived() {
  [...document.getElementsByName("derived")].forEach((e) =>
    e.classList.contains("hidden")
      ? e.classList.remove("hidden")
      : e.classList.add("hidden")
  );
}
