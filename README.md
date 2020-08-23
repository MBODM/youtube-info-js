# youtube-info-js
A simple js module, to parse some infos from a given Youtube video url.

This is a simple, tiny, javascript module. You can use it in Node.js or in the browser, to:
- Validate some url, to make sure it is a valid Youtube video url.
- Extract the video id, from a given Youtube video url, by parsing the url.
- Fetch the video title, for a given Youtube video url, by fetching the title from web.
- Get the video thumbnail url, for a given Youtube video url, by parsing the url.

#Intentions
My intention to write this module, was simply the fact, that nearly every npm package, for this job, failed for me.
- Either it failed, because of using the actual Google Youtube Api v3 and so you have to handle with API key.
- Or it failed, because it was massively outdated and a lot of security vulnerabilities popped up.
- Or it failed, because it has a million dependencies, no one needs.

#How to use:
Just copy the youtube.js file into your project and 
