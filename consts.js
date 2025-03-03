const CHARACTER_TRAITS = {
  vault: `<b>Vault Kid:</b> Your healthier start to life at the hands of trained doctors and sophisticated auto-docs means you reduce the difficulty of all END checks to resist the effects of disease. In addition, your carefully-planned upbringing means you have one additional Tag skill of your choice. You can work with the GM to decide what sort of experiment took place in your Vault.
    <br /><br />
    Once per quest, the GM may introduce a complication that reflects the nature of the experiment you unwittingly took part in, or introduce a complication related to your early life of isolation and confinement within the Vault. If the GM does this, you immediately regain one Luck Point.
    `,
  survivor: `You may choose two of the following traits, or one trait and one additional perk. Each trait has a benefit and may have an accompanying penalty.
    <br /><br />
    <b>Educated:</b> You have one additional tag skill, but if you fail a skill check using a skill other than a tag skill, the GM gains 1 AP.
    <br />
    <b>Fast Shot:</b> If you take a second major action in combat, and use it to make a range attack, the additional action costs 1 AP rather than 2 AP - however, you cannot use the Aim minor action.
    <br />
    <b>Gifted:</b> Choose two S.P.E.C.I.A.L attributes and increase them by +1 each, but your maximum of Luck points is one fewer than your Luck attribute. 
    <br />
    <b>Heavy Handed:</b> Your Melee Damage bonus increases by +1 Combat Die, but your melee and unarmed attacks suffer a complication on a 1 or 2, as opposed to just a 1.
    <br />
    <b>Small Frame:</b> You may re-roll 1d20 on all AGI checks which rely on balance or contortion, but your carry weight is reduced to <i>150 + 5 x STR lbs</i>. 
    `,
  brotherhood: `<b>The Chain that Binds:</b> You gain one additional Tag skill, which must be either Energy Weapons, Science or Repair.
    <br /><br />
    As a member of the Brotherhood of Steel, you are bound by the chain of command: The Chain that Binds. You must carry out the orders of your immediate superiors, and you are responsible for your subordinate siblings. If you do not carry out your duty, you are expelled from the Brotherhood and your technology will be reclaimed - by any means necessary. Leaving the Brotherhood is unconventional - this would make you an Outcast.
    `,
  ghoul: `<b>Necrotic Post-Human:</b> You are not only immune to radiation damage, but you are healed by it - you regain 1HP for every 3 points of radiation damage inflicted upon you, and if you rest in an irradiated location, you may re-roll your dice pool when checking if your injuries heal. In addition, Survival is automatically a Tag skill, increasing it by 2 ranks.
    <br /><br />
    You age at a much-decreased rate, and you're probably older than your unmutated companions - you may have even survived the Great War of 2077 - but you are sterile (as the saying goes, "the first generation of ghouls is the last generation of ghouls"). You may face discrimination from "smoothskins" (humans who aren't ghouls), increasing the difficulty or complication range of your CHA checks depending on your opponent's beliefs.
    `,
  robot: `<b>Mister Handy Robot:</b> You have complete 360-degree vision and improved sensory systems that can detect smells, chemicals and radiation, reducing the difficulty of PER checks that rely on sight or smell by 1. You are also immune to radiation and poison damage, but you cannot use chems, nor can you benefit from food, drink or rest. You move by jet propulsion, unaffected by difficult terrain or obstacles. Your carry weight is locked to 150lbs, and can only be increased by specialised armour. You cannot recover from your own injuries or heal health points without receiving repairs.
    <br /><br />
    You cannot manipulate the physical world like humans, and must instead decide on which three arms you would like (any of which can also be weapons).
    <br /><br />
    <b>Arm Attachments</b>
    <br />
    <b>10mm Auto Pistol:</b> You can make ranged attacks using a 10mm auto pistol.
    <br />
    <b>Buzz-Saw:</b> You can cut objects and make melee attacks with a circular saw. The buzz-saw inflicts 3 Combat Dice x Piercing 1 physical damage.
    <br />
    <b>Flamer:</b> You can set objects aligh, cook food, or make ranged attacks with a short-range flamethrower.
    <br />
    <b>Laser Emitter:</b> You can cut objects or make ranged attacks using a laser.
    <br />
    <b>Pincer:</b> You can pick up objects with an individual pincer that weighs no more than 40 lbs. and manipulate objects in your environment. You may also make unarmed attacks (2 Combat Dice x physical damage) with the pincer.
    <br /><br />
    You can choose to not have a pincer attachment as a Mister Handy, but in doing so, you will be unable to make unarmed attacks, manipulate objects, and you cannot make attempt checks that use the Lockpick, Repair or Throwing skills.`,
  mutant: `<b>Forced Evolution:</b> Your initial STR and END attributes are increased by +2, and their caps are also increased, but your maximum INT and CHA are reduced to 6. You may not have more than 4 ranks in any skill. You are completely immune to radiation and poison damage.
    <br /><br />
    You stand over seven feet tall, and your body is bulky and muscular. Your skin is green, yellow or gray, regardless of your colour when you were human. You may not seem to age, but you are sterile. You can only wear specialised armour built for your frame.
    `,
};

