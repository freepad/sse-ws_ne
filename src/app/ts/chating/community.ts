export class Commune {
	person: object;
	constructor(person = {}) {
		/* Here inserting user's objects wich's sending the message to a chat .
		/**Entire message history is saved in the chat if the user logs out */
		this.person = person;
	}
}
