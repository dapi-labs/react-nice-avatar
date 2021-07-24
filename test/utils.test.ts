import { pickRandomFromList, genConfig, defaultOptions } from "../src/utils";
import {
  Sex,
  EarSize,
  HairStyle,
  HatStyle,
  EyeStyle,
  GlassesStyle,
  NoseStyle,
  MouthStyle,
  ShirtStyle,
  AvatarFullConfig
} from "../src/types"

interface InputOpt {
  sex: Sex,
  faceColor: string,
  earSize: EarSize,
  hairColor: string,
  hairStyle: HairStyle,
  hatColor: string,
  hatStyle: HatStyle,
  eyeStyle: EyeStyle,
  glassesStyle: GlassesStyle,
  noseStyle: NoseStyle,
  mouthStyle: MouthStyle,
  shirtStyle: ShirtStyle,
  shirtColor: string,
  bgColor: string
}

describe("utils", () => {
  describe("pickRandomFromList", () => {
    it("should able to pick one from the list", () => {
      const data = [11, 22, 33];
      const output = pickRandomFromList(data);
      expect(data).toContain(output);
    });

    it("should able to filter out avoidList", () => {
      const data = [11, 22, 33];
      const output = pickRandomFromList(data, { avoidList: [11, undefined, 22] });
      expect(output).toBe(33);
    });

    it("should able to increase the ability of usually", () => {
      const data = [11, 22, 33];

      const outputs: number[] = [];
      for (let i = 0; i < 3; i++) {
        const output = pickRandomFromList(data, { usually: [33, undefined] });
        outputs.push(output);
      }
      expect(outputs).toContain(33);
    });
  });

  describe("genConfig", () => {
    it("should return same specified configurations", () => {
      const myConfig: InputOpt = {
        sex: "man",
        faceColor: "#AC6651",
        earSize: "big",
        hairColor: "#fff",
        hairStyle: "mohawk",
        hatColor: "#506AF4",
        hatStyle: "turban",
        eyeStyle: "oval",
        glassesStyle: "square",
        noseStyle: "round",
        mouthStyle: "smile",
        shirtStyle: "polo",
        shirtColor: "#F4D150",
        bgColor: "#E0DDFF"
      };
      const output: AvatarFullConfig = genConfig(myConfig);
      delete output.eyeBrowStyle;
      expect(output).toEqual(myConfig);
    });

    it("should pick random opt if not supplied", () => {
      const output = genConfig({});
      expect(defaultOptions.sex).toContain(output.sex);
      expect(defaultOptions.faceColor).toContain(output.faceColor);
      expect(defaultOptions.earSize).toContain(output.earSize);
      expect(defaultOptions.eyeStyle).toContain(output.eyeStyle);
      expect(defaultOptions.noseStyle).toContain(output.noseStyle);
      expect(defaultOptions.mouthStyle).toContain(output.mouthStyle);
      expect(defaultOptions.shirtStyle).toContain(output.shirtStyle);
      expect(defaultOptions.glassesStyle).toContain(output.glassesStyle);
    });

    it("should not have hairColor #77311D for woman with faceColor[1]", () => {
      const output = genConfig({
        sex: "woman",
        faceColor: defaultOptions.faceColor[1]
      });
      expect(output.hairColor).not.toBe("#77311D");
    });

    it("should only return man hairStyle for men", () => {
      const output = genConfig({
        sex: "man"
      });
      expect(defaultOptions.hairStyleMan).toContain(output.hairStyle);
    });

    it("should only return woman hairStyle for women", () => {
      const output = genConfig({
        sex: "woman"
      });
      expect(defaultOptions.hairStyleWoman).toContain(output.hairStyle);
    });

    it("should only return up eyeBrowStyle for man", () => {
      const output = genConfig({
        sex: "man"
      });
      expect(output.eyeBrowStyle).toBe("up");
    });

    it("should have different color between shirt and hair/hat", () => {
      const output = genConfig({
        hairColor: defaultOptions.shirtColor[0],
        hatColor: defaultOptions.shirtColor[0]
      });
      expect(output.shirtColor).not.toBe(defaultOptions.shirtColor[0]);
    });

    it("should have different color between background and shirt and hair/hat", () => {
      const output = genConfig({
        hairColor: defaultOptions.bgColor[0],
        hatColor: defaultOptions.bgColor[0],
        shirtColor: defaultOptions.bgColor[1]
      });
      expect(output.bgColor).not.toBe(defaultOptions.bgColor[0]);
      expect(output.bgColor).not.toBe(defaultOptions.bgColor[1]);
    });
  });
});
