import { Box } from '@mui/system';
import Link from 'next/link'
import Layout from '../../components/layout'
import CreateIcon from '@mui/icons-material/Create';
import { Button, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Router from 'next/router'

export default function Articles({articles}) {
	return (
		<Layout actualPage={'Articles'}>
			<Grid
			container
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			>
				<h1>Articles</h1>
				<Link href={'/articles/create'}>
					<a className={'btn'}>
						<CreateIcon/>
						Créer un article
					</a>
				</Link>
			</Grid>
			{articles.map((item, index) => (
				<div className="article_item" key={index} id={"div"+index}>
					<Box>
						<Link href={'/articles/' + item.id}>
							<a>
								<h1>{item.title}</h1>
								<p>{item.preview_content}</p>
							</a>
						</Link>
					</Box>
					<div>
						<Link href={'/articles/edit/' + item.id}>
							<Button className="btn">
								<CreateIcon/>
								Modifier
							</Button>
						</Link>
						<Button className="btn" onClick={() => deleteArticle(item.id)}>
							<DeleteIcon/>
							Supprimer
						</Button>
					</div>
				</div>
			))}
		</Layout>
	)
}

export async function getServerSideProps() {
    const req = await fetch(`http://localhost:3000/api/articles`, {
        'method': 'GET'
    });
    const data = await req.json();
	const articleList = [];

	for(const article of data){
		articleList.push(article);
	};

    return {
        props: { articles: articleList }
    }
}

async function deleteArticle(id) {
	if(confirm('Voulez-vous vraiment supprimer cet article ?')) {
		const req = await fetch(`http://localhost:3000/api/articles/${id}`, {
			'method': 'DELETE'
		});
		Router.push('/articles');
	}
}