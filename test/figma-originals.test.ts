import { genConfig } from '../src/utils';
import { avatarPresets } from '../src/presets';
import { AvatarFullConfig } from '../src/types';

const originals: AvatarFullConfig[] = [
  {earringStyle: 'hoop'}, {earringStyle: 'stud'},
  ...(['surprised', 'sad', 'frown', 'pucker', 'nervous'] as const).map(mouthStyle => ({mouthStyle})),
  {eyeBrowStyle: 'down'}, {eyeBrowStyle: 'eyelashesDown'}, {eyeStyle: 'eyeshadow'},
  {hairStyle: 'dougFunny'}, {hairStyle: 'bald'},
  {facialHairStyle: 'originalBeard'}, {facialHairStyle: 'scruff'},
];

it.each(originals)('preserves an original Figma variant through configuration round trips: %j', addition => {
  const config = genConfig({...avatarPresets[0].config, ...addition});
  expect(config).toMatchObject(addition);
  expect(genConfig(config)).toEqual(config);
});

it('keeps new colors and explicit no-earring selection', () => {
  const additions: AvatarFullConfig = {earringStyle: 'none', earringColor: '#506AF4', eyeshadowColor: '#FC909F'};
  expect(genConfig({...avatarPresets[0].config, ...additions})).toMatchObject(additions);
});

it('does not add new accessory fields to existing seeded configs', () => {
  const config = genConfig('original-api');
  expect(config).not.toHaveProperty('earringStyle');
  expect(config).not.toHaveProperty('earringColor');
  expect(config).not.toHaveProperty('eyeshadowColor');
});
