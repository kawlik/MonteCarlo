import { Button, Input, Typography } from "@suid/material";
import { createEffect, createSignal, onMount } from "solid-js";

// controllers
import CalculateFuncController from "~/controllers/calculate-func";

// icons
import FunctionsIcon from "@suid/icons-material/Functions";
import FormatToLIcon from "@suid/icons-material/FormatTextdirectionRToL";
import FormatToRIcon from "@suid/icons-material/FormatTextdirectionLToR";

export default function () {
	// component logic
	let controller: CalculateFuncController;

	const [int, setInt] = createSignal(0);
	const [err, setErr] = createSignal(false);

	const [x0, setX0] = createSignal(0);
	const [x1, setX1] = createSignal(1);
	const [fn, setFn] = createSignal("");

	onMount(() => {
		const mainParent = document.querySelector("#mainParent")!;
		const sideParent = document.querySelector("#sideParent")!;

		controller = new CalculateFuncController(mainParent, sideParent);

		createEffect(() => setInt(controller.int()));
		createEffect(() => {
			const limit = 100;
			const regfn = new RegExp(/^f\(x\) = .*/);

			if (x0() > limit || x0() < -limit) return setErr(false);
			if (x1() > limit || x1() < -limit) return setErr(false);

			if (!regfn.test(fn())) return setErr(false);

			setErr(true);
		});
	});

	// component layout
	return (
		<article class="flex flex-1 overflow-hidden">
			<section class="flex flex-1 p-4">
				<div class="aspect-square relative shadow-md" id="mainParent" />
			</section>
			<aside class="flex flex-1 flex-col gap-2 p-4">
				<div class="flex flex-1 flex-nowrap gap-2">
					<div class="p-4 shadow-md">
						<Button
							onClick={() => controller.start()}
							color="success"
							disabled={!err()}
						>
							Start
						</Button>
						<Button onClick={() => controller.stop()} color="error">
							Stop
						</Button>
					</div>
					<div class="flex flex-1 flex-nowrap gap-2 p-4 shadow-md">
						<Input
							onChange={(e) => setX0(+e.target.value)}
							placeholder="Min"
							sx={{ width: 96 }}
							type="number"
							value={x0()}
							startAdornment={<FormatToLIcon fontSize="small" />}
						/>
						<Input
							onChange={(e) => setX1(+e.target.value)}
							placeholder="Max"
							sx={{ width: 96 }}
							type="number"
							value={x1()}
							startAdornment={<FormatToRIcon fontSize="small" />}
						/>
						<Input
							onChange={(e) => setFn(e.target.value)}
							fullWidth={true}
							placeholder="f(x) = "
							startAdornment={<FunctionsIcon fontSize="small" />}
							value={fn()}
						/>
					</div>
				</div>
				<div class="p-4 shadow-md mr-0">
					<Typography variant="h6">Inegral value is: {int().toFixed(4)}</Typography>
				</div>
				<div class="aspect-square relative shadow-md" id="sideParent" />
			</aside>
		</article>
	);
}
