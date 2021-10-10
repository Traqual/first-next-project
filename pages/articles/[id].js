import {useRouter} from "next/router";
import Head from "next/head";
import Layout from "../../components/layout";
import { Link } from "@mui/material";

export default function Article({article}) {
        const router = useRouter();
        const {id} = router.query;

        return (
        <Layout>
            <Head>
                <title>{article.title}</title>
            </Head>

            <Link href="/articles">
               Go back to Articles
            </Link>

            <p>This is article {id}</p>
            <h3>{article.title}</h3>
            <p>{article.preview_content}</p>

            <div dangerouslySetInnerHTML={{__html: article.content}} />

        </Layout>
        )
}

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
}