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
		this.sqreenChat.insertAdjacentHTML('beforeend', (`<div>${mess}</div>` as any));
	}

	set userChat(user: object) {
		// debugger;
		this.user = user;
	}

	/* get userChat() {
		return this.user
	} */
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
