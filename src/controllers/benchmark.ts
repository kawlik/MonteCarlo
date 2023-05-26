export default class Benchmark {
	public static test(callback: () => number, n: number = 1): [number, number] {
		let t0 = 0;
		let t1 = 0;

		let dt = 0;
		let dv = 0;

		for (let i = 0; i < n; i++) {
			t0 = performance.now();

			const val = callback();

			t1 = performance.now();

			dt += t1 - t0;
			dv += val;
		}

		return [dt / n, dv / n];
	}
}
