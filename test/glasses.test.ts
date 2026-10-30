import { avatarPresets } from '../src/presets';
import { genConfig } from '../src/utils';

it('preserves the custom lens color through repeated configuration', () => {
  const config = genConfig({...avatarPresets[0].config, glassesStyle: 'aviatorTinted', glassesColor: '#55AA99'});
  expect(config.glassesColor).toBe('#55AA99');
  expect(genConfig(config)).toEqual(config);
});

import { resolveGlasses } from '../src/glasses/config';
import { GlassesStyle, GlassesMode } from '../src/types';

it.each(['round', 'square', 'aviator'] as GlassesStyle[])('keeps %s transparent by default and supports every finish', style => {
  expect(resolveGlasses(style)).toEqual({style, mode: 'transparent'});
  for (const mode of ['transparent', 'tinted', 'dark'] as GlassesMode[]) {
    expect(resolveGlasses(style, mode)).toEqual({style, mode});
    const config = genConfig({...avatarPresets[0].config, glassesStyle: style, glassesMode: mode, glassesColor: '#55AA99', eyeBrowStyle: 'unibrow'});
    expect(genConfig(config)).toEqual(config);
    expect(config.glassesMode).toBe(mode);
    expect(config.eyeBrowStyle).toBe('unibrow');
  }
});

it.each([
  ['roundDark', 'round', 'dark'], ['squareDark', 'square', 'dark'],
  ['aviatorDark', 'aviator', 'dark'], ['aviatorTinted', 'aviator', 'tinted']
])('preserves legacy alias %s and allows an explicit mode override', (alias, shape, mode) => {
  expect(resolveGlasses(alias as GlassesStyle)).toEqual({style: shape, mode});
  expect(resolveGlasses(alias as GlassesStyle, 'transparent')).toEqual({style: shape, mode: 'transparent'});
});
