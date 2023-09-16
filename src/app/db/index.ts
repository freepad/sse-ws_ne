
const myDb = {
<<<<<<< HEAD
	logins: ([] as any[]),
=======
	logins: ([] as any[]), // [ { login: 'RRRR', id: '7ef88beb-37ef-4806-9a8b-6ac6632828df' } ]
>>>>>>> v4.2
	posts: ([] as any[]),
	handlers: ([] as any[]),

	/**
	 *
	 * @param item For a For a SiteEvent
	 */
	adds(item: any) {
		this.logins.push(item);
		this.handlers.forEach((handler: any) => handler(item));
	},

	/**
	 *
	 * @param handler For a SiteEvent
	 */
	listener(handler: any) {
		this.handlers.push(handler);

	}
};

module.exports = myDb;
