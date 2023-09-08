

const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;

let newLogin: any[] = [];

// export function generates(generate: any) {
// 	newLogin.push((generate));
// 	return newLogin
// }

export const fun = {
	forms() {
		return `<section class="author">
		<div class="title">
			<h2>Выберите псевдоним</h2>
		</div>
		<div class="form">
			<form action="" class="login" >
				<div class="input">
					<input type="text" maxlength="25" value="" id="login">
				</div>
				<div class="button">
					<button id="go" type="submit">Предложить</button>
				</div>
			</form>
		</div>
	</section>`
	},

	author(event: any) {
		console.log('Старт author()')



		if ((((event as MouseEvent).target as HTMLButtonElement).type === 'submit'
			|| (event as KeyboardEvent).key === 'Enter')) {
			const form = body[0].querySelector('.author') as HTMLFormElement;
			const input = form.querySelector('input') as HTMLInputElement;
			let result = '';
			event.preventDefault();
			console.log('Прослушка - получили данные для отправки на сервер из формы New-Login');
			return { newLogin: input.value }


		}

	}
}
