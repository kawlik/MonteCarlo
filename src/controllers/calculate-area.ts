import { createRoot, createSignal } from "solid-js";

// controllers
import CanvasController from "./canvas";
import ResultController from "./result";
import DrawerController from "./drawer";

export default class CalculateAreaController {
	private chartResult: CanvasController;

	private drawer: DrawerController;
	private result: ResultController;

	constructor(private mainParent: Element, private sideParent: Element) {
		this.chartResult = new CanvasController(this.sideParent);

		this.drawer = new DrawerController(this.mainParent);
		this.result = new ResultController(this.chartResult.cvs);

		window.dispatchEvent(new Event("resize"));
	}

	public start(): void {}

	public stop(): void {}
}
