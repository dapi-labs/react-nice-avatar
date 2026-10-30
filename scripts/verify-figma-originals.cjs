const fs = require('fs');
const ts = require(process.cwd()+'/node_modules/typescript');
for (const ext of ['.ts','.tsx']) require.extensions[ext] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS, jsx:ts.JsxEmit.React, esModuleInterop:true}}).outputText,filename);
const React = require(process.cwd()+'/node_modules/react');
const {renderToStaticMarkup} = require(process.cwd()+'/node_modules/react-dom/server');
const Avatar = require(process.cwd()+'/src/index.tsx').default;
const {avatarPresets} = require(process.cwd()+'/src/presets.ts');
const config = {...avatarPresets[0].config, hairStyle:'curlyV2', hairColor:'#171921', hairColorRandom:true, eyeStyle:'focused', glassesStyle:'none', facialHairStyle:'chinBeard', mouthStyle:'smile', shirtStyle:'short', shirtColor:'#292B35', faceColor:'#F9C9B6', bgColor:'#F4D150'};
const assert=require('assert');
const {genConfig}=require(process.cwd()+'/src/utils.ts');
const {default:Artwork}=require(process.cwd()+'/src/originals/artwork.tsx');
const variants=['hoop','stud','surprised','sad','frown','pucker','nervous','down','eyelashesDown','eyeshadow','dougFunny','bald','originalBeard','scruff'];
for(const name of variants) {
  const markup=renderToStaticMarkup(React.createElement(Artwork,{name,color:'#123456'}));
  assert(/<(path|ellipse|circle|rect)/.test(markup),name+' must render its SVG');
  if(['hoop','stud','eyeshadow','dougFunny','originalBeard','scruff'].includes(name)) assert(markup.includes('#123456'),name+' must use configured color');
}
const render=extra=>renderToStaticMarkup(React.createElement(Avatar,{...config,...extra}));
const pair=render({mouthStyle:'surprised'})+render({mouthStyle:'surprised'});
const ids=[...pair.matchAll(/id="(nice-original-[^"]+)"/g)].map(m=>m[1]);
assert.equal(ids.length,2);assert.equal(new Set(ids).size,2);
for(const id of ids) assert(pair.includes('url(#'+id+')'));
for(const earSize of ['small','big']) {
 assert(render({earSize,earringStyle:'hoop',earringColor:'#123456'}).includes('stroke="#123456"'));
 assert(!render({earSize,earringStyle:'none',earringColor:'#123456'}).includes('#123456'));
}
assert(!render({avatarStyle:'robot',earringStyle:'hoop',earringColor:'#123456',eyeStyle:'eyeshadow',eyeshadowColor:'#123456'}).includes('#123456'));
console.log('14 original SVGs, dynamic colors, isolated masks, both ears and human-only accessories verified.');
