import { onMount } from "solid-js";
import CalculatePi from "~/controllers/calculate-pi";

export default function () {
	// component logic

	onMount(() => {
		const controller = new CalculatePi(
			document.querySelector<HTMLDivElement>("#controller")!
		);
	});

	// component layout
	return (
		<article class="flex flex-1">
			<section class="flex flex-1 p-8">
				<div class="aspect-square border-4 relative" id="controller" />
			</section>
			<aside></aside>
		</article>
	);
}
