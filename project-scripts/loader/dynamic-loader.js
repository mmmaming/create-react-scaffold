const fs = require("fs");
const path = require('path');
const { getOptions } = require('loader-utils');

const markBegin = `/* <% customChunkName begin %> */`;
const markEnd = `/* <% customChunkName end %> */`;
const regexpGen = /\/\* <% customChunkName begin %> \*\/[\w\W]*\/\* <% customChunkName end %> \*\//;

function scanning(base_path) {
  const dirs = fs.readdirSync(base_path);
  return dirs.reduce((arr, dir) => {
    const pwd = path.resolve(base_path, dir);
    const stat = fs.statSync(pwd);
    if (stat.isDirectory()) {
      arr.push(dir);
    }
    return arr;
  }, []);
}

function generateCode(items) {
  const res = items.map(item => {
    return ` if(target === '${item}') { return import(/* webpackChunkName: "${item}" */ /* webpackMode: "lazy" */ '@modules/${item}'); }`
  });
  return res.join('\n');
}


module.exports = function (source) {
  if (regexpGen.test(source)) {
    const { currentPath } = getOptions(this);
    const items = scanning(currentPath);
    const code = generateCode(items);
    if (code) {
      source = source.replace(regexpGen,
        `${markBegin}
						const dynamicChunkLoader = target => {
							${code}
						}
            ${markEnd}`
      )
    }
  }
  return source;
}