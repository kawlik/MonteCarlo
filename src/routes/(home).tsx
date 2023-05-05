import { Outlet } from "solid-start";

// layouts
import Navbar from "~/layouts/navbar";

export default function () {
	// component logic

	// component layout
	return (
		<main class="flex flex-col justify-start w-full h-full">
			<Navbar />
			<Outlet />
		</main>
	);
}
