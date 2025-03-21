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
  perks: [],
  skills: {
    athletics: 0,
    barter: 0,
    big_guns: 0,
    energy_weapons: 0,
    explosives: 0,
    lockpick: 0,
    medicine: 0,
    melee_weapons: 0,
    pilot: 0,
    repair: 0,
    science: 0,
    small_guns: 0,
    sneak: 0,
    speech: 0,
    survival: 0,
    throwing: 0,
    unarmed: 0,
  },
  special: {
    strength: 4,
    perception: 4,
    endurance: 4,
    charisma: 4,
    intelligence: 4,
    agility: 4,
    luck: 4,
  },
  tags: [],
  traits: [],
  type: null,
};
let attributePoints = 12;

let perk_els = [];
let maxPerks = () =>
  1 + (CHARACTER.type === "survivor" && CHARACTER.traits.length === 1);

const BOS_TAGS = ["energy_weapons", "repair", "science"];
let allocatedSkillPoints = 0;
let skillPointsMax = () => 9 + CHARACTER.special.intelligence;
let tagSkillsMax = () =>
  4 +
  (CHARACTER.traits.includes("educated") ? 1 : 0) +
  (CHARACTER.type === "brotherhood" ? 1 : 0) -
  (CHARACTER.type === "ghoul" ? 1 : 0);

