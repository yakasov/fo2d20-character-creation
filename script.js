const CHARACTER = {
  name: null,
  traits: [],
  type: null
}

function characterType(type) {
  CHARACTER.type = type;

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
      <span>4 - 10</span><br />
    `;
  } else {
    document.getElementById("special-minmaxes").innerHTML = `
      <span>4 - 10</span><br />
      <span>4 - 10</span><br />
      <span>4 - 10</span><br />
      <span>4 - 10</span><br />
      <span>4 - 10</span><br />
      <span>4 - 10</span><br />
      <span>4 - 10</span><br />
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

function updateName(el) {
  CHARACTER.name = el.value;
}

function selectTrait(trait) {
  if (CHARACTER.type === "survivor") {
    if (CHARACTER.traits.includes(trait)) {
      CHARACTER.traits = CHARACTER.traits.filter((e) => e !== trait);
    } else {
      CHARACTER.traits.push(trait);
    }

    const els = [...document.getElementsByName("trait-select")];
    if (CHARACTER.traits.length === 2) {
      els.filter((e) => !e.checked).forEach((e) => e.disabled = true);
    } else {
      els.forEach((e) => e.disabled = false);
    }
  }
}