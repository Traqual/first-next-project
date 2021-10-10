import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'

export default function Home() {
	return (
		<Layout actualPage={'Homepage'}>
			<Head>
				<title>My Next App</title>
			</Head>

			<h1>Homepage</h1>
			<p>This is a simple wiki to post development best pratices</p>
			
		</Layout>
	)
}