let skipValidate = false;

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
    els.forEach((e) => (e.disabled = !e.checked));
  } else {
    els.forEach((e) => (e.disabled = false));
  }

  if (trait === "autism") {
    autismSpecial();
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

function autismSpecial() {
  if (CHARACTER.traits.includes("autism")) {
    CHARACTER.special.perception = CHARACTER.special.perception - 1;
    CHARACTER.special.charisma = CHARACTER.special.charisma + 1;
    CHARACTER.special.agility = CHARACTER.special.agility + 1;
  } else {
    CHARACTER.special.perception = CHARACTER.special.perception + 1;
    CHARACTER.special.charisma = CHARACTER.special.charisma - 1;
    CHARACTER.special.agility = CHARACTER.special.agility - 1;
  }

  Object.entries(CHARACTER.special).forEach(([k, v]) => {
    document.getElementById(`${k}-stat`).innerHTML = `&emsp;${
      v < 10 ? "&ensp;" : ""
    }${v}&emsp;`;
  });
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
    els.forEach((e) => (e.disabled = !e.checked));
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

  function g() {
    return (
      (CHARACTER.traits.includes("autism") && f("perception") === 3) ||
      (!CHARACTER.traits.includes("autism") && f("perception") === 4)
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
    (CHARACTER.type !== "mutant" && stat === "perception" ? g() : f(stat) === 4)
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
  CHARACTER.derived.hp =
    CHARACTER.special.endurance +
    CHARACTER.special.luck +
    CHARACTER.traits.includes("autism");
  CHARACTER.derived.defense = CHARACTER.special.agility >= 9 ? 2 : 1;
  CHARACTER.derived.carry =
    CHARACTER.type === "robot"
      ? 150
      : (CHARACTER.traits.includes("small frame") ? 150 : 175) +
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

function validateNextPage(page) {
  switch (page) {
    case 1:
      document.getElementById("page2").classList.add("hidden");
      document.getElementById("page1").classList.remove("hidden");
      break;
    case 2:
      if (!skipValidate) {
        if (!CHARACTER.type) {
          return alert("You must pick a character type!");
        }

        if (attributePoints !== 0) {
          return alert("You have unspent SPECIAL attribute points!");
        }

        if (CHARACTER.type === "survivor" && CHARACTER.traits.length === 0) {
          return alert("As a survivor, you must pick at least one trait!");
        }

        if (
          CHARACTER.type === "survivor" &&
          CHARACTER.traits.includes("gifted") &&
          CHARACTER.gifted.length !== 2
        ) {
          return alert("You have unpicked Gifted attribute allocations!");
        }

        if (!CHARACTER.name) {
          return alert("Please enter a name!");
        }
      }

      updateSkillPointsLeft();
      document.getElementById("page1").classList.add("hidden");
      document.getElementById("page2").classList.remove("hidden");
      document.getElementById("page3").classList.add("hidden");
      break;
    case 3:
      if (!skipValidate) {
        if (allocatedSkillPoints !== skillPointsMax()) {
          return alert("You have not allocated all of your skill points!");
        }

        if (CHARACTER.tags.length !== tagSkillsMax()) {
          return alert("You have not allocated all of your Tag skills!");
        }
      }

      setRequirementColours();
      document.getElementById("page2").classList.add("hidden");
      document.getElementById("page3").classList.remove("hidden");
      document.getElementById("page4").classList.add("hidden");
      break;
    case 4:
      if (!skipValidate) {
        if (CHARACTER.perks.length !== maxPerks()) {
          return alert(
            `You have not chosen all your perks! You have a maximum of ${maxPerks()}.`
          );
        }
      }

      setSummary();
      document.getElementById("page3").classList.add("hidden");
      document.getElementById("page4").classList.remove("hidden");
      break;
    default:
      break;
  }
}

function plusSkill(skill) {
  CHARACTER.skills[skill] = CHARACTER.skills[skill] + 1;
  allocatedSkillPoints++;

  if (CHARACTER.skills[skill] === 3) {
    document.getElementById(`${skill}-max`).disabled = true;
  }
  document.getElementById(`${skill}-min`).disabled = false;

  if (allocatedSkillPoints >= skillPointsMax()) {
    [...document.getElementsByName("skill-increase")].forEach(
      (e) => (e.disabled = true)
    );
  }

  document.getElementById(`${skill}-skill`).innerText = CHARACTER.skills[skill];
  updateSkillPointsLeft();
}

function minusSkill(skill) {
  CHARACTER.skills[skill] = CHARACTER.skills[skill] - 1;
  allocatedSkillPoints--;

  if (
    CHARACTER.skills[skill] === 0 ||
    (CHARACTER.tags.includes(skill) && CHARACTER.skills[skill] === 2)
  ) {
    document.getElementById(`${skill}-min`).disabled = true;
  }
  document.getElementById(`${skill}-max`).disabled = false;

  if (allocatedSkillPoints === 0) {
    [...document.getElementsByName("skill-decrease")].forEach(
      (e) => (e.disabled = true)
    );
  }

  document.getElementById(`${skill}-skill`).innerText = CHARACTER.skills[skill];
  updateSkillPointsLeft();
}

function tagSkill(skill) {
  if (CHARACTER.tags.includes(skill)) {
    CHARACTER.tags = CHARACTER.tags.filter((e) => e !== skill);
  } else {
    CHARACTER.tags.push(skill);
  }

  if (
    CHARACTER.tags.length === tagSkillsMax() ||
    (CHARACTER.tags.length === tagSkillsMax() - 1 &&
      CHARACTER.type === "brotherhood" &&
      !BOS_TAGS.some((t) => CHARACTER.tags.includes(t)))
  ) {
    [...document.getElementsByName("tag-box")].forEach(
      (e) => (e.disabled = !e.checked)
    );
  } else {
    [...document.getElementsByName("tag-box")].forEach(
      (e) => (e.disabled = false)
    );
  }

  if (
    CHARACTER.tags.length === tagSkillsMax() - 1 &&
    CHARACTER.type === "brotherhood" &&
    !BOS_TAGS.some((t) => CHARACTER.tags.includes(t))
  ) {
    BOS_TAGS.forEach((t) => {
      document.getElementById(`bos-${t}`).disabled = false;
    });
  }

  const newSkillValue =
    CHARACTER.skills[skill] + (CHARACTER.tags.includes(skill) ? 2 : -2);
  if (newSkillValue > 3) {
    CHARACTER.skills[skill] = 3;
    allocatedSkillPoints = allocatedSkillPoints - (newSkillValue - 3);
  } else {
    CHARACTER.skills[skill] = newSkillValue;
  }

  if (CHARACTER.skills[skill] === 3) {
    document.getElementById(`${skill}-max`).disabled = true;
  } else if (allocatedSkillPoints < skillPointsMax()) {
    document.getElementById(`${skill}-max`).disabled = false;
  }

  document.getElementById(`${skill}-skill`).innerText = CHARACTER.skills[skill];
  updateSkillPointsLeft();
}

function updateSkillPointsLeft() {
  document.getElementById("skill-points-left").innerText = `You have ${
    skillPointsMax() - allocatedSkillPoints
  } skill points left and ${
    tagSkillsMax() - CHARACTER.tags.length
  } tag skills left.`;

  Object.entries(CHARACTER.skills).forEach(([k, v]) => {
    document.getElementById(`${k}-max`).disabled =
      v === 3 || allocatedSkillPoints >= skillPointsMax();
  });
}

function setRequirementColours() {
  [...document.getElementsByClassName("perk-css")].forEach((d) => {
    const perkName = d.onclick.toString().match(/\'(.*?)\'\)/)[1];
    let isValid = true;
    Object.entries(PERK_REQUIREMENTS[perkName]).forEach(([k, v]) => {
      if (CHARACTER.special[k] < v) {
        isValid = false;
      }
    });

    if (!isValid) {
      d.children["requirements-line"].classList.add("red");
    } else {
      d.children["requirements-line"].classList.remove("red");
    }
  });
}

function choosePerk(el, perk) {
  let isValid = true;
  Object.entries(PERK_REQUIREMENTS[perk]).forEach(([k, v]) => {
    if (CHARACTER.special[k] < v) {
      isValid = false;
    }
  });

  if (!isValid && !skipValidate) {
    return alert("You do not meet the requirements for this perk!");
  }

  if (CHARACTER.perks.includes(perk)) {
    el.classList.remove("chosen-perk");
    perk_els = perk_els.filter((e) => e !== el);
    CHARACTER.perks = CHARACTER.perks.filter((p) => p !== perk);
  } else {
    if (perk_els.length === maxPerks()) {
      const oldEl = perk_els.shift();
      oldEl.classList.remove("chosen-perk");
      CHARACTER.perks.shift();
    }

    perk_els.push(el);
    el.classList.add("chosen-perk");
    CHARACTER.perks.push(perk);
  }
}

function setSummary() {
  document.getElementById("final-name").innerText =
    CHARACTER.name ?? "validate test name";
  document.getElementById("final-type").innerText =
    CHARACTER.type ?? "validate test type";

  Object.entries(CHARACTER.special).forEach(([k, v]) => {
    document.getElementById(`final-special-${k}`).innerHTML = `<b>${
      k.charAt(0).toUpperCase() + k.slice(1)
    }:</b> ${v}`;
  });

  document.getElementById("final-traits").innerText = CHARACTER.traits.length
    ? CHARACTER.traits.join(", ")
    : CHARACTER_TRAITS_LOCKED[CHARACTER.type];

  document.getElementById("final-gifted").innerText = CHARACTER.gifted.length
    ? CHARACTER.gifted.join(", ")
    : "No";

  Object.entries(CHARACTER.derived).forEach(([k, v]) => {
    document.getElementById(`final-derived-${k}`).innerHTML = `<b>${
      k.charAt(0).toUpperCase() + k.slice(1)
    }:</b> ${v} ${k === "carry" ? "lbs" : ""}`;
  });

  Object.entries(CHARACTER.skills).forEach(([k, v]) => {
    document.getElementById(`final-skill-${k}`).innerHTML = `<b>${
      k.includes("_")
        ? SKILL_STRING_REPLACEMENTS[k]
        : k.charAt(0).toUpperCase() + k.slice(1)
    }:</b> ${v}${CHARACTER.tags.includes(k) ? "*" : ""}`;
  });

  document.getElementById("final-perks").innerText = CHARACTER.perks.join(", ");
}
