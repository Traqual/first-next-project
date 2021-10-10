import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Layout from '../../components/layout'

let schema = yup.object().shape({
    title: yup.string().required(),
    preview_content: yup.string().required(),
    content: yup.string().required(),
 });

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    createTextFile(data);
  }

  const  updateArticleIdList = async () => {
    const req = await fetch(`http://localhost:3000/jsons/articles.json`);
    const data = await req.json();
    
    return 3; // TODO change temp id 
  }

  const createTextFile = (data) => {
    console.log('createTextFile function');
    const element = document.createElement("a");
    const nbFile = updateArticleIdList();

    const file = new Blob([
      "{" +
      "id: " + nbFile +
      "title: " +data.title +
      "preview_content: " + data.preview_content +
      "content: " + data.content
  ], {type: 'text/plain'});
    // TODO dowload this file
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <label>Titre</label>
         <input type="text" id="title_input" className="form-control" {...register("title")} />
         {errors.title && <span>{errors.title.message}</span>}
        </Box>
        <Box>
          <label>Contenu preview</label>
          <input type="text" id="preview_content_input" className="form-control" {...register("preview_content")} />
          {errors.preview_content && <span>{errors.preview_content.message}</span>}
        </Box>
        <Box>
          <label>Contenu</label>
          <input type="text" id="content_input" className="form-control" {...register("content")} />
          {errors.content && <span>{errors.content.message}</span>}
        </Box>
        
        <input type="submit" />
      </form>
    </Layout>
  );
}