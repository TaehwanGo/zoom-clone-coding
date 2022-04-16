# 0. Introduction

## 0.1 Requirements

- ExpressJS
- Pug
- Only VanillaJS
- webcam, microphone
- babel

## 0.2 Server Setup

`npm i nodemon -D`

`npm i @babel/core @babel/cli @babel/node @babel/preset-env -D`

- @babel/preset-env
  - @babel/preset-env is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). This both makes your life easier and JavaScript bundles smaller!

package.json의 script

- nodemon => nodemon.json의 exec를 바라보고 실행함

`npm i express`

`npm i pug`

express 서버 설정(포트 등) 후 실행

`npm run dev`

## 0.3 Frontend Setup

- server side rendering으로 view를 구성하고

  - view template으로 pug를 사용

- nodemon이 저장할 때 마다 재시작하는 것이 아닌

  - views, server를 수정할 때 재시작하게 하고 싶은 경우
  - nodemon.json에 ignore 설정

- MVP.css 라이브러리를 cdn에서 가져와서 사용
  - 기본적인 HTML tag를 이쁘게 바꿔줌

## 0.4 Recap

- Nodemon

  - 프로젝트를 watching하면서 변경사항이 있을 시 서버를 재시작해주는 프로그램
    - nodemon.json에서 babel-node를 실행하게 설정
      - 작성한 코드를 일반 js코드로 컴파일
      - src/server.js에 해당

- babel-node에 의해 babel이 실행되면 babel.config.json에 있는 설정을 따름
  - preset : 적용되어야 하는 preset
