// controllers
import CanvasController from "./canvas";
import DrawerController from "./drawer";
import ResultController from "./result";

export default class CalculateFuncController {
	private chartDrawer: CanvasController;
	private chartResult: CanvasController;

	private drawer: DrawerController;
	private result: ResultController;

	constructor(private mainParent: Element, private sideParent: Element) {
		this.chartDrawer = new CanvasController(this.mainParent);
		this.chartResult = new CanvasController(this.sideParent);

		this.drawer = new DrawerController(this.chartDrawer.cvs);
		this.result = new ResultController(this.chartResult.cvs);

		window.dispatchEvent(new Event("resize"));
	}

	public start(func: (x: number) => number, min: number, max: number): void {
		this.drawer.draw(func, min, max);
		this.drawer.update();
	}

	public stop(): void {}
}
