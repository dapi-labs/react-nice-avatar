/**
 * Pick random one from the list
 */
export const pickRandomFromList = (data, { avoidList = [], usually = [] } = {}) => {
  // Filter out avoid options
  const avoidSet = new Set(
    avoidList.filter((item) => Boolean(item))
  );
  let myData = data.filter((item) => !avoidSet.has(item));

  // Increase selecting possibility of usually options
  const usuallyData = usually
    .filter((item) => Boolean(item))
    .reduce((acc, cur) => acc.concat(new Array(15).fill(cur)), []);
  myData = myData.concat(usuallyData);

  // Pick randon one from the list
  const amount = myData.length;
  const randomIdx = Math.floor(Math.random() * amount);
  return myData[randomIdx];
};

/**
 * Gennerate avatar configurations
 */
export const defaultOptions = {
  sex: ["man", "woman"],
  faceColor: ["#F9C9B6", "#AC6651"],
  earSize: ["small", "big"],
  hairColor: ["#000", "#fff", "#77311D", "#FC909F", "#D2EFF3", "#506AF4", "#F48150"],
  hairStyleMan: ["normal", "thick", "mohawk"],
  hairStyleWoman: ["normal", "womanLong", "womanShort"],
  hatColor: ["#000", "#fff", "#77311D", "#FC909F", "#D2EFF3", "#506AF4", "#F48150"],
  hatStyle: ["beanie", "turban", "none"],
  eyeBrowWoman: ["up", "upWoman"],
  eyeStyle: ["circle", "oval", "smile"],
  glassesStyle: ["round", "square", "none"],
  noseStyle: ["short", "long", "round"],
  mouthStyle: ["laugh", "smile", "peace"],
  shirtStyle: ["hoody", "short", "polo"],
  shirtColor: ["#9287FF", "#6BD9E9", "#FC909F", "#F4D150", "#77311D"],
  bgColor: ["#9287FF", "#6BD9E9", "#FC909F", "#F4D150", "#E0DDFF", "#D2EFF3", "#FFEDEF", "#FFEBA4", "#506AF4", "#F48150", "#74D153"]
};
export const genConfig = (userConfig = {}) => {
  const response = {};
  response.sex = userConfig.sex || pickRandomFromList(defaultOptions.sex);
  response.faceColor = userConfig.faceColor || pickRandomFromList(defaultOptions.faceColor);
  response.earSize = userConfig.earSize || pickRandomFromList(defaultOptions.earSize);
  response.eyeStyle = userConfig.eyeStyle || pickRandomFromList(defaultOptions.eyeStyle);
  response.noseStyle = userConfig.noseStyle || pickRandomFromList(defaultOptions.noseStyle);
  response.mouthStyle = userConfig.mouthStyle || pickRandomFromList(defaultOptions.mouthStyle);
  response.shirtStyle = userConfig.shirtStyle || pickRandomFromList(defaultOptions.shirtStyle);
  response.glassesStyle = userConfig.glassesStyle || pickRandomFromList(defaultOptions.glassesStyle, { usually: ["none"] });

  // Hair
  let hairColorAvoidList = [];
  let hairColorUsually = [];
  if (!userConfig.hairColor) {
    switch (response.sex) {
      case "woman": {
        hairColorAvoidList = response.faceColor === defaultOptions.faceColor[1] && ["#77311D"] || [];
        break;
      }
      case "man": {
        hairColorUsually = ["#000"];
      }
    }
  }
  response.hairColor = userConfig.hairColor || pickRandomFromList(defaultOptions.hairColor, {
    avoidList: hairColorAvoidList,
    usually: hairColorUsually
  });

  let myHairStyle = userConfig.hairStyle;
  if (!myHairStyle) {
    switch (response.sex) {
      case "man": {
        myHairStyle = pickRandomFromList(defaultOptions.hairStyleMan, { usually: ["normal", "thick"] });
        break;
      }
      case "woman": {
        myHairStyle = pickRandomFromList(defaultOptions.hairStyleWoman);
        break;
      }
    }
  }
  response.hairStyle = myHairStyle;

  // Hat
  response.hatStyle = userConfig.hatStyle || pickRandomFromList(defaultOptions.hatStyle, { usually: ["none"] });
  response.hatColor = userConfig.hatColor || pickRandomFromList(defaultOptions.hatColor);
  const _hairOrHatColor = response.hatStyle === "none" && response.hairColor || response.hatColor;

  // Eyebrow
  let myEyeBrowStyle = userConfig.eyeBrowStyle || "up";
  if (!userConfig.eyeBrowStyle && response.sex === "woman") {
    myEyeBrowStyle = pickRandomFromList(defaultOptions.eyeBrowWoman);
  }
  response.eyeBrowStyle = myEyeBrowStyle;

  // Shirt color
  response.shirtColor = userConfig.shirtColor || pickRandomFromList(defaultOptions.shirtColor, { avoidList: [_hairOrHatColor] });

  // Background color
  response.bgColor = userConfig.bgColor || pickRandomFromList(defaultOptions.bgColor, { avoidList: [_hairOrHatColor, response.shirtColor] });

  return response;
};
