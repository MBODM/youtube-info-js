# youtube.js
A simple js module, to parse some data from a given Youtube video url.

### Overview
This is just a simple, tiny javascript module. You can use it in Node.js or in the Browser, to do the following:
- Validate some url, to make sure it is a valid Youtube video url (by parsing the url).
- Extract the video id, from a given Youtube video url (by parsing the url).
- Get the video thumbnail url, for a given Youtube video url (by parsing the url).
- Fetch the video title, for a given Youtube video url (by fetching the title from web).

### Module
I used the module for some Node.js REST api, in a private project. Some key points of the module are:
- The module is written as an ES6 module, using *export* and *import*.
- The module makes use of *promises* and *async/await*.
- The module makes use of the [node-fetch](https://www.npmjs.com/package/node-fetch) npm package.
- The module makes use of [JSDoc](https://jsdoc.app) documentation, for better Editor/IDE support.
- The module was developed with [VS Code](https://code.visualstudio.com).

### Motivation
My intention to write such a module, was the simple fact, that all existing Youtube npm packages just failed for me.
- Either failed, cause of using Google Youtube API v3, so you have to handle with API key and such stuff.
- Or failed, because the package was massively outdated and a lot of security vulnerabilities popped up.
- Or failed, because the package had a million dependencies and functionalities, no one ever needs/use.

### Usage
Just copy the "youtube.js" file (from this repo) into your project and do some *import*, like this:

```javascript
import Youtube from './youtube.js';
```
Now you can use the static functions of the imported *Youtube* class, like this:

```javascript
// Some Youtube video url
const url = 'https://www.youtube.com/watch?v=C0DPdy98e4c';

// Use module
const valid = Youtube.validateUrl(url);
const id = Youtube.getVideoId(url);
const thumbnail = Youtube.getVideoThumbnailUrl(url);
const title = await Youtube.getVideoTitle(url);

// Show results
console.log(valid);
console.log(id);
console.log(thumbnail);
console.log(title);
```
Have fun.