const CHARACTER_TYPES = {
  vault: `When the bombs were falling, you or your predecessors were lucky enough to be safely secured in one of the one hundred and twenty-two Vault-Tec facilities, deep underground protected by thick blast doors and layers of rock and concrete. Your family either had enough money to buy their space or were randomly selected to enter the vault to be saved from the nuclear devastation above—perhaps only to be condemned to immoral experiments run by Vault-Tec on unwitting participants.
    <br /><br />
    You are free from mutation and disease. The VaultTec program has afforded you a safe home for some time, but not without some cost. The vault you came from used you as a human test subject, manipulating your understanding of the world and your behavior in order to study you. That’s left you with a profound psychological change, compared to the survivors on the surface you now know, and affects how you make your way through the wasteland.
    <br /><br />
    Whether through design or poor planning, many of the vaults were not well stocked or prepared for the long wait until nuclear fallout had reached safe levels outside, and many fell into disrepair or out of supplies. Due to these shortcomings, many vault dwellers sought help from the surface, and many vaults opened in order to allow supplies to reach them. By opening their vault doors, the isolated societies inside opened themselves up to mixing with the survivors above, and established a permanent connection with the surface—the most notable example being the residents of Vault 15, who split up and went on to establish the settlement Shady Sands, as well as the raiding gangs of the Jackals, Vipers, and Khans when their vault opened.
    `,
  survivor: `You are the living legacy of the people who prepared for Armageddon on their own. You are only alive in the post-nuclear apocalyptic landscape because your forebears dug in, survived, and found community enough to continue humanity’s existence.
    <br /><br />
    You could be from any number of settlements, isolated shelters, or traveling groups that sparsely populate the wasteland from West Coast to East Coast. You could be from the New California Republic, carrying on the legacy of Vault 15 and Shady Sands. You could fight to protect others, calling a group of survivors like the Minutemen or the Regulators your home. You could also be a merciless raider or be born into one of these groups but escaped in order to rehabilitate and reform.
    <br /><br />
    Wherever you are from, or wherever you travel, making connections and laying down roots can be hard. Survivors are naturally wary of others, and are always on the lookout for the next conman, raiding party, or thief that will take their hard-earned resources. Travelling vast distances is difficult too, and many travelling survivors—particularly trading caravans—move between large settlements within their area of the wasteland, rather than travelling from coast to coast.
    `,
  brotherhood: `Born from the terrible revelations of the Mariposa Rebellion, Roger Maxson formed the Brotherhood of Steel so that his people—and eventually the rest of the survivors in this new world—would have something to believe in. With its own mythology, creed, and hierarchy, the Brotherhood of Steel’s primary goal is the recovery and preservation of the technology of the pre-war world. With the Great War disrupting humanity’s access to technology, the Brotherhood’s knights and scribes do all they can to secure the technology of the past, for the needs of future generations.
    <br /><br />
    You may be a descendant of a knight or paladin, born into the Brotherhood and a firm believer of their doctrine, or you may be a new recruit, pledging yourself to their cause and looking to rise through their ranks.
    <br /><br />
    Although the Brotherhood share a common goal, their chapters across the wasteland can have different beliefs and protocols, and they aren’t as unified as they seem from the outside. While the West Coast Brotherhood of Steel warred with the New California Republic over reclamation of technology and the NCR’s expansion efforts, the East Coast chapter was effectively isolated when it prioritized charity over the exchange of technology and the preservation of pre-war equipment. Elder Lyons’ mission became humanitarian, and while that earned them isolation at first, Arthur Maxson led their expansion of influence from Washington D.C. to the entire Eastern Seaboard, refocusing their efforts on technological recovery and development
    `,
  ghoul: `Prolonged exposure to the effects of background gamma radiation—part of the fallout of the Great War—can spontaneously mutate humans. You are one of those mutants. Either slowly, or strangely spontaneously, your body changed into that of a rotting, living corpse. You no longer age the same way, and appear unaffected by radiation. Your skin peels from your flesh but seems to be sustained by your mutated metabolism.
    <br /><br />
    You are a “ghoul”—a necrotic post-human—one of many rag-tag survivors who weren’t lucky enough to get into a Vault-Tec facility. You may have been born after the war, and over time developed the necrotic mutation. You may have come from Vault 12 in Bakersfield, California, whose vault door did not close, exposing the population to the radiation from outside. You may have taken refuge in a ghoul settlement, like Underworld in the Capital Wasteland, and have ventured out recently to explore, scavenge, and survive.
    <br /><br />
    Civilized ghouls, such as yourself, also fear a possible degeneration into a frenzied, feral nature. Feral ghouls are necrotic mutants like yourself who have lost higher brain functions, and reverted to a primal, violent state. They attack non-ghouls indiscriminately to defend their territory or feed. Whether this loss of reason is due to acute levels of radiation or the inevitable outcome of the mutation, you’re not sure, and that makes it all the more terrifying.
    `,
  robot: `The General Atomics International robot “Mister Handy” exploded onto the robotic market as a reliable construction robot, known for its durability and ease of maintenance, but its real breakthrough came in a collaboration with RobCo to produce a domestic model.
    <br /><br />
    You are one of these domestic automatons, produced some time between 2037 and 2077, seeking to provide every household in America with butler-like servitude. Equipped with state-of-the-art programming, you have initiative and can adapt your own coding to learn more from your environment. This capacity for self-determination is what has enabled your survival beyond the Great War; where other robots may have broken down, you have managed to shake loose from the shackles of your programming and find a life for yourself.
    <br /><br />
    Many models exist, and you could come from any of the Mister Handy, Mister Gutsy, Miss Nanny, or Mister Orderly series. You are powered by a nuclear core, can replace your own fuel, and repair yourself or other Mister Handy units. Your model has three mechanical arms and three mechanical eyes on stalks, and your jet propulsion keeps you hovering above the ground, providing you have all the fuel you need. With this rugged design, you have survived so far.
    `,
  mutant: `You are a brutal, mutated human, forced to evolve from thoughtless experiments by the twisted science of the pre- and post-war world. Infected with the Forced Evolutionary Virus (F.E.V.), your body has mutated into a tall, muscular killing machine, filled with a rage.
    <br /><br />
    You could have originated from the Master’s army at the Mariposa military base, California, created as he experimented on unwilling human victims, splitting into one of the factions upon his death to attack or rebuild the wasteland with its survivors. Your origins could be rooted in the Evolutionary Experimentation Program of Vault 87, whose super mutant groups terrorize the Capital Wasteland. You could have been abducted from the Commonwealth and exposed to the F.E.V. by the Institute and disposed of back into the wasteland to fend for yourself in small bands of raiders. Or finally, you could have been a resident of Huntersville, Appalachia, whose water supply was contaminated with the virus and the mutations went unchecked.
    <br /><br />
    Although these super mutants share the same qualities, the groups formed from the three strains haven’t mixed, and there is little evidence they have met one another. While some groups have migrated or moved in their lifetime, none have travelled far enough to encounter one another, so where your quests take place will likely dictate your origin.
    `,
};
