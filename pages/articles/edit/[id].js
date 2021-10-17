import { Box } from "@mui/system";
import React, { useRef } from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Layout from '../../../components/layout'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "@mui/material";
import Router from 'next/router'
import { Editor } from '@tinymce/tinymce-react';


let schema = yup.object().shape({
    title: yup.string().required(),
    preview_content: yup.string().required()
 });

export default function App({article}) {
    const editorRef = useRef(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: article
    });

    const onSubmit = async (data) => {
        data.content = editorRef.current.getContent();
        const req = await fetch(`http://localhost:3000/api/articles/${article.id}`, {
            'method': 'PUT',
            'body': JSON.stringify(data)
        });
        Router.push('/articles');
    }

    return (
        <Layout>
            <Link href="/articles">
                <ArrowBackIcon className={'back-arrow'}/>
            </Link>

            <h3>Modifier un article</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <label>Titre</label>
                    <input type="text" id="title_input" className="form-control" {...register("title")} />
                    {errors.title && <span>{errors.title.message}</span>}
                </Box>
                <Box>
                    <label>Contenu preview</label>
                    <input type="text" id="preview_content_input" className="form-control" {...register("preview_content")}/>
                    {errors.preview_content && <span>{errors.preview_content.message}</span>}
                </Box>
                <Box>
                    <label>Contenu</label>
                    <Editor
                        id="content_input" className="form-control" {...register("content")}
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={article.content}
                        init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                    {errors.content && <span>{errors.content.message}</span>}
                </Box>

                <input type="submit" />
            </form>
        </Layout>
    );
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