import { useTheme } from "next-themes";

export default function Breakpoint() {
	const { resolvedTheme, setTheme } = useTheme();

	return (
		<div
			style={{
				background:
					"repeating-linear-gradient(45deg, #000, #000 10px, #ffff00 10px, #ffff00 20px)",
			}}
			className="sticky bottom-0 flex h-16 w-full flex-row items-center justify-center gap-4 overflow-hidden bg-white text-center text-white">
			<div className="bg-black p-1 text-white xs:hidden">- N/A</div>
			<div className="hidden bg-black p-1 text-white xs:block sm:hidden">
				xs mobile
			</div>
			<div className="hidden bg-black p-1 text-white sm:block md:hidden">
				sm tablet
			</div>
			<div className="hidden bg-black p-1 text-white md:block lg:hidden">
				md desktop
			</div>
			<div className="hidden bg-black p-1 text-white lg:block xl:hidden">
				lg large desktop
			</div>
			<div className="hidden bg-black p-1 text-white xl:block">
				xl extra large desktop
			</div>

			<button
				className="bg-black p-1 text-white"
				onClick={() =>
					setTheme(resolvedTheme == "dark" ? "light" : "dark")
				}>
				toggle dark
			</button>
		</div>
	);
}
