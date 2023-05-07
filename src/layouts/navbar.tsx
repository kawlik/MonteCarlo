import { AppBar, Drawer, IconButton, Toolbar, Typography } from "@suid/material";
import { createSignal } from "solid-js";
import { useNavigate } from "solid-start";

// components
import ButtonList from "~/components/button-list";

// icons
import BrushIcon from "@suid/icons-material/Brush";
import CalculateIcon from "@suid/icons-material/Calculate";
import FunctionsIcon from "@suid/icons-material/Functions";
import HomeIcon from "@suid/icons-material/Home";
import MenuIcon from "@suid/icons-material/Menu";

export default function () {
	// component logic
	const [isOpen, setIsOpen] = createSignal(false);

	const closeDrawer = () => setIsOpen(false);
	const openDrawer = () => setIsOpen(true);

	const navigate = useNavigate();
	const redirect = (url: string) => {
		return () => {
			navigate(url);
			closeDrawer();
		};
	};

	// component layout
	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton onClick={openDrawer} color="inherit" edge="start" size="large">
					<MenuIcon />
				</IconButton>
				<Typography flexGrow={1} marginX={1} variant="h6">
					Monte Carlo
				</Typography>
			</Toolbar>
			<Drawer onClose={closeDrawer} open={isOpen()}>
				<ButtonList
					items={[
						{
							onClick: redirect("/"),
							icon: <HomeIcon />,
							name: "Home",
						},
						{
							onClick: redirect("/calculate-pi"),
							icon: <CalculateIcon />,
							name: "Calculate Pi",
						},
						{
							onClick: redirect("/calculate-func"),
							icon: <FunctionsIcon />,
							name: "Calculate Functions",
						},
						{
							onClick: redirect("/calculate-area"),
							icon: <BrushIcon />,
							name: "Calculate Area",
						},
					]}
				/>
			</Drawer>
		</AppBar>
	);
}
