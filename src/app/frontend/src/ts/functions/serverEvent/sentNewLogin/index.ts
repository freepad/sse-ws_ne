// src\app\frontend\src\ts\functions\serverEvent\sentNewLogin\index.ts

const { WSocket } = require('../../../models/websockets');
const { fun } = require("../../forms/logins");
const { getNewLogin: getNewLoginPrefix } = require('../index.ts');
// везде по проекту надо заменить на переменную окружения
const url = process.env.APP_BASE_URL_WS : process.env.APP_BASE_URL_WS  ? "ws://localhost:7070";
let ws: any;
const body = document.getElementsByTagName('body') as HTMLCollectionOf<HTMLElement>;
/**
		 * Handler для событий из формы регистрации логина.
	 * Отправляем логин на сервер.
	 * @param e: event.
	 * @returns void
	 */
export default async function (e: any) {
	e.preventDefault();
	const input = body[0].querySelector('.login input') as HTMLInputElement;
	if (ws === undefined
		|| (ws
			&& (ws.readyState === 0 || ws.readyState > 1))) {
		console.log('/login URL')
		ws = new WSocket(url + "/login");
	}
	ws.onMessage = getNewLoginPrefix();

	if (input.value.length < 1) return
	/**Template: { newLogin: input.value } */
	const resultOfFormIdentification = JSON.stringify(fun.idForn(e));
	ws.sends(resultOfFormIdentification);
	ws.onOpen();
	input.value = ''
	return
}
