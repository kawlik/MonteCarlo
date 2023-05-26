import { Modal, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@suid/material";
import { For, createEffect, createSignal } from "solid-js";

export default function (props: {
	onClose: () => void;
	open: boolean;
	test: {
		name: string;
		time: number;
		value: number;
	}[];
}) {
	// component logic

	// component layout
	return (
		<Modal open={props.open} onClose={props.onClose}>
			<Paper
				sx={{
					boxShadow: "24px",
					transform: "translate(-50%, -50%)",
					position: "absolute",
					left: "50%",
					top: "50%",
					padding: 4,
				}}
			>
				<Table>
					<TableHead>
						<TableCell>Benchmark</TableCell>
						<TableCell align="right">Time (ms)</TableCell>
						<TableCell align="right">Value</TableCell>
						<TableCell align="right">Error (±)</TableCell>
						<TableCell align="right">Error (%)</TableCell>
					</TableHead>
					<TableBody>
						<For each={props.test}>
							{(benchmark) => (
								<TableRow>
									<TableCell>{benchmark.name}</TableCell>
									<TableCell align="right">
										{benchmark.time.toFixed(9)}
									</TableCell>
									<TableCell align="right">
										{benchmark.value.toFixed(9)}
									</TableCell>
									<TableCell align="right">
										{(benchmark.value - props.test[0].value).toFixed(9)}
									</TableCell>
									<TableCell align="right">
										{Math.abs(
											100 * (props.test[0].value - benchmark.value)
										).toFixed(6)}
									</TableCell>
								</TableRow>
							)}
						</For>
					</TableBody>
				</Table>
			</Paper>
		</Modal>
	);
}
