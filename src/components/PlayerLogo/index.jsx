import { Suspense, lazy, useEffect, useState } from "react";

import DashLogo from "../../assets/dash.svg";
import ErrorBoundary from "../ErrorBoundary";

export default function PlayerLogo({ videoPlayingCallback }) {
	const [ready, setready] = useState(false);
	const [mounted, setMounted] = useState(false);

	const Player = lazy(() => import("./Player"));

	useEffect(() => {
		setMounted(true);
	}, []);

	const callback = (playing) => {
		setready(playing);
		videoPlayingCallback(playing);
	};

	return (
		<>
			{mounted && (
				<div
					className={`min-w-full max-w-full shadow-lg transition-opacity duration-500 max-md:transition-none ${
						!ready ? "w-0 min-w-0 opacity-0" : "opacity-100"
					}`}>
					<ErrorBoundary errorCallback={() => callback(false)}>
						<Suspense>
							<Player
								readyCallback={() => callback(true)}
								destroyCallback={() => callback(false)}
							/>
						</Suspense>
					</ErrorBoundary>
				</div>
			)}
			<DashLogo
				className={`w-3/4 transition-opacity duration-500 max-md:transition-none xs:w-2/3 md:w-1/2 lg:w-8/12 ${
					ready ? "opacity-0" : "opacity-100"
				}`}
			/>
		</>
	);
}
