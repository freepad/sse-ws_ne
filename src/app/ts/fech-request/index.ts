/* -----Sents and accepts to/of the server-----  Start*/

export class fetchRequest {
	paths: any;
	contentTypes: string;

	constructor(paths = 'http://localhost:7070', contentTypes = "application/json") {
		this.paths = paths;
		this.contentTypes = contentTypes;

	}
	set updatePaths(path: string) {
		this.paths = path
	}

	set updateCType(str: string) {
		this.contentTypes = str;
	}
	/**
	 * TODO: function geting It's keep a new lodin name which a user input for a autorisation to the chat
	 * @param elem: this's type 'object' . It's keep a new data.
	 * @returns respons of 'localhost:7070'. Respons keeps it in self the 'OK' or null. If 'Ok' it's have unique
	 * new login into the chat-db. If a null it's no unique.
	 * { login: elem }
	 */
	async makePostRequest(elem: object) { return this.#fetchRequestToServer('POST', elem) }

	async makeGetRequest() { return this.#fetchRequestToServer('GET'); }

	#fetchRequestToServer(methods = 'GET', requestBody: object = {}) {
		let params: any = {
			method: methods, // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, *cors, same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			headers: {
				"Content-Type": this.contentTypes as string
			}
		}
		// debugger;
		if (params['method'] === 'POST' && 'login' in requestBody) {
			try {
				params['body'] = JSON.stringify(requestBody);
				// debugger;
				return fetch(this.paths, params);
			}
			catch (e) {
				console.warn('Method POST MESSAGE: ', e);
				console.warn('From is fonction.ts')
			}
		}
		else if (params['method'] === 'GET') {
			try {
				return fetch(this.paths, params)
			}
			catch (e) {
				console.warn('Method GET MESSAGE: ', e);
				console.warn('From is fonction.ts')
			}
		}

		if (params['body']) { params['body'].remove() }
	}
}

// переделать Ориентироваться на status
// Поситать про throw в пормисах


/* -----Sents and accepts to/of the server-----  Finish*/
