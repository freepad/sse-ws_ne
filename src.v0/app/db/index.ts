
const participants = {
	logins: ([] as any[]),
	chattings: ([] as any[]),
	handlers: ([] as any[]),

	adds(item: any) {
		this.logins.push(item);
		this.handlers.forEach((handler: any) => handler(item));
	},

	listener(handler: any) {
		this.handlers.push(handler);
	}
};

module.exports = participants;
