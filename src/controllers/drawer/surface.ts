import CanvasController from "../canvas";

export default class SurfaceController {
	public static readonly colorOut = "#BAD7F2";
	public static readonly colorIn = "#F2BAC9";

	private canvas: CanvasController;

	constructor(private mainParent: Element) {
		this.canvas = new CanvasController(this.mainParent);
		this.canvas.ctx.imageSmoothingEnabled = false;
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
