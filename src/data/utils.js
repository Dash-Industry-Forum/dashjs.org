export function nFormatter(num, digits) {
	const lookup = [
		{ value: 1, symbol: "" },
		{ value: 1e3, symbol: "k" },
		{ value: 1e6, symbol: "M" },
		{ value: 1e9, symbol: "G" },
		{ value: 1e12, symbol: "T" },
		{ value: 1e15, symbol: "P" },
		{ value: 1e18, symbol: "E" },
	];
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	var item = lookup
		.slice()
		.reverse()
		.find(function (item) {
			return num >= item.value;
		});
	return item
		? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
		: "0";
}

export function getRelativeTime(dateString) {
	const now = new Date();
	const date = new Date(dateString);
	const diffInMilliseconds = date.getTime() - now.getTime();
	const diffInSeconds = Math.round(diffInMilliseconds / 1000);

	const units = {
		year: 31536000,
		month: 2592000,
		day: 86400,
		hour: 3600,
		minute: 60,
		second: 1,
	};

	for (const unit in units) {
		const unitValue = units[unit];
		if (Math.abs(diffInSeconds) >= unitValue) {
			const time = Math.round(diffInSeconds / unitValue);
			const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
			return rtf.format(time, unit);
		}
	}
}
