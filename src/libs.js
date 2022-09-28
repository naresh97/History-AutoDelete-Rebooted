// Returns the host name of the url. Etc. "https://en.wikipedia.org/wiki/Cat" becomes en.wikipedia.org
export const getHostname = (urlToGetHostName) => {
	let hostname;
	try {
		hostname = new URL(urlToGetHostName).hostname;
		// Strip "www." if the URL starts with it.
		hostname = hostname.replace(/^www[a-z0-9]?\./, "");
	} catch (error) {
		return "";
	}
	return hostname;
};

// Returns true if it is a webpage
export const isAWebpage = (URL) => {
	return URL.match(/^https?:/);
};

export const spliceWWW = (url) => {
	let newURL;
	try {
		newURL = url;
		newURL = newURL.replace(/^((https?|file)\:\/\/)?(www[a-z0-9]?\.)?/, "");
	} catch (error) {
		return "";
	}
	return newURL;
};
