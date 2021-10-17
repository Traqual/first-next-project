import {useRouter} from "next/router";
import Head from "next/head";
import Layout from "../../components/layout";
import { Link } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Article({article}) {
        const router = useRouter();
        const {id} = router.query;

        return (
        <Layout>
            <Head>
                <title>{article.title}</title>
            </Head>

            <Link href="/articles">
                <ArrowBackIcon className={'back-arrow'}/>
            </Link>

            <h3>{article.title}</h3>
            <p>{article.preview_content}</p>

            <div dangerouslySetInnerHTML={{__html: article.content}} />

        </Layout>
        )
}

export async function getServerSideProps({params}) {
    const req = await fetch(`http://localhost:3000/api/articles/${params.id}`, {
        'method': 'GET'
    });
    const data = await req.json();

    return {
        props: { article: data }
    }
}

/*
export async function getStaticProps({params}) {
    const req = await fetch(`http://localhost:3000/jsons/${params.id}.json`);
    const data = await req.json();

    return {
        props: { article: data }
    }
}

export async function getStaticPaths() {
    const req = await fetch(`http://localhost:3000/jsons/articles.json`);
    const data = await req.json();

    const paths = data.map(article => {
        return { params: { id: article } }
    });

    return {
        paths,
        fallback: false
    } 
}*/