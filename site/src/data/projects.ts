import type { ImageMetadata } from 'astro';

import coastcastCover from '../assets/icons/coastcast.png';
import quickstudyCover from '../assets/icons/quickstudy.png';
import takeflightCover from '../assets/icons/take-flight.png';
import commonsightCover from '../assets/icons/commonsight.png';
import roastingCover from '../assets/icons/roastingplant.png';

export interface ProjectStat {
	value: string;
	label: string;
}

export interface Project {
	slug: string;
	title: string;
	summary: string;
	cover: ImageMetadata;
	coverAlt: string;
	tags: string[];
	appStoreUrl?: string;
	featured?: boolean;
	stats?: ProjectStat[];
}

export const projects: Project[] = [
	{
		slug: 'coastcast',
		title: 'CoastCast',
		summary:
			'A SwiftUI weather app that pulls live NWS data for Michigan beaches, with search, favorites, and real-time alerts.',
		cover: coastcastCover,
		coverAlt: 'CoastCast app icon',
		tags: ['Swift', 'Python', 'CoreML', 'MapKit'],
		appStoreUrl: 'https://apps.apple.com/us/app/coastcast/id6760917476',
		featured: true,
		stats: [
			{ value: '3', label: 'Live data sources' },
			{ value: '4', label: 'Great Lakes covered' },
			{ value: '1', label: 'API call per beach' },
			{ value: '50+', label: 'Years of NWS and attendance data' },
		],
	},
	{
		slug: 'quickstudy',
		title: 'QuickStudy',
		summary:
			'A flashcard tool that turns scans and PDFs into study-ready cards using on-device AI.',
		cover: quickstudyCover,
		coverAlt: 'QuickStudy app icon',
		tags: ['SwiftUI', 'Foundation Models', 'VisionKit', 'PDF import'],
		appStoreUrl: 'https://apps.apple.com/us/app/quickstudy-flashcard-tool/id6759993537',
	},
	{
		slug: 'take-flight',
		title: 'Take Flight',
		summary:
			'A 5-in-1 survival game set on Belle Isle, with a polished game loop and an achievement system.',
		cover: takeflightCover,
		coverAlt: 'Take Flight app icon',
		tags: ['SpriteKit', 'SwiftUI', 'SwiftData', 'AVFoundation', 'Game Center'],
		appStoreUrl: 'https://apps.apple.com/us/app/takeflight-a-bird-life/id6758803964',
	},
	{
		slug: 'commonsight',
		title: 'CommonSight',
		summary:
			'AI-assisted civic reporting and story cards built to help communities document issues and organize action.',
		cover: commonsightCover,
		coverAlt: 'CommonSight app icon',
		tags: ['SwiftUI', 'Firebase', 'Supabase', 'MapKit'],
	},
	{
		slug: 'roastingplant',
		title: 'Roasting Plant',
		summary:
			'Browse, customize, and order coffee drinks with a full cart and checkout flow. My first solo SwiftUI app.',
		cover: roastingCover,
		coverAlt: 'Roasting Plant app icon',
		tags: ['SwiftUI'],
	},
];

export const featuredProjects = projects.filter((project) =>
	['coastcast', 'quickstudy'].includes(project.slug)
);
