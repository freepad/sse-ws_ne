

// 	elem.oninput = () => {
// 		let inputArray = regexp.exec(elem.value)
// 		if (inputArray !== null
// 			&& (inputArray as any).input.length === (inputArray as any)[0].length) {
// 			if (elem.hasAttribute('style')) elem.removeAttribute('style');
// 			inputValue = (inputArray as any[])[0];

// 		} else if (inputArray !== null
// 			|| (inputArray === null && elem.value !== undefined)) {
// 			elem.setAttribute('style', "color:#ff0000;");

// 		}
// 	};
// };
export const checkLoginValidate = (elem: string) => {
	const regexp = new RegExp(/^[a-zA-Z]\w{3,}/, 'i');
	let inputArray = regexp.exec(elem);
	console.log('inputArray: ', inputArray)
	if (inputArray !== null
		&& (inputArray as any).input.length === (inputArray as any)[0].length) { return true }
	else if (inputArray !== null || (inputArray === null && elem !== undefined)) { return false }
};
