import { genConfig, defaultOptions } from '../src/utils';
import { avatarPresets } from '../src/presets';
import { HairStyle } from '../src/types';

it('has one approved option per new haircut in the random catalog', () => {
  for (const list of [defaultOptions.hairStyleMan, defaultOptions.hairStyleWoman]) {
    expect(new Set(list).size).toBe(list.length);
    expect(list.some(style => style.endsWith('V2'))).toBe(false);
    for (const style of ['curly', 'bob', 'pixie', 'bun', 'buzz']) expect(list).toContain(style);
  }
});
it.each(['curly', 'bob', 'pixie', 'bun', 'buzz'])('migrates saved %sV2 configs to the approved catalog', style => {
  const config = genConfig({...avatarPresets[0].config, hairStyle: `${style}V2` as HairStyle});
  expect(config.hairStyle).toBe(style);
  expect(genConfig(config)).toEqual(config);
});
it('migrates discarded beards and keeps presets canonical', () => {
  expect(genConfig({facialHairStyle:'beard'}).facialHairStyle).toBe('fullBeard');
  expect(genConfig({facialHairStyle:'goateeV2'}).facialHairStyle).toBe('goatee');
  for (const {config} of avatarPresets) {
    expect(config.hairStyle!.endsWith('V2')).toBe(false);
    expect(['beard', 'goateeV2']).not.toContain(config.facialHairStyle);
  }
});
