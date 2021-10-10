import { Box } from '@mui/system';
import Link from 'next/link'
import Layout from '../../components/layout'

export default function Articles({articles}) {
	return (
		<Layout actualPage={'Articles'}>
			<h1>Articles</h1>
			{articles.map((item, index) => (
				<Box key={index} className="article_item">
					<Link href={'/articles/' + item.id}>
						<a>
							<h1>{item.title}</h1>
							<p>{item.preview_content}</p>
						</a>
					</Link>
				</Box>
			))}

			<Link href={'/articles/create'}>
				Create An article
			</Link>
		</Layout>
	)
}

export async function getStaticProps() {
    const req = await fetch(`http://localhost:3000/jsons/articles.json`);
    const data = await req.json();
	const articleList = [];

	for(const articleId of data){
		const req2 = await fetch(`http://localhost:3000/jsons/${articleId}.json`);
		const article = await req2.json();
		articleList.push(article);
	};

    return {
        props: { articles: articleList }
    }
}