import { Box } from "@mui/system";
import React, { useRef } from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Layout from '../../components/layout'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "@mui/material";
import Router from 'next/router'
import { Editor } from '@tinymce/tinymce-react';


let schema = yup.object().shape({
    name: yup.string().required()
 });

export default function App() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const req = await fetch(`http://localhost:3000/api/categories`, {
        'method': 'POST',
        'body': JSON.stringify(data)
    });
    Router.push('/categories');
  }

  return (
    <Layout>
      <Link href="/categories">
        <ArrowBackIcon className={'back-arrow'}/>
      </Link>

      <h3>Créer une nouvelle categorie</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <label>Nom</label>
         <input type="text" id="name_input" className="form-control" {...register("name")} />
         {errors.name && <span>{errors.name.message}</span>}
        </Box>
        
        <input type="submit" />
      </form>
    </Layout>
  );
}