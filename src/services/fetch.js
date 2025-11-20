const customError = {
	404: "Have you entered the right path?",
	401: "Dina inloggningsuppgifter matchar inte något konto på denna server",
	"NetworkError when attempting to fetch resource.": 'Have you started your API?'
}

export const Fetch = async (
	path,
	component,
	method = 'GET',
	body,
	header = { 'Content-Type': 'application/json' }
) => {
	const url = "https://www.anderssöderberg.se/backend/community-portal/"
	const controller = new AbortController();
	const signal = controller.signal;

	return fetch(`${url}${path}`,
		{
			signal,
			method,
			body: JSON.stringify(body),
			headers: header
		})
		.then((res) => {
			if (!res.ok) {
				// console.log(res);
				console.error(customError[res.status]);
				return {
					error: {
						url: res.url,
						component: component,
						status: res.status,
						statusText: customError[res.status],
						message: (path, res.status)
					}
				}
			}
			else return res.json()
		})
		.catch(error => {
			if (error.message === 'NetworkError when attempting to fetch resource.') {
				console.error(customError[error.message]);
			} else return error;
		})
		.finally(() => controller.abort())
}
