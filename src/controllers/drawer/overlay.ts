import CanvasController from "../canvas";
import SurfaceController from "./surface";

export default class OverlayController {
	public static readonly colorOut = "#BAD7F2";
	public static readonly colorIn = "#F2BAC9";

	private canvas: CanvasController;

	private offsetR: number = 0.01;
	private offsetX: number = 0;
	private offsetY: number = 0;

	private isAltLeft: boolean = false;
	private isDrawing: boolean = false;

	constructor(private mainParent: Element, private surface: SurfaceController) {
		this.canvas = new CanvasController(this.mainParent);
		this.canvas.cvs.style.cursor = "none";

		// event listeners
		window.addEventListener("keydown", (e) => {
			if (e.code === "AltLeft") this.isAltLeft = true;
		});

		window.addEventListener("keyup", (e) => {
			if (e.code === "AltLeft") this.isAltLeft = false;
		});

		this.canvas.cvs.addEventListener("mousedown", () => {
			this.isDrawing = true;

			this.drawClear();
			this.drawBrush();
		});

		this.canvas.cvs.addEventListener("mouseup", () => {
			this.isDrawing = false;
		});

		this.canvas.cvs.addEventListener("mouseenter", (e) => {
			this.setMousePosition(e);

			this.drawClear();
			this.drawBrush();
		});

		this.canvas.cvs.addEventListener("mousemove", (e) => {
			this.setMousePosition(e);

			this.drawClear();
			this.drawBrush();
		});

		this.canvas.cvs.addEventListener("mouseleave", (e) => {
			this.drawClear();
		});

		this.canvas.cvs.addEventListener("wheel", (e) => {
			if (e.deltaY > 0) {
				this.offsetR = Math.min(0.15, this.offsetR + 0.01);
			} else {
				this.offsetR = Math.max(0.01, this.offsetR - 0.01);
			}

			this.drawClear();
			this.drawBrush();
		});
	}

	private setMousePosition(e: MouseEvent): void {
		const { top, left, width, height } = this.canvas.cvs.getClientRects()[0];

		this.offsetX = (e.clientX - left) / width;
		this.offsetY = (e.clientY - top) / height;
	}

	private drawClear(): void {
		this.canvas.ctx.clearRect(0, 0, this.canvas.cvs.width, this.canvas.cvs.height);
	}

	private drawBrush(): void {
		if (this.isDrawing) {
			this.drawCircle(this.surface.ctx);
			this.drawCircle(this.canvas.ctx);
		}

		const r = this.offsetR * this.canvas.cvs.width;
		const x = this.offsetX * this.canvas.cvs.width;
		const y = this.offsetY * this.canvas.cvs.height;

		this.canvas.ctx.beginPath();
		this.canvas.ctx.strokeStyle = "grey";
		this.canvas.ctx.lineWidth = 3;
		this.canvas.ctx.arc(x, y, r, 0, 2 * Math.PI);
		this.canvas.ctx.stroke();
	}

	private drawCircle(ctx: CanvasRenderingContext2D): void {
		const r = this.offsetR * this.canvas.cvs.width;
		const x = this.offsetX * this.canvas.cvs.width;
		const y = this.offsetY * this.canvas.cvs.height;

		ctx.beginPath();
		ctx.fillStyle = this.isAltLeft ? OverlayController.colorOut : OverlayController.colorIn;
		ctx.roundRect(x - r, y - r, r * 2, r * 2, r);
		ctx.fill();
	}
}
