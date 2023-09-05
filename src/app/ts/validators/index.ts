

/***
- * TODO: Checking input's symbols/line from the input form. This's line in which entries a new login from the new user/
- * @param elem: This's an input field (from popUp box for a uatorization).
- * returns won't be
- */

export const checkLoginValidate = (elem: string) => {
	const regexp = new RegExp(/^[a-zA-Z]\w{3,}/, 'i');
	let inputArray = regexp.exec(elem);
	if (inputArray !== null
		&& (inputArray as any).input.length === (inputArray as any)[0].length) { return true }
	else if (inputArray !== null || (inputArray === null && elem !== undefined)) { return false }
};

