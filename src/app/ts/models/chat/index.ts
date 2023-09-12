export class ChatSqreen {
	user: any;
	messageHtml: HTMLElement
	sqreenChat: any;

	constructor(elem: HTMLElement) {
		this.messageHtml = elem;
		this.messageHtml.parentElement?.addEventListener('keypress', (e: any) => {
			if ((e as KeyboardEvent).key === 'Enter') {
				e.preventDefault();
				this.onKeypress(e);
			}
		});
	};

	private onKeypress(e: any) {
		let mess = (this.messageHtml as HTMLInputElement).value;
		const postOfChat = {
			id: this.user.addId,
			message: mess,
		}
		this.server(postOfChat);
		mess = '';
	};

	/**
	 * Получаем объект пользователя со все его свойствами.
	 *  Это альтернатива для наследования
	 */
	set userChat(user: object) { this.user = user };
	server = (str: any) => { };// в функциях прописать сервер отправку и рассылку сообщений
	/*
	* Получаем контейнет экран с ссобщения чата
	*/
	set sendMessage(sqreenChat: HTMLElement) { this.sqreenChat = sqreenChat };
	get sendMessage() {
		return this.sqreenChat.insertAdjacentHTML('beforeend', (`<div class="post">
					<div class="post-accaunt sourcename">${this.user}</div>
					<div class="date">01:25 20.03.2019</div>
					<div class="text">${'mess'} </div>
				</div>` as any));
	}
}
