import { Button, Modal, Typography } from "@suid/material";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import Benchmark from "~/components/benchmark";

// controllers
import CalculateAreaController from "~/controllers/calculate-area";

export default function () {
	// component logic
	let controller: CalculateAreaController;

	const [area, setArea] = createSignal(0);
	const [open, setOpen] = createSignal(false);
	const [test, setTest] = createSignal<
		{
			name: string;
			time: number;
			value: number;
		}[]
	>([]);

	const closeModal = () => setOpen(false);
	const openModal = () => setOpen(true);

	onCleanup(() => controller.stop());

	onMount(() => {
		const mainParent = document.querySelector("#mainParent")!;
		const sideParent = document.querySelector("#sideParent")!;

		controller = new CalculateAreaController(mainParent, sideParent);

		createEffect(() => setArea(0));
		createEffect(() => open() && setTest(controller.test()));
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
					<Button onClick={openModal} color="info">
						Test
					</Button>
					<Typography my={"auto"} variant="subtitle1">
						Area value is: {area().toFixed(4)}
					</Typography>
					<Benchmark onClose={closeModal} open={open()} test={test()} />
				</div>
				<div class="aspect-square relative shadow-md" id="sideParent" />
			</aside>
		</article>
	);
}
