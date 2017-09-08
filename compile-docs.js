#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const reParseFile = /---[\r\n]+([\s\S]+)[\r\n]+---[\r\n]+([\s\S]+)/;

const encodeContents = (src)=>src
  .replace(/`/g, '\\`')
  .replace(/\${/g, '\\${');

const template = ({contents, caption, path})=>`const documentContents = \`${encodeContents(contents)}\`;

export default {
  $type: 'HeaderPage',
  props: {
    title: 'Martingale - ${caption}'
  },
  children: {
    $type: 'MarkDown',
    children: documentContents
  },
  path: '${path}'
};`;

const docFiles = [];

const generateIndex = ()=>{
  const src = docFiles.sort((f1, f2)=>f1.vars.order-f2.vars.order).reduce((src, {fileName, vars})=>{
    const filename = vars.filename;
    const unitname = filename.replace(/\.js$/, '');
    const componentname = vars.caption.replace(/[ \t\\\/]+([a-z])/gi, (m, l)=>l.toUpperCase());
    src.imports.push(`import ${componentname} from './pages/${unitname}';`);
    src.pages.push(componentname);
    src.sideNav.push(`{
      caption: '${vars.caption.replace('\'', '\\\'')}',
      icon: '${vars.icon || 'Note'}',
      path: '${vars.path}'
    }`);
    return src;
  }, {imports: [], pages: [], sideNav: []});
  const contents = `${src.imports.join('\n')}

const pages = {
  ${src.pages.join(',\n  ')}
};

export default {
  name: 'Documentation',
  icon: 'Book',
  sideNav: [
    ${src.sideNav.join(',\n    ')}
  ],
  pages
};
`;
  console.log('Writing "src/app/packs/docs/index.js"');
  fs.writeFile('src/app/packs/docs/index.js', contents, (err)=>{
    if(err){
      console.error(fileName, err);
      return process.exit(1);
    }
    console.log('All done');
  });
};

let fileCount = 0;
let handledCount = 0;

const doneWithFile = (fileName)=>{
  handledCount++;
  if(handledCount >= fileCount){
    generateIndex();
  }
};

const loadAndProcessFile = (fileName)=>{
  fs.readFile(fileName, (err, data)=>{
    if(err){
      console.error(fileName, err);
      return process.exit(1);
    }
    const contents = data.toString();
    const parts = reParseFile.exec(contents);
    if(!(parts[1] && parts[2])){
      return doneWithFile(fileName);
    }
    const vars = parts[1].split(/[\r\n]+/).reduce((vars, line)=>{
      const segments = line.split(':');
      const key = segments.shift().trim();
      const value = segments.join(':').trim();
      vars[key] = key === 'order'?+value:value;
      return vars;
    }, {contents: parts[2], filename: path.basename(fileName).replace(/\.md$/, '.js'), order: 999});
    docFiles.push({fileName, vars});
    console.log(`Writing "src/app/packs/docs/pages/${vars.filename}"`);
    fs.writeFile(`src/app/packs/docs/pages/${vars.filename}`, template(vars), (err)=>{
      if(err){
        console.error(fileName, err);
        return process.exit(1);
      }
      return doneWithFile(fileName);
    });
  });
};

glob('docs/**/*.md', {}, (err, files)=>{
  if(err){
    console.error(err);
    return process.exit(1);
  }
  fileCount = files.length;
  rimraf('src/app/packs/docs/pages', (err)=>{
    if(err){
      console.error(err);
      return process.exit(1);
    }
    mkdirp('src/app/packs/docs/pages', (err)=>{
      if(err){
        console.error(err);
        return process.exit(1);
      }
      files.forEach(loadAndProcessFile);
    });
  });
});
