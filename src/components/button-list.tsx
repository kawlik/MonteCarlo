import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@suid/material";
import { For, JSX } from "solid-js";

export default function (props: {
	items: Array<{
		onClick(): void;
		icon: JSX.Element;
		name: string;
	}>;
}) {
	// component logic

	// component layout
	return (
		<List>
			<For each={props.items}>
				{(item) => (
					<ListItem>
						<ListItemButton onClick={item.onClick}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText>{item.name}</ListItemText>
						</ListItemButton>
					</ListItem>
				)}
			</For>
		</List>
	);
}
