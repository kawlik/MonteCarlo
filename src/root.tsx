import { Body, FileRoutes, Head, Html, Meta, Routes, Title } from "solid-start";

// stylesheet
import "./root.css";

export default function () {
	// component logic

	// component layout
	return (
		<Html lang="en">
			<Head>
				<Title>Monte Carlo</Title>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Body class="w-screen h-screen overflow-x-hidden">
				<Routes>
					<FileRoutes />
				</Routes>
			</Body>
		</Html>
	);
}
