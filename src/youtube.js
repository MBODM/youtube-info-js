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
    }
    catch {
        return false;
    }
}

/**
 * Parse given Youtube video url, to get an object containing video url, video id, video title and video thumbnail url.
 * @async
 * @param {string} url
 * @returns {Promise<object>} Promise (containing object or undefined)
 * - Returns object, containing said Youtube video data.
 * - Returns undefined, if fetching video title went wrong.
 * - Returns undefined, if given url is not a valid Youtube video url.
 */
export async function parseUrl(url) {
    if (validateUrl(url)) {
        url = url.trim();
        const title = await getVideoTitleInternal(url);
        if (title) {
            const id = getVideoIdInternal(url);
            const thumbnail = getVideoThumbnailInternal(url);
            return { url, id, title, thumbnail };
        }
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
        return getVideoIdInternal(url);
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
        return await getVideoTitleInternal(url);
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
    if (validateUrl(url)) {
        return getVideoThumbnailInternal(url);
    }
}

// The internal functions just do the job, without any validation.
// So every public function validates their Youtube url just once.

function getVideoIdInternal(url) {
    // We expect a validated url here.
    return new URL(url).searchParams.get('v');
}

async function getVideoTitleInternal(url) {
    // We expect a validated url here.
    try {
        const response = await fetch('http://noembed.com/embed?url=' + url.trim());
        const json = await response.json();
        return json.title;
    }
    catch {
        // Do nothing, to return undefined.
    }
}

function getVideoThumbnailInternal(url) {
    // We expect a validated url here.
    const id = getVideoIdInternal(url);
    return `https://img.youtube.com/vi/${id}/default.jpg`;
}
