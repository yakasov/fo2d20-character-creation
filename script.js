const CHARACTER = {
  derived: {
    hp: 8,
    defense: 1,
    carry: 215,
    melee: 1,
    initiative: 8,
  },
  gifted: [],
  name: null,
  special: {
    strength: 4,
    perception: 4,
    endurance: 4,
    charisma: 4,
    intelligence: 4,
    agility: 4,
    luck: 4,
  },
  traits: [],
  type: null,
};
let attributePoints = 12;

function characterType(type) {
  CHARACTER.type = type;

  document.getElementById("character-type-box").innerHTML =
    CHARACTER_TYPES[type];
  document.getElementById("character-trait-box").innerHTML =
    CHARACTER_TRAITS[type];

  // Reset SPECIAL stats
  attributePoints = 12;
  removeGiftedFromSpecials();
  Object.keys(CHARACTER.special).forEach((k) => {
    CHARACTER.special[k] = 4;
    document.getElementById(`${k}-stat`).innerHTML = "&emsp;&ensp;4&emsp;";
  });
  document.getElementById("special-points").innerText =
    "12 Attribute Points remaining";
  [...document.getElementsByName("special-decrease")].forEach(
    (e) => (e.disabled = true)
  );
  [...document.getElementsByName("special-increase")].forEach(
    (e) => (e.disabled = false)
  );
  CHARACTER.traits = [];

  if (type === "mutant") {
    CHARACTER.special.strength = 6;
    CHARACTER.special.endurance = 6;

    document.getElementById("strength-stat").innerHTML = "&emsp;&ensp;6&emsp;";
    document.getElementById("endurance-stat").innerHTML = "&emsp;&ensp;6&emsp;";
  }

  updateDerivedStats();
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
  if (CHARACTER.traits.includes(trait)) {
    CHARACTER.traits = CHARACTER.traits.filter((e) => e !== trait);
  } else {
    CHARACTER.traits.push(trait);
  }

  const els = [...document.getElementsByName("trait-select")];
  if (CHARACTER.traits.length === 2) {
    els.filter((e) => !e.checked).forEach((e) => (e.disabled = true));
  } else {
    els.forEach((e) => (e.disabled = false));
  }

  if (trait === "gifted") {
    if (CHARACTER.traits.includes("gifted")) {
      [...document.getElementsByName("gifted-bonus")].forEach((e) => {
        e.classList.remove("hidden");
        e.disabled = false;
      });
    } else {
      removeGiftedFromSpecials();
    }
  }

  updateDerivedStats();
}

function giftedSpecial(stat) {
  if (CHARACTER.gifted.includes(stat)) {
    CHARACTER.gifted = CHARACTER.gifted.filter((e) => e !== stat);
    CHARACTER.special[stat] = CHARACTER.special[stat] - 1;
  } else {
    CHARACTER.gifted.push(stat);
    CHARACTER.special[stat] = CHARACTER.special[stat] + 1;
  }

  const els = [...document.getElementsByName("gifted-bonus")];
  if (CHARACTER.gifted.length === 2) {
    els.filter((e) => !e.checked).forEach((e) => (e.disabled = true));
  } else {
    els.forEach((e) => (e.disabled = false));
  }

  Object.entries(CHARACTER.special).forEach(([k, v]) => {
    document.getElementById(`${k}-stat`).innerHTML = `&emsp;${
      v < 10 ? "&ensp;" : ""
    }${v}&emsp;`;
  });

  updateDerivedStats();
}

function removeGiftedFromSpecials() {
  CHARACTER.gifted.forEach((s) => {
    CHARACTER.special[s] = CHARACTER.special[s] - 1;
  });
  CHARACTER.gifted = [];

  Object.entries(CHARACTER.special).forEach(([k, v]) => {
    document.getElementById(`${k}-stat`).innerHTML = `&emsp;${
      v < 10 ? "&ensp;" : ""
    }${v}&emsp;`;
  });
  [...document.getElementsByName("gifted-bonus")].forEach((e) => {
    e.classList.add("hidden");
    e.checked = false;
    e.disabled = true;
  });
}

