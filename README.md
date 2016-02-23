# StoryTime

A simple card game based on The Storymatic. See a live demo here: [http://storytime.floor23.com](http://storytime.floor23.com).

## Features
- Stores cards array in LocalStorage, so while card selection from the stack is random, a returning user won't see a repeat card until all of the cards in the stack have been exhausted.
- Animations and layouts work well on mobile devices.

## To do:
- Remove jQuery dependence to reduce compiled JS file size.

## Getting Started
### Install
```sh
$ npm install
```

### Development server (with BrowserSync)
```sh
$ gulp
```

### Production Build
```sh
$ gulp production
```
