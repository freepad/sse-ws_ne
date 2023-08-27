export class Users {
	person: string;

	constructor(person: string) {
		this.person = person;
	}

	set participantsAdd(elem: HTMLElement[]) {
		elem[elem.length - 1].insertAdjacentHTML('beforeend', this.templates());
	}

	private templates() {
		return `<div class="accaunt__online_one">
				<div class="preview">
					<!-- <img src="/" /> -->
				</div>
				<div class="sourcename">
					<span>${this.person}</span>
				</div>
			</div>`
	}
}
