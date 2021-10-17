import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';
import ListIcon from '@mui/icons-material/List';

export default function Navbar({ actualPage }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(Boolean(anchorEl));

	const handleClick = (event) => {
		if (anchorEl === event.currentTarget) {
			setAnchorEl(null);
			setOpen(false);
		} else {
			setAnchorEl(event.currentTarget);
			setOpen(true);
		}
	};

  	return (
	<Box sx={{ flexGrow: 1 }}>
	  <AppBar position="static">
		<Toolbar>
		  <IconButton
			size="large"
			edge="start"
			color="inherit"
			aria-label="menu"
			sx={{ mr: 2 }}
			aria-expanded={open ? 'true' : undefined}
        	onClick={handleClick}
		  >
			<ListIcon />
			<Menu
				anchorEl={anchorEl}
				open={open}
				MenuListProps={{
				'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem>
					<Link href="/">
						<a>
						Homepage
						</a>
					</Link>
				</MenuItem>
				<MenuItem>
					<Link href="/articles">
						<a>
						Articles
						</a>
					</Link>
				</MenuItem>
				<MenuItem>
					<Link href="/categories">
						<a>
						Categories
						</a>
					</Link>
				</MenuItem>
			</Menu>
		  </IconButton>
		  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
			  <h3>{actualPage}</h3>
		  </Typography>
		</Toolbar>
	  </AppBar>
	</Box>
  );
}
