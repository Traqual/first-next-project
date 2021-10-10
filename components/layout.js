import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Head from 'next/head'
import Navbar from './navbar';

export const siteTitle = 'Wiki test'

export default function Layout({ children, actualPage }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Personnal Wiki to keep development's Best pratices"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                    siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
            </Head>
            <Navbar actualPage={actualPage} login>
            </Navbar>
             <Container>{children}</Container>
        </>
    )
}
