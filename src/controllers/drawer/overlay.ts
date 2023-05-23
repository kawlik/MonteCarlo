import CanvasController from "../canvas";

export default class OverlayController {
	private canvas: CanvasController;

	private offsetR: number = 0.01;
	private offsetX: number = 0;
	private offsetY: number = 0;

    private readonly controls = {
        drawCircle: false,
    };

	constructor(private mainParent: Element) {
		this.canvas = new CanvasController(this.mainParent);
		this.canvas.cvs.style.cursor = "none";

		// event listeners
		this.canvas.cvs.addEventListener("mouseenter", (e) => {
			this.setMousePosition(e);

			this.drawClear();
			this.drawBrush();

            this.canvas.cvs.onmousedown = () => this.controls.drawCircle = true;
            this.canvas.cvs.onmouseup = () => this.controls.drawCircle = false;
		});

		this.canvas.cvs.addEventListener("mousemove", (e) => {
			this.setMousePosition(e);

			this.drawClear();
			this.drawBrush();
		});

		this.canvas.cvs.addEventListener("mouseleave", (e) => {
			this.drawClear();

            this.canvas.cvs.onmousedown = null;
            this.canvas.cvs.onmouseup = null;
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
        if (this.controls.drawCircle) this.drawCircle();

		const r = this.offsetR * this.canvas.cvs.width;
		const x = this.offsetX * this.canvas.cvs.width;
		const y = this.offsetY * this.canvas.cvs.height;

		this.canvas.ctx.beginPath();
		this.canvas.ctx.strokeStyle = "grey";
		this.canvas.ctx.lineWidth = 3;
		this.canvas.ctx.arc(x, y, r, 0, 2 * Math.PI);
		this.canvas.ctx.stroke();
	}

    private drawCircle(): void {
        const r = this.offsetR * this.canvas.cvs.width;
		const x = this.offsetX * this.canvas.cvs.width;
		const y = this.offsetY * this.canvas.cvs.height;
        
        this.canvas.ctx.beginPath();
		this.canvas.ctx.fillStyle = "#F2BAC9";
        this.canvas.ctx.roundRect(x - r, y - r, r * 2, r * 2, r);
        this.canvas.ctx.fill();
    }
}
