export default class CalculatePi {
	private chart: HTMLCanvasElement;
	private circle: HTMLCanvasElement;

	constructor(private parrent: HTMLDivElement) {
		this.chart = document.createElement("canvas");
		this.circle = document.createElement("canvas");

		// circle has to be under the chart
		this.parrent.append(this.circle);
		this.parrent.append(this.chart);

		window.addEventListener("resize", () => {
			const width = this.parrent.clientWidth;
			const height = this.parrent.clientHeight;

			this.adjust(width, height);
			this.update(width, height);
		});

		window.dispatchEvent(new Event("resize"));
	}

	private adjust(width: number, height: number): void {
		this.adjustSize(this.chart, width, height);
		this.adjustSize(this.circle, width, height);

		this.adjustStyle(this.chart, width, height);
		this.adjustStyle(this.circle, width, height);
	}

	private adjustSize(cvs: HTMLCanvasElement, width: number, height: number): void {
		cvs.width = width;
		cvs.height = height;
	}

	private adjustStyle(cvs: HTMLCanvasElement, width: number, height: number): void {
		cvs.style.width = width + "px";
		cvs.style.height = height + "px";

		// center relative to parrent
		cvs.style.position = "absolute";
		cvs.style.left = "50%";
		cvs.style.top = "50%";

		// center relative to center
		cvs.style.transform = "translate(-50%, -50%)";
	}

	private update(width: number, height: number): void {
		const circleCtx = this.circle.getContext("2d");
		const circleRad = Math.max(width, height);

		if (!circleCtx) throw "Context is undefined!";

		circleCtx.clearRect(0, 0, width, height);
		circleCtx.roundRect(0, 0, width, height, circleRad);
		circleCtx.fillStyle = "rgba(255, 63, 63, 1)";
		circleCtx.fill();
	}
}
