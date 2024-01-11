import React, { useEffect, useState } from 'react' /* <= imports, (React & react hooks) */
import { Feedback } from '../../components/Feedback/Feedback'
import { Fetch } from '../../services/fetch'
import { UserAuth } from '../../context/AuthContext'
import styles from './homepage.module.css'
import { formatHelper } from '../../services/formatHelper'


export default function HomePage() {
	const [news, setNews] = useState() /* <= state (values ment to update the component when changed)*/
	const [error, setError] = useState()
	const auth = UserAuth();
	const { user } = auth

	useEffect(() => {
		getNews()
	}, []) // <= dependency array (only happen once if empty)

	// console.log(user);

	/* useEffect(() => {
		console.log(news)
	}, [news]) */


	const getNews = () => {
		Fetch('news')
			.then(res => {
				if (res?.error) setError(res.error);
				else setNews(res)
			})
			.finally('reload')
			.catch(err => console.log(err))
	}


	return (
		<div className={styles.homepage}>
			<h1>Welcome {`${user?.firstName} ${user?.lastName}`}</h1>
			<h2>Nyheter</h2>

			{error && <Feedback error={error} />} {/* <= conditional rendering (only shows if "error" is defined) */}



			{news &&
				<div>
					{
						news.map((news, i) => {
							const { created, title, content } = news /* <= destructuring */
							// console.log(news);
							return (
								<div
									key={i} /* <= React requires a unique "key" property on the first child of a map() */
									className={styles.user}
								>
									<p>publicerat: {formatHelper.timestamp(created)}</p> {/* <= template literal (handles variables as string)*/}
									<h3>{title}</h3>
									<p>{content}</p>

								</div>
							)
						})
					}
				</div>
			}
		</div >
	)
}