const customError = {
	404: "Have you entered the right path?",
	"NetworkError when attempting to fetch resource.": 'Have you started your API?'
}

export const Fetch = async (
	path,
	component,
	method = 'GET',
	body,
	header = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${'token'}`
	}
) => {
	const url = "http://127.0.0.1:5263/"
	const controller = new AbortController();
	const signal = controller.signal;

	return fetch(`${url}${path}`,
		{
			signal,
			method,
			body: JSON.stringify(body),
			// headers: header
		})
		.then((res) => {
			if (!res.ok) {
				console.error(customError[res.status]);
				return {
					error: {
						url: res.url,
						component: component,
						status: res.status,
						statusText: res.statusText,
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