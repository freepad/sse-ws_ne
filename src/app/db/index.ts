
const myDb = {
	logins: ([] as any[]),
	chattings: ([] as any[]),
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
