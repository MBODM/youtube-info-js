import fetch from 'node-fetch';

/**
 * Validate given url.
 * @param {string} url
 * @returns {boolean} boolean
 * - Returns true, if given url is a valid Youtube video url.
 * - Returns false, if given url is not a valid Youtube video url.
 */
export function validateUrl(url) {
    // A typical Youtube video url looks like this -> https://www.youtube.com/watch?v=C0DPdy98e4c
    try {
        const u = new URL(url);
        if (u.protocol && u.hostname && u.pathname && u.search) {
            if (u.protocol.toLowerCase() === 'http:' || u.protocol.toLowerCase() === 'https:') {
                if (u.hostname.toLowerCase() === 'www.youtube.com') {
                    if (u.pathname.toLowerCase() === '/watch') {
                        if (u.searchParams) {
                            if (u.searchParams.has('v')) {
                                if (u.searchParams.get('v')) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    } catch {
        return false;
    }
}

/**
 * Get video id, for a given Youtube video url.
 * @param {string} url
 * @returns {string} string or undefined
 * - Returns video id, as string.
 * - Returns undefined, if given url is not a valid Youtube video url.
 */
export function getVideoId(url) {
    if (validateUrl(url)) {
        // No need for extra query validation here, cause url is fully validated.
        return new URL(url).searchParams.get('v');
    }
}

/**
 * Get video title, for a given Youtube video url.
 * @async
 * @param {string} url
 * @returns {Promise<string>} Promise (containing string or undefined)
 * - Returns video title, as string.
 * - Returns undefined, if fetching video title went wrong.
 * - Returns undefined, if given url is not a valid Youtube video url.
 */
export async function getVideoTitle(url) {
    if (validateUrl(url)) {
        try {
            const response = await fetch('http://noembed.com/embed?url=' + url.trim());
            const json = await response.json();
            return json.title;
        } catch {
            // Do nothing, to return undefined.
        }
    }
}

/**
 * Get video thumbnail url, for a given Youtube video url.
 * @param {string} url
 * @returns {string} string or undefined
 * - Returns video thumbnail url, as string.
 * - Returns undefined, if given url is not a valid Youtube video url.
 */
export function getVideoThumbnailUrl(url) {
    // No need for extra url validation here, cause id is falsy, if url is invalid.
    const id = getVideoId(url);
    if (id) {
        return `https://img.youtube.com/vi/${id}/default.jpg`;
    }
}