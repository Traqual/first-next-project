import { Box } from '@mui/system';
import Link from 'next/link'
import Layout from '../../components/layout'
import CreateIcon from '@mui/icons-material/Create';
import { Button, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Router from 'next/router'

export default function categories({categories}) {
	return (
		<Layout actualPage={'categories'}>
			<Grid
			container
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			>
				<h1>categories</h1>
				<Link href={'/categories/create'}>
					<a className={'btn'}>
						<CreateIcon/>
						Créer une categorie
					</a>
				</Link>
			</Grid>
			{categories.map((item, index) => (
				<div className="categorie_item" key={index} id={"div"+index}>
					<h2>{item.name}</h2>
					<Button className="btn" onClick={() => deletecategorie(item.id)}>
						<DeleteIcon/>
						Supprimer
					</Button>
				</div>
			))}
		</Layout>
	)
}

export async function getServerSideProps() {
    const req = await fetch(`http://localhost:3000/api/categories`, {
        'method': 'GET'
    });
    const data = await req.json();
	const categorieList = [];

	for(const categorie of data){
		categorieList.push(categorie);
	};

    return {
        props: { categories: categorieList }
    }
}

async function deletecategorie(id) {
	if(confirm('Voulez-vous vraiment supprimer cet categorie ?')) {
		const req = await fetch(`http://localhost:3000/api/categories/${id}`, {
			'method': 'DELETE'
		});
		Router.push('/categories');
	}
}