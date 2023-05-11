import { Button, Typography } from "@suid/material";
import { createEffect, createSignal, onMount } from "solid-js";

// controllers
import CalculatePiController from "~/controllers/calculate-pi";

export default function () {
	// component logic
	let controller: CalculatePiController;

	const [pi, setPi] = createSignal(0);

	onMount(() => {
		const mainParent = document.querySelector("#mainParent")!;
		const sideParent = document.querySelector("#sideParent")!;

		controller = new CalculatePiController(mainParent, sideParent);

		createEffect(() => setPi(controller.pi()));
	});

	// component layout
	return (
		<article class="flex flex-1 overflow-hidden">
			<section class="flex flex-1 p-4">
				<div class="aspect-square relative shadow-md" id="mainParent" />
			</section>
			<aside class="flex flex-1 flex-col gap-2 p-4">
				<div class="flex flex-nowrap gap-2 p-4 shadow-md">
					<Button onClick={() => controller.start()} color="success">
						Start
					</Button>
					<Button onClick={() => controller.stop()} color="error">
						Stop
					</Button>
					<Typography my={"auto"} variant="subtitle1">
						PI value is: {pi().toFixed(4)}
					</Typography>
				</div>
				<div class="aspect-square relative shadow-md" id="sideParent" />
			</aside>
		</article>
	);
}
