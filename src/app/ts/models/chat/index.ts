// Chat model
export class ChatSqreen {
	user: any;
	messageHtml: HTMLElement
	sqreenChat: any;

	constructor(elem: HTMLElement) {
		this.messageHtml = elem;

		/** СООБЩЕНИЕ В ЧАТ event */
		this.messageHtml?.parentElement?.parentElement?.parentElement?.addEventListener('keypress', (e: any) => {
			if ((e as KeyboardEvent).key === 'Enter') {
				// debugger;
				e.preventDefault();
				let mess = (this.messageHtml as HTMLInputElement).value.slice(0,);
				// debugger;
				(this.messageHtml as HTMLInputElement).value = '';
				const postOfChat = {
					message: mess,
				}

				this.server(postOfChat);
				mess = '';

			}
		});
	};

	/**
	 * Получаем объект пользователя со все его свойствами.
	 *  Это альтернатива для наследования
	 */
	set userChat(user: object) { this.user = user; };
	server = (str: any) => { };// в функциях прописать сервер отправку и рассылку сообщений
	/*
	* Получаем экран чата
	*/
	set getSqreenChat(sqreenChat: HTMLElement) { this.sqreenChat = sqreenChat };
}
// Chat model
