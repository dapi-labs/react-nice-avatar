import { avatarPresets } from '../src/presets';
import { genConfig, defaultOptions } from '../src/utils';

describe('extended avatar recipes', () => {
  it('provides unique reproducible recipes', () => {
    expect(avatarPresets.length).toBeGreaterThan(0);
    expect(new Set(avatarPresets.map(p => p.id)).size).toBe(avatarPresets.length);
    for (const { config } of avatarPresets) {
      expect(genConfig(config)).toEqual(config);
      expect(genConfig(config)).toEqual(genConfig(config));
      expect(defaultOptions.hatStyle).toContain(config.hatStyle);
      expect(defaultOptions.eyeStyle).toContain(config.eyeStyle);
      expect(defaultOptions.shirtStyle).toContain(config.shirtStyle);
      expect([...defaultOptions.hairStyleMan, ...defaultOptions.hairStyleWoman]).toContain(config.hairStyle);
    }
  });
  it('removes rejected hats from the catalog and every recipe', () => {
    for (const hat of ['sombrero', 'cap', 'beret']) {
      expect(defaultOptions.hatStyle).not.toContain(hat);
      expect(avatarPresets.some(p => p.config.hatStyle === hat)).toBe(false);
    }
  });
  it('removes rejected clothing from all recipes and options', () => {
    expect(defaultOptions.shirtStyle).toEqual(['hoody', 'short', 'polo']);
  });
  it('preserves robot and facial hair overrides', () => {
    expect(genConfig({ avatarStyle: 'robot', facialHairStyle: 'none' })).toMatchObject({ avatarStyle: 'robot', facialHairStyle: 'none' });
    expect(genConfig(avatarPresets.find(p => p.id === 'mexicano')!.config)).toMatchObject({ hatStyle: 'none', facialHairStyle: 'mustache', shirtStyle: 'short' });
  });
});