function isAtSpecialLimit(type, stat) {
  function f(s) {
    return (
      CHARACTER.special[s] - CHARACTER.gifted.filter((e) => e === s).length
    );
  }

  return (
    (type === "plus" &&
      ((CHARACTER.type === "mutant" &&
        (((stat === "strength" || stat === "endurance") && f(stat) === 12) ||
          ((stat === "intelligence" || stat === "charisma") && f(stat) === 6) ||
          ((stat === "perception" || stat === "agility" || stat === "luck") &&
            f(stat) === 10))) ||
        (CHARACTER.type !== "mutant" && f(stat) === 10))) ||
    (type !== "plus" &&
      CHARACTER.type === "mutant" &&
      (((stat === "strength" || stat === "endurance") && f(stat) === 6) ||
        (!(stat === "strength" || stat === "endurance") && f(stat) === 4))) ||
    (CHARACTER.type !== "mutant" && f(stat) === 4)
  );
}

function plusSpecial(stat) {
  CHARACTER.special[stat] = CHARACTER.special[stat] + 1;
  attributePoints--;

  document.getElementById(`${stat}-stat`).innerHTML = `&emsp;${
    CHARACTER.special[stat] < 10 ? "&ensp;" : ""
  }${CHARACTER.special[stat]}&emsp;`;
  document.getElementById(
    "special-points"
  ).innerText = `${attributePoints} Attribute Points remaining`;

  if (isAtSpecialLimit("plus", stat)) {
    document.getElementById(`${stat}-max`).disabled = true;
  } else {
    document.getElementById(`${stat}-max`).disabled = false;
  }
  document.getElementById(`${stat}-min`).disabled = false;

  if (attributePoints === 0) {
    [...document.getElementsByName("special-increase")].forEach(
      (e) => (e.disabled = true)
    );
  }

  updateDerivedStats();
}

function minusSpecial(stat) {
  CHARACTER.special[stat] = CHARACTER.special[stat] - 1;
  attributePoints++;

  document.getElementById(`${stat}-stat`).innerHTML = `&emsp;${
    CHARACTER.special[stat] < 10 ? "&ensp;" : ""
  }${CHARACTER.special[stat]}&emsp;`;
  document.getElementById(
    "special-points"
  ).innerText = `${attributePoints} Attribute Points remaining`;

  if (isAtSpecialLimit("minus", stat)) {
    document.getElementById(`${stat}-min`).disabled = true;
  } else {
    document.getElementById(`${stat}-min`).disabled = false;
  }
  document.getElementById(`${stat}-max`).disabled = false;

  if (attributePoints === 1) {
    [...document.getElementsByName("special-increase")].forEach(
      (e) => (e.disabled = false)
    );
  }

  updateDerivedStats();
}

function updateDerivedStats() {
  CHARACTER.derived.hp = CHARACTER.special.endurance + CHARACTER.special.luck;
  CHARACTER.derived.defense = CHARACTER.special.agility >= 9 ? 2 : 1;
  CHARACTER.derived.carry =
    (CHARACTER.traits.includes("small frame") ? 150 : 175) +
    CHARACTER.special.strength * 10;
  CHARACTER.derived.melee =
    (CHARACTER.special.strength >= 11
      ? 4
      : CHARACTER.special.strength >= 9
      ? 3
      : CHARACTER.special.strength >= 7
      ? 2
      : 1) + (CHARACTER.traits.includes("heavy handed") ? 1 : 0);
  CHARACTER.derived.initiative =
    CHARACTER.special.perception + CHARACTER.special.agility;

  document.getElementById("derived-hp").innerText = CHARACTER.derived.hp;
  document.getElementById("derived-defense").innerText =
    CHARACTER.derived.defense;
  document.getElementById(
    "derived-carry"
  ).innerText = `${CHARACTER.derived.carry} lbs`;
  document.getElementById("derived-melee").innerText = CHARACTER.derived.melee;
  document.getElementById("derived-initiative").innerText =
    CHARACTER.derived.initiative;
}
