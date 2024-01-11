export const formatHelper = {
	timestamp: (timestamp) => {
		const currentDate = new Date().getDate()
		const date = new Date(timestamp);
		let options;

		if (date.getDate() === currentDate) {
			//Only shows time if the message is sent "today"
			options = {
				hour: "numeric",
				minute: "numeric"
			}
		}
		else {
			options = {
				year: 'numeric',
				month: 'long',
				weekday: 'long',
				day: 'numeric',
				hour: "numeric",
				minute: "numeric"
			};
		}

		return new Intl.DateTimeFormat('sv-SE', options).format(date);
	}
}