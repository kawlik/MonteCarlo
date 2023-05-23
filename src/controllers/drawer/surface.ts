import CanvasController from "../canvas";

export default class SurfaceController {
	private canvas: CanvasController;

	constructor(private mainParent: Element) {
		this.canvas = new CanvasController(this.mainParent);
	}

	public get ctx() {
		return this.canvas.ctx;
	}

	public clear(): void {
		this.drawClear();
	}

	private drawClear(): void {
		this.canvas.ctx.fillStyle = "#BAD7F2";
		this.canvas.ctx.fillRect(0, 0, this.canvas.cvs.width, this.canvas.cvs.height);
	}
}
