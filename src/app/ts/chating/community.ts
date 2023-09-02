export class Commune {
	person: object;
	constructor(person = {}) {
		/* Получаю объект пользователя из БД как только появляется кто-то новый.*/
		/** Если статус объекта офнлайн , он удаляется из БД  */
		this.person = person;
	}
}
