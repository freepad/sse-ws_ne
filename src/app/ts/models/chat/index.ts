export class ChatSqreen {
	user: any;
	messageHtml: HTMLElement
	sqreenChat: any;
	constructor(elem: HTMLElement) {
		this.messageHtml = elem;

		/* this.user = user; */
	}

	private onKeypress(e: any) {
		this.user;
		const mess = (this.messageHtml as HTMLInputElement).value;
		debugger;
		this.sqreenChat.insertAdjacentHTML('beforeend', (`<div class="post">
					<div class="post-accaunt sourcename">${this.user.login}</div>
					<div class="date">01:25 20.03.2019</div>
					<div class="text">${mess} </div>
				</div>` as any));

		const postOfChat = JSON.stringify({
			id: this.user.addId,
			idMessage: null,
			message: mess,
		})
		this.server(postOfChat);
	}

	/**
	 * Получаем объект пользователя со все его свойствами.
	 *  Это альтернатива для наследования
	 */
	set userChat(user: object) {

		this.user = user;
	}
	server = (str: string) => { }// в функциях прописать сервер отправку и рассылку сообщений
	/*
	* Получаем контейнет экран с ссобщения чата
	*/
	set sendMessage(elem: HTMLElement) {
		this.sqreenChat = elem;
	}

	get listenerInputChat() {
		return this.messageHtml.parentElement?.addEventListener('keypress', (e: any) => {
			if ((e as KeyboardEvent).key === 'Enter') {
				// debugger;
				e.preventDefault();
				this.onKeypress(e);
			};



		});
	}

}
