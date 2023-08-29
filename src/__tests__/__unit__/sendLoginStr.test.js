// import { fetchRequest } from '../../app/ts/fech-request';
// import { sendLoginStr } from './functions.js';
// const { sendLoginStr } = require("../../app/ts/functions.ts");
const { handler } = require('../../app/ts/functions');

// Импортируем функцию, которую хотим протестировать
import { fetchData } from './your-fetch-file';

// Поддержка асинхронных функций в Jest
async function fetchAsync(url) {
	const response = await fetchData(url);
	return response;
}

// Тесты
describe('fetchData', () => {
	it('fetches data correctly', async () => {
		// Мокаем глобальный fetch метод
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({ data: 'Hello World' }),
			})
		);

		// Вызов функции, которую хотим протестировать
		const data = await fetchAsync('https://api.example.com/data');

		// Проверка ожидаемого результата
		expect(data).toEqual({ data: 'Hello World' });

		// Проверка, что fetch вызывается с правильным URL
		expect(global.fetch).toHaveBeenCalledTimes(1);
		expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/data');
	});
});
