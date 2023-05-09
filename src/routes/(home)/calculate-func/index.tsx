import { Button, Typography } from "@suid/material";
import { createEffect, createSignal, onMount } from "solid-js";

// controllers
import CalculateFuncController from "~/controllers/calculate-func";

export default function () {
	// component logic
	let controller: CalculateFuncController;

	const [int, setInt] = createSignal(0);

	onMount(() => {
		const mainParent = document.querySelector("#mainParent")!;
		const sideParent = document.querySelector("#sideParent")!;

		controller = new CalculateFuncController(mainParent, sideParent);
	});

	// component layout
	return (
		<article class="flex flex-1 overflow-hidden">
			<section class="flex flex-1 p-4">
				<div class="aspect-square relative shadow-md" id="mainParent" />
			</section>
			<aside class="flex flex-1 flex-col gap-2 p-4">
				<div class="p-4 shadow-md mr-auto">
					<Button onClick={() => controller.start()} color="success">
						Start
					</Button>
					<Button onClick={() => controller.stop()} color="error">
						Stop
					</Button>
				</div>
				<div class="p-4 shadow-md mr-0">
					<Typography variant="h6">Inegral value is: {int().toFixed(4)}</Typography>
				</div>
				<div class="aspect-square relative shadow-md" id="sideParent" />
			</aside>
		</article>
	);
}
