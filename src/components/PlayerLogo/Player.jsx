/* eslint-disable react-hooks/exhaustive-deps */
import dashjs, { MediaPlayer } from "dashjs";
import {
	MediaControlBar,
	MediaController,
	MediaMuteButton,
	MediaPlayButton,
	MediaTimeDisplay,
	MediaTimeRange,
} from "media-chrome/dist/react";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "usehooks-ts";

const mpds = [
	"https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd",
	"https://refapp.hbbtv.org/videos/01_llama_drama_1080p_25f75g6sv3/manifest.mpd",
	"https://dash.akamaized.net/dash264/TestCases/1a/sony/SNE_DASH_SD_CASE1A_REVISED.mpd",
	"https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths/dash.mpd",
];

const MPD_URL = mpds[Math.floor(Math.random() * mpds.length)];

export default function Player({ readyCallback, destroyCallback }) {
	const ref = useRef(null);
	const player = useRef(null);
	const entry = useIntersectionObserver(ref, {});
	const isVisible = !!entry?.isIntersecting;

	// Initialize when large and ref is available
	useEffect(() => {
		if (ref.current && !player.current && isVisible) {
			player.current = MediaPlayer().create();
			player.current.on("playbackPlaying", readyCallback);
			player.current.initialize(ref.current, MPD_URL, true);
		}
	}, [ref, isVisible]);

	// Play/Pause
	useEffect(() => {
		if (player.current) {
			if (isVisible) player.current.play();
			else player.current.pause();
		}
	}, [isVisible]);

	// Cleanup
	useEffect(() => {
		return () => {
			if (player.current) {
				player.current.off("playbackPlaying", () => {});
				player.current.destroy();
				player.current = null;
				destroyCallback();
			}
		};
	}, []);

	// Check if browser supports MediaSource
	if (!dashjs.supportsMediaSource()) return null;

	return (
		<MediaController className="h-full w-full">
			<video
				slot="media"
				ref={ref}
				muted
				className="h-full w-full object-fill"
			/>
			<MediaControlBar>
				<MediaPlayButton />
				<MediaTimeRange />
				<MediaTimeDisplay />
				<MediaMuteButton />
			</MediaControlBar>
		</MediaController>
	);
}
