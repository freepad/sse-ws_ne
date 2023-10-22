
const { UsersNetwork } = require('../../../models/users');
/**
 * На входе получаем данные из БД.
 * Объект заполняем значениями свойств.
 * @param data: Данные
 * @returns обект.
 */
export default function (data: any): any {
	const persone = new UsersNetwork(data['login']);

	/* User network's status is checking ??  - start */
	if (navigator.onLine) persone.onOrOfLine = 'onLine';

	window.addEventListener("offline", (event) => {
		persone.onOrOfLine = 'offline';
	});
	/* User network's status is checking  - finish */

	persone.addId = data['id'];
	persone.addHTMLUser;
	/** {login: < nik-name >, network: < on or of line >, id: < index user >} */
	return persone;
}

