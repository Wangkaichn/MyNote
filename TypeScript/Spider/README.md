# 基于 TypeScript 的 Spider

```json
// 截取 package.json
"scripts": {
  "dev": "ts-node ./src",
  "start:tsc": "tsc -w",
  "start:nodemon": "nodemon node ./build/index.js",
  "start": "concurrently npm:start:*"
}
```

`tsc -w` 监听并编译当前目录\n
`nodemon node ./build/index.js` 监听当前目录，目录结构变化时，执行 `node ./build/index.js`\n
`concurrently npm:start:*` 同时执行 ^start: 匹配的所有指令，即执行 start:tsc 和 start:nodemon\n
