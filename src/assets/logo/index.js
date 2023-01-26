import Brightcove from "./contributors/brightcove.webp";
import Cablelabs from "./contributors/cablelabs.svg";
import Fraunhofer from "./contributors/fraunhofer.svg";
import Logo4 from "./contributors/logo-4.png";
import Logo5 from "./contributors/logo-5.png";
import Logo6 from "./contributors/logo-6.png";
import MSOpenTech from "./contributors/msopentech.webp";
import Nus from "./contributors/nus.webp";
import Ozyegin from "./contributors/ozyegin.svg";
import UnifiedStreaming from "./contributors/unified-streaming.webp";
import Youtube from "./contributors/youtube.svg";
import DASHIF from "./sponsors/dash-if.svg";
import Akamai from "./used-by/akamai.svg";
import AWSElemental from "./used-by/aws-elemental.svg";
import Broadpeak from "./used-by/broadpeak.svg";
import System73 from "./used-by/system73.svg";

export function getSponsors() {
	return [
		{
			c: DASHIF,
			name: "DASH Industry Forum",
			url: "https://www.dashif.org",
			svg: true,
		},
	];
}

export function getUsedBy() {
	return [
		{
			c: Akamai,
			name: "Akamai",
			url: "http://www.akamai.com",
			svg: true,
		},
		{
			c: AWSElemental,
			name: "AWS Elemental",
			url: "https://www.elemental.com/",
			svg: true,
		},
		{
			c: Broadpeak,
			name: "Broadpeak",
			url: "https://www.broadpeak.tv",
			svg: true,
		},
		{
			c: System73,
			name: "System73",
			url: "https://www.system73.com",
			svg: true,
		},
	];
}

export function getContributors() {
	return [
		{ c: Akamai, name: "Akamai", url: "http://www.akamai.com", svg: true },
		{
			c: Brightcove,
			name: "Brightcove",
			url: "https://www.brightcove.com",
		},
		{
			c: Cablelabs,
			name: "CableLabs",
			url: "http://www.cablelabs.com",
			svg: true,
		},
		{
			c: Logo4,
			name: "Digital Primates",
			url: "http://www.digitalprimates.net",
		},
		{ c: Logo5, name: "Edgeware", url: "http://www.edgeware.tv" },
		{ c: Logo6, name: "Epic Labs", url: "https://www.epiclabs.io/" },
		{
			c: Fraunhofer,
			name: "Fraunhofer Institute For Open Communication Systems",
			url: "https://www.fokus.fraunhofer.de/go/fame",
			svg: true,
		},
		{ c: MSOpenTech, name: "Microsoft", url: "http://msopentech.com" },
		{
			c: Nus,
			name: "National University of Singapore",
			url: "https://nus.edu.sg",
		},
		{
			c: Ozyegin,
			name: "Ozyegin University",
			url: "https://www.ozyegin.edu.tr",
			svg: true,
		},
		{
			c: UnifiedStreaming,
			name: "Unified Streaming",
			url: "https://www.unified-streaming.com",
		},
		{
			c: Youtube,
			name: "Youtube",
			url: "http://www.youtube.com",
			svg: true,
		},
	];
}
