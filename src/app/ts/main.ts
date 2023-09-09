const { fun } = require('./functions');
const {WSocket }=require('./websockets');





document.addEventListener('DOMContentLoaded', () => {
	const wsConnection = new WSocket("ws://localhost:7070");
	console.log('Страница загрузилась');
	
	const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
	(body[0].querySelector('.chattalks > div:last-of-type') as HTMLElement).setAttribute('style', "display:none;")
	
	/* it for events by indentifikation a new Login - the start*/
	body[0].insertAdjacentHTML("afterbegin", fun.forms());	
	const formIdentification = body[0].querySelector('.author') as HTMLFormElement;
	const input = body[0].querySelector('input') as HTMLInputElement;
	console.log("Получили форму для регистрации New Login!");

	window.addEventListener('offline', (e: any) => {
		console.warn("Note: User's browser id ofline now!");
	});
	console.log('User in online.')

	let resultOfFormIdentification = '';
	formIdentification.addEventListener('keypress', async (e: any) => sendToServe(e));
	formIdentification.addEventListener('click', async (e: any) => sendToServe(e));
	
	function sendToServe(e: any) {
		if ((((e as MouseEvent).target as HTMLButtonElement).type === 'submit')
			|| ((e as KeyboardEvent).key === 'Enter')
		) {
			e.preventDefault();
			if (input.value.length < 1) { console.log('Длина INPUT = 0:', input.value.length); return }
			console.log('SUBMIT'),
			console.log('Прослушка -  получили событие Inpuut из формы New-Login');
			resultOfFormIdentification = JSON.stringify(fun.author(e));
			wsConnection.send(JSON.stringify(resultOfFormIdentification));			
			wsConnection.onOpen(e);
			wsConnection.onMessage(e);
			wsConnection.onError(e); 
			input.value = ''; 
		}
	}
	/* it for events by indentifikation a new Login - the end*/
});
