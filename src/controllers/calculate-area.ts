import { createRoot, createSignal } from "solid-js";

// controllers
import CanvasController from "./canvas";
import ResultController from "./result";
import DrawerController from "./drawer";

export default class CalculateAreaController {
	private result: CanvasController;
	private drawer: DrawerController;

	private chartResult: ResultController;

	constructor(private mainParent: Element, private sideParent: Element) {
		this.result = new CanvasController(this.sideParent);
		this.drawer = new DrawerController(this.mainParent);

		this.chartResult = new ResultController(this.result.cvs);

		window.dispatchEvent(new Event("resize"));
	}

	public start(): void {}

	public stop(): void {}
}
