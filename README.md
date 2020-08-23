# youtube-info-js
A simple js module, to parse some infos from a given Youtube video url.

### Overview
This is just a simple, tiny javascript module. You can use it in Node.js or in the browser, to do the following:
- Validate some url, to make sure it is a valid Youtube video url (by parsing the url).
- Extract the video id, from a given Youtube video url (by parsing the url).
- Get the video thumbnail url, for a given Youtube video url (by parsing the url).
- Fetch the video title, for a given Youtube video url (by fetching the title from web).

### Module
I used the module in some Node.js api, for a private project. Some key points of the module are:
- The module is written as an ES6 module, using export and import.
- The module makes use of *promises* and *async/await*.
- The module makes use of the *node-fetch* npm package (see https://www.npmjs.com/package/node-fetch).

### Motivation
My intention to write such a module, was the simple fact, that every npm package (for such a job) just failed for me.
- Either it failed, because of using the actual Google Youtube Api v3, so you have to handle with API key etc.
- Or it failed, because it was massively outdated and a lot of security vulnerabilities popped up.
- Or it failed, because of a million dependencies, no one needs.

### Usage
Just copy the youtube.js file into your project and do some

```javascript
import Youtube from './youtube.js';
```
Now you can use the static functions of the imported *Youtube* class:

```javascript
const url = 'https://www.youtube.com/watch?v=C0DPdy98e4c';

const valid = Youtube.validateUrl(url);
const id = Youtube.getVideoId(url);
const thumbnail = Youtube.getVideoThumbnailUrl(url);
const title = await Youtube.getVideoTitle(url);

console.log(valid);
console.log(id);
console.log(thumbnail);
console.log(title);
```
