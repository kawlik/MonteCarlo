import { createRoot, createSignal } from "solid-js";

// controllers
import CanvasController from "./canvas";
import ResultController from "./result";

export default class CalculateAreaController {
	private chartResult: CanvasController;

	private result: ResultController;

	constructor(private mainParent: Element, private sideParent: Element) {
		this.chartResult = new CanvasController(this.sideParent);

		this.result = new ResultController(this.chartResult.cvs);
	}

	public start(): void {}

	public stop(): void {}
}
