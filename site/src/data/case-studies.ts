import type { ImageMetadata } from 'astro';

import coastcastHero from '../assets/icons/coastcast.png';
import coastcastHome from '../assets/images/CoastCastHome.png';
import coastcastSearch from '../assets/images/CoastCastSearch.png';
import coastcastMap from '../assets/images/CoastCastMap.png';
import coastcastDetail from '../assets/images/CoastCastBeachDetail.png';

import quickstudyHero from '../assets/icons/quickstudy.png';
import quickstudyImport from '../assets/images/ImportSource.png';
import quickstudyPractice from '../assets/images/Practice.png';
import quickstudyReview from '../assets/images/CardReview.png';
import quickstudyQuiz from '../assets/images/Quiz.png';

import takeflightHero from '../assets/icons/take-flight.png';
import takeflightCover from '../assets/images/TakeFlightCoverPhoto.png';
import takeflightRun from '../assets/images/FinishRestReplay.jpg';
import takeflightChallenges from '../assets/images/QuickChallenges.png';
import takeflightNest from '../assets/images/BuildNest.png';
import takeflightPredator from '../assets/images/EscapePredator.png';

import commonsightHero from '../assets/icons/commonsight.png';
import commonsightDash from '../assets/images/CommonSightDash.png';
import commonsightObservation from '../assets/images/CommonSightObservation.png';
import commonsightStory from '../assets/images/CommonSIghtStoryCard.png';
import commonsightCoalition from '../assets/images/CommonSightCoalition.png';


import roastingHero from '../assets/icons/roastingplant.png';
import roastingDash from '../assets/images/RoastingPlantDash.png';
import roastingOrder from '../assets/images/RoastingPlantOrder.png';
import roastingCart from '../assets/images/RoastingPlantCart.png';

export interface CaseStudyCta {
	label: string;
	href: string;
}

export interface CaseStudyScreen {
	image: ImageMetadata;
	imageAlt: string;
	caption: string;
	body: string;
}

export interface CaseStudyDemo {
	/** Public path under /videos. */
	video: string;
	/** Omit when no still is distinct from the hero art; the first frame is used instead. */
	poster?: ImageMetadata;
	/** phone renders inside an iPhone bezel, wide renders in a 16:9 frame. */
	aspect: 'phone' | 'wide';
	heading: string;
	body: string;
}

export interface CaseStudy {
	number: string;
	category: string;
	tech: string;
	status: string;
	lead: string;
	primaryCta: CaseStudyCta;
	secondaryCta: CaseStudyCta;
	hero: ImageMetadata;
	heroAlt: string;
	overview: [string, string];
	problem: { intro: string; points: [string, string, string] };
	approach: { title: string; body: string }[];
	highlights: { term: string; body: string }[];
	screens: CaseStudyScreen[];
	demo: CaseStudyDemo;
	role: string;
	timeline: string;
	platform: string;
	stack: string[];
	stats: { value: string; label: string }[];
	reflection: string;
}

export const caseStudies: Record<string, CaseStudy> = {
	coastcast: {
		number: '01',
		category: 'Weather',
		tech: 'SwiftUI and Python',
		status: 'Live on the App Store',
		lead: 'Live beach conditions for Michigan in one screen, pulled from three federal data sources and served by a Python API I built and host myself.',
		primaryCta: {
			label: 'View on the App Store',
			href: 'https://apps.apple.com/us/app/coastcast/id6760917476',
		},
		secondaryCta: {
			label: 'Source',
			href: 'https://github.com/jaidenhenley/Swift-MichiganAPIWeather',
		},
		hero: coastcastHero,
		heroAlt: 'CoastCast app icon',
		overview: [
			'CoastCast is an iOS app I built because checking beach conditions in Michigan meant jumping between three different government websites. You browse beaches by region, save favorites, and see live temperature, wind, and humidity for each one.',
			'I built both halves: the SwiftUI app on the front end and a Python API on the back end that pulls live readings from National Weather Service stations, NOAA buoys, and active alert feeds.',
		],
		problem: {
			intro:
				'The data people need before driving to a beach already exists, but it is scattered across federal services that were never designed for a casual reader.',
			points: [
				'Weather, buoy readings, and alerts each live behind a separate government endpoint with its own format and its own uptime.',
				'Every reading comes back in metric, so raw values mean nothing to someone deciding whether to pack a towel.',
				'Any one of those sources can go down, and a naive client would fail the whole screen when it does.',
			],
		},
		approach: [
			{
				title: 'Fetch everything at once',
				body: 'The backend kicks off the weather, buoy, and alert requests together instead of waiting on each in turn. The detail screen loads as fast as the slowest single source, not all three added up.',
			},
			{
				title: 'One endpoint per screen',
				body: 'A single beach detail endpoint resolves the beach, then composes weather, conditions, and alerts into one response. The app makes one request to fill the whole screen.',
			},
			{
				title: 'Convert at the edge',
				body: 'The app keeps the original metric values and converts on display, imperial by default with a one tap switch to Celsius. A missing reading renders a dash instead of an error.',
			},
			{
				title: 'Predict crowds on device',
				body: 'A CoreML model I trained runs each day of the WeatherKit forecast through a crowd predictor using temperature, precipitation, wind, and water temp. No extra network call.',
			},
		],
		highlights: [
			{
				term: 'Concurrent composition',
				body: 'asyncio.gather with return_exceptions=True means a failing source degrades to an empty section rather than taking down the response.',
			},
			{
				term: 'NDBC text parsing',
				body: "NOAA publishes buoy readings as whitespace-delimited text using MM for missing values, so the parser falls back to MM even when a column is absent entirely.",
			},
			{
				term: 'Blocking work off the loop',
				body: 'The pandas processing is synchronous, so asyncio.to_thread runs it without rewriting it or stalling the async API.',
			},
			{
				term: 'Batched favorite refresh',
				body: 'A TaskGroup refreshes every saved beach in parallel, then decides which ones are worth a notification: a great beach day, a threshold crossing, or a severe alert.',
			},
			{
				term: 'Layered SwiftUI',
				body: 'Fetching, storage, and presentation live in separate types, which is what made pull to refresh and stale-while-loading straightforward to add.',
			},
		],
		screens: [
			{
				image: coastcastHome,
				imageAlt: 'CoastCast home screen with nearby beaches',
				caption: 'Home Screen',
				body: 'Nearby beaches and recommendations the moment you open the app.',
			},
			{
				image: coastcastSearch,
				imageAlt: 'CoastCast search and filter screen',
				caption: 'Search and Filter',
				body: 'Narrow by lake, park type, or activity, with quick-glance tags on each result.',
			},
			{
				image: coastcastMap,
				imageAlt: 'CoastCast interactive map with beach pins',
				caption: 'Interactive Map',
				body: 'Every beach plotted with custom pins and a swipeable card tray.',
			},
			{
				image: coastcastDetail,
				imageAlt: 'CoastCast beach detail screen with conditions',
				caption: 'Beach Conditions',
				body: 'Air and water temperature, UV guidance, and a live hourly forecast.',
			},
		],
		demo: {
			video: '/videos/CoastCastDemoVid.mov',
			poster: coastcastHome,
			aspect: 'phone',
			heading: 'One tap, one screen',
			body: 'Browsing by region, opening a beach, and reading live conditions, all from a single request to the API.',
		},
		role: 'Full-stack developer',
		timeline: 'Mar 2026 to May 2026',
		platform: 'iPhone',
		stack: ['SwiftUI', 'Python', 'FastAPI', 'Pydantic', 'HTTPX', 'Render', 'WeatherKit', 'CoreML', 'CoreLocation', 'MapKit'],
		stats: [
			{ value: '3', label: 'Live data sources' },
			{ value: '4', label: 'Great Lakes covered' },
			{ value: '1', label: 'API call per beach' },
			{ value: '50+', label: 'Years of NWS data' },
		],
		reflection:
			'This was the first time I owned a backend end to end. Pulling federal data sources, handling their failures gracefully, and shaping a response that Swift could consume cleanly taught me more about API design than any tutorial had. On the client side it sharpened how I think about state when the data behind the UI is genuinely unpredictable.',
	},

	quickstudy: {
		number: '02',
		category: 'Study tools',
		tech: 'On-device AI',
		status: 'Live on the App Store',
		lead: 'Scan a page or import a PDF and get a study-ready deck in minutes, with an approval step so nothing lands in your deck that you did not choose.',
		primaryCta: {
			label: 'View on the App Store',
			href: 'https://apps.apple.com/us/app/quickstudy-flashcard-tool/id6759993537',
		},
		secondaryCta: { label: 'Source', href: 'https://github.com/jaidenhenley/QuickStudy' },
		hero: quickstudyHero,
		heroAlt: 'QuickStudy app icon',
		overview: [
			'QuickStudy takes you from notes to practice without the busywork. Scan a page or import a PDF, let the app generate flashcards, then approve what is worth keeping before you study.',
			'Generation runs on device through Foundation Models, so there is no account and nothing leaves the phone. The AI does the heavy lifting, but you decide what belongs in the deck.',
		],
		problem: {
			intro:
				'Turning notes into a usable deck normally means scanning, cleaning up the text, writing every card by hand, and only then starting to review.',
			points: [
				'VisionKit OCR on a handwritten page comes back with broken words, merged lines, and stray characters that poison everything downstream.',
				'On-device generation is not available on every device, and even supported ones can fail on low memory.',
				'Generated cards include repeats and filler, and a noisy deck is worse than no deck at all.',
			],
		},
		approach: [
			{
				title: 'Clean before you generate',
				body: 'A Core Image pass desaturates, boosts contrast, and sharpens the capture before Vision sees it, then a text cleanup pass trims junk characters and repairs spacing and line breaks.',
			},
			{
				title: 'Plan for AI that is not there',
				body: 'When Foundation Models cannot run, a backup path chunks the cleaned text into card-sized pieces so you still get a usable deck, with UI copy that says what happened instead of failing silently.',
			},
			{
				title: 'Approve before you save',
				body: 'Generated cards land in a review list where each one toggles on or off. Only approved cards reach study and quiz mode, so decks stay focused.',
			},
			{
				title: 'One protocol, many models',
				body: 'A CardGenerating protocol defines generation, distractors, and quizzes, so swapping between the on-device model and an external provider changes nothing at the call site.',
			},
		],
		highlights: [
			{
				term: 'Handwriting preprocessing',
				body: 'CIColorControls plus CIUnsharpMask before OCR measurably improved recognition on handwritten pages.',
			},
			{
				term: 'Provider abstraction',
				body: 'A single request path handles both OpenAI-compatible and Anthropic APIs, switching auth headers and body shape based on the selected provider.',
			},
			{
				term: 'Keychain storage',
				body: 'External API keys are stored as encrypted generic passwords through Keychain Services rather than in plaintext defaults.',
			},
			{
				term: 'Local-first persistence',
				body: 'Decks and study history live on device through AppStorage and UserDefaults, so the app works with no account and no network.',
			},
			{
				term: 'Distractor generation',
				body: 'Quiz mode builds multiple choice questions from approved cards, generating plausible wrong answers from the source text rather than from other cards.',
			},
		],
		screens: [
			{
				image: quickstudyImport,
				imageAlt: 'QuickStudy import source screen',
				caption: 'Import Source',
				body: 'Scan a handwritten note or import a PDF, with OCR running before generation.',
			},
			{
				image: quickstudyReview,
				imageAlt: 'QuickStudy card review list',
				caption: 'Card Review',
				body: 'Toggle each generated card on or off before anything is saved.',
			},
			{
				image: quickstudyPractice,
				imageAlt: 'QuickStudy flashcard practice mode',
				caption: 'Flashcard Practice',
				body: 'Swipe through approved cards with a tap to reveal the answer.',
			},
			{
				image: quickstudyQuiz,
				imageAlt: 'QuickStudy quiz mode',
				caption: 'Quiz Mode',
				body: 'Multiple choice questions built from your approved set, with misses circling back.',
			},
		],
		demo: {
			video: '/videos/QuickStudyDemo1080.mp4',
			aspect: 'phone',
			heading: 'Scan to deck in one pass',
			body: 'A captured page runs through OCR and generation, then lands in the review list where you decide what is worth keeping.',
		},
		role: 'iOS developer, solo',
		timeline: 'Dec 2025 to Feb 2026',
		platform: 'iPhone',
		stack: ['SwiftUI', 'VisionKit', 'PDFKit', 'Foundation Models', 'Keychain', 'AppStorage'],
		stats: [
			{ value: '2', label: 'Import sources' },
			{ value: '3', label: 'Study modes' },
			{ value: '0', label: 'Accounts required' },
			{ value: '100%', label: 'On-device generation' },
		],
		reflection:
			'The approval step is the part I would keep in any version of this app. AI is good at producing volume and bad at knowing what matters to you, so putting a human gate between generation and the saved deck is what makes the output trustworthy. Building the fallback path also forced me to treat on-device AI as a capability that may not be there, which is a better default than assuming it will be.',
	},

	'take-flight': {
		number: '03',
		category: 'Games',
		tech: 'SpriteKit and SwiftUI',
		status: 'Live on the App Store',
		lead: 'A Belle Isle survival game built in six weeks at the Apple Developer Academy, where five mini games feed one shared score and hunger loop.',
		primaryCta: {
			label: 'View on the App Store',
			href: 'https://apps.apple.com/us/app/takeflight-a-bird-life/id6758803964',
		},
		secondaryCta: { label: 'Source', href: 'https://github.com/jaidenhenley/TakeFlight' },
		hero: takeflightHero,
		heroAlt: 'Take Flight app icon',
		overview: [
			'Take Flight is a 5-in-1 mini game collection set on Belle Isle, built by a team of five in six weeks. The loop is survive, grow your nest, and chase a high score across challenges built around memory, coordination, speed, and reflexes.',
			'It was my first SpriteKit project. I owned the core game loop, Game Center integration, the virtual controller, and tutorial mode.',
		],
		problem: {
			intro:
				'Five separate mini games can very easily feel like a playlist of unrelated screens rather than one game with stakes.',
			points: [
				'Each mini game had its own scene and its own logic, but all of them needed to read and write the same hunger, score, and progression state.',
				'Input had to work as a touch joystick on device and as keyboard control in the simulator, both driving the same movement system.',
				'I had never used SpriteKit, so the scene graph, physics bodies, update loop, and camera all had to be learned while the build was already running.',
			],
		},
		approach: [
			{
				title: 'Learn it system by system',
				body: 'Rather than reading the whole framework first, I built small isolated tests for physics, cameras, and collision, then wired each proven piece into the real game.',
			},
			{
				title: 'One state across five scenes',
				body: 'A central RunState model that every scene reads from and writes to. Scene transitions hand the same model forward, so hunger and score carry across challenges.',
			},
			{
				title: 'One input layer',
				body: 'A custom SwiftUI joystick normalizes drag into a CGPoint velocity clamped to the joystick radius. Keyboard input writes the same property, so SpriteKit only ever reads one value.',
			},
			{
				title: 'Persist as you play',
				body: 'The update loop accumulates deltas and writes player position, camera position, and hunger on an interval, so a run survives being interrupted.',
			},
		],
		highlights: [
			{
				term: 'Accumulator-driven updates',
				body: 'Position saves and hunger decay run off separate time accumulators in the update loop rather than per frame, keeping writes cheap.',
			},
			{
				term: 'Camera and player clamping',
				body: 'Both the player and the following camera clamp to map bounds each frame, so the world never shows its edges.',
			},
			{
				term: 'Game Center',
				body: 'Full authentication, leaderboards, and achievement reporting, wired in early enough that progression could be designed around it.',
			},
			{
				term: 'SwiftUI and SpriteKit split',
				body: 'Menus, HUD, and tutorial live in SwiftUI while gameplay stays in SpriteKit, with a clear boundary about which layer owns what.',
			},
		],
		screens: [
			{
				image: takeflightRun,
				imageAlt: 'Take Flight run summary',
				caption: 'The Run',
				body: 'Survive, feed, nest, and push the score higher on Belle Isle.',
			},
			{
				image: takeflightChallenges,
				imageAlt: 'Take Flight quick challenges',
				caption: 'Quick Challenges',
				body: 'Rotating mini games testing memory, coordination, speed, and reflexes.',
			},
			{
				image: takeflightNest,
				imageAlt: 'Take Flight nest building',
				caption: 'Build Your Nest',
				body: 'Collect materials around the island and find the right nesting tree.',
			},
			{
				image: takeflightPredator,
				imageAlt: 'Take Flight predator encounter',
				caption: 'Avoid Predators',
				body: 'Dodge threats around the island to keep the run alive.',
			},
		],
		demo: {
			video: '/videos/TakeFlightDemoCompressed.mp4',
			poster: takeflightCover,
			aspect: 'wide',
			heading: 'One run, five challenges',
			body: 'Hunger, score, and nest progress carry across every mini game, which is what makes a run feel like one game instead of five.',
		},
		role: 'iOS developer, team of 5',
		timeline: 'Jan 2026 to Feb 2026',
		platform: 'iPhone',
		stack: ['SpriteKit', 'SwiftUI', 'SwiftData', 'Game Center', 'AVFoundation'],
		stats: [
			{ value: '5', label: 'Mini games' },
			{ value: '6', label: 'Weeks to ship' },
			{ value: '5', label: 'Person team' },
			{ value: '1', label: 'Shared run loop' },
		],
		reflection:
			'The final build feels like one survival game rather than a bundle of mini games, and that came down to a single shared state model more than any individual scene. Learning SpriteKit under a six week deadline also changed how I approach unfamiliar frameworks: isolate the piece, prove it works, then integrate, instead of trying to understand everything before writing anything.',
	},

	commonsight: {
		number: '04',
		category: 'Civic tech',
		tech: 'Firebase and Foundation Models',
		status: 'In development',
		lead: 'A civic app for Detroit neighborhoods that turns short resident observations into shareable story cards, built end to end as the sole iOS engineer.',
		primaryCta: { label: 'Try on TestFlight', href: 'https://testflight.apple.com/join/rh7Ybt7K' },
		secondaryCta: { label: 'Source', href: 'https://github.com/jaidenhenley' },
		hero: commonsightHero,
		heroAlt: 'CommonSight app icon',
		overview: [
			'CommonSight helps Detroit neighborhoods document issues and organize around them. Residents log what they see, the app maps it, and an on-device model turns clusters of observations into story cards with context and a call to action.',
			'I joined a codebase someone else had started and took over the full iOS layer: Firebase Auth, a Firestore schema scoped per neighborhood, Cloud Messaging for coalitions, MapKit, and the Foundation Models flow. Most of it was new to me going in.',
		],
		problem: {
			intro:
				'A resident noticing rising property taxes or another empty storefront has nowhere to put that observation where it turns into anything.',
			points: [
				'Individual observations are a few sentences long and give no one a reason to care or act on their own.',
				'Neighborhood data has to stay scoped to a neighborhood, syncing live across accounts without loading the whole city.',
				'On-device AI has several distinct availability states, and any of them can leave a resident staring at a blank screen.',
			],
		},
		approach: [
			{
				title: 'Auth first, then data',
				body: 'I got sign up, sign in, and session persistence working against real accounts before building anything on top, so the data layer was designed against real users from day one.',
			},
			{
				title: 'Scope the schema',
				body: 'Firestore is structured per neighborhood and the map subscribes only to what is relevant to the neighborhood in view, instead of pulling everything and filtering on the client.',
			},
			{
				title: 'Live map through listeners',
				body: 'Firestore listeners feed MapKit directly, so a submitted observation appears on the map without a refresh or a trip through a list view.',
			},
			{
				title: 'Narrative Alchemy',
				body: 'Selected observations go to Foundation Models and come back as a story card with a title, narrative, and call to action, shaped from messy resident input into something readable and shareable.',
			},
		],
		highlights: [
			{
				term: 'Five availability states',
				body: 'The generator checks available, notEligible, notEnabled, modelNotReady, and unknown, each with its own message and a handcrafted fallback narrative so a card is always produced.',
			},
			{
				term: 'Neighborhood-scoped Firestore',
				body: 'Data is partitioned by community code, which keeps queries small and keeps one neighborhood out of another neighborhood results.',
			},
			{
				term: 'Cloud Messaging',
				body: 'Coalition campaigns and member updates run through Firebase Cloud Messaging, wired into the in-app coalition views.',
			},
			{
				term: 'Groundtruth reporting',
				body: 'A structured logging flow with category, location, and description, so observations arrive consistent enough for the model to work with.',
			},
		],
		screens: [
			{
				image: commonsightDash,
				imageAlt: 'CommonSight home screen',
				caption: 'Home Screen',
				body: 'Events, coalition spotlights, and your own submissions in one hub.',
			},
			{
				image: commonsightObservation,
				imageAlt: 'CommonSight new observation form',
				caption: 'New Observation',
				body: 'Pick a category, drop a location, describe what is happening, submit.',
			},
			{
				image: commonsightStory,
				imageAlt: 'CommonSight generated story card',
				caption: 'Story Card',
				body: 'Raw observations become a narrative people can read and share.',
			},
			{
				image: commonsightCoalition,
				imageAlt: 'CommonSight coalition view',
				caption: 'Coalition View',
				body: 'Where scattered observations turn into organized action.',
			},
		],
		demo: {
			video: '/videos/CommonSightPortVid1.mp4',
			aspect: 'phone',
			heading: 'Observation to story card',
			body: 'A resident logs what they see, it lands on the neighborhood map, and Foundation Models turns a cluster of reports into something worth sharing.',
		},
		role: 'Full iOS engineer, team of 5',
		timeline: 'Feb 2026 to Apr 2026',
		platform: 'iPhone',
		stack: ['SwiftUI', 'Firebase Auth', 'Firestore', 'Cloud Messaging', 'MapKit', 'Foundation Models'],
		stats: [
			{ value: '1', label: 'iOS engineer on the build' },
			{ value: '5', label: 'Services integrated' },
			{ value: '5', label: 'AI availability states handled' },
			{ value: '3', label: 'Months in development' },
		],
		reflection:
			'I started by taking apart code someone else wrote, which is a different skill from starting clean, and most of the stack was unfamiliar. What I keep coming back to is the fallback work: an app that generates a decent story card when Apple Intelligence is unavailable is far more useful to a resident than one that explains why it cannot. Designing for the degraded path first changed how the whole feature came out.',
	},

	roastingplant: {
		number: '05',
		category: 'Commerce',
		tech: 'SwiftUI',
		status: 'First solo build',
		lead: 'A mobile ordering app for a Detroit coffee shop, with drink customization, a multi-item cart, and real pricing. My first solo iOS project from empty Xcode project to finished flow.',
		primaryCta: {
			label: 'Source',
			href: 'https://github.com/jaidenhenley/RoastingPlantCoffeeProject',
		},
		secondaryCta: { label: 'All case studies', href: '/case-studies' },
		hero: roastingHero,
		heroAlt: 'Roasting Plant app icon',
		overview: [
			'Roasting Plant is a mobile ordering app built entirely in SwiftUI. You browse the menu, customize a drink by size, milk, sugar, and temperature, then add it to a cart with itemized pricing and tax.',
			'I built it as my first solo iOS project, which made it the place where SwiftUI state management actually clicked for me.',
		],
		problem: {
			intro:
				'An ordering flow looks simple until three screens all need to agree about the same drink and the same running total.',
			points: [
				'Menu, customization, and cart all read the same drink data, and an edit on one screen has to be visible on the others without being overwritten.',
				'Price depends on size, milk type, and whether the drink is iced, and the cart has to keep subtotal, tax, and total accurate as items come and go.',
				'A drink added by accident needs a way out of the cart that does not feel like a form.',
			],
		},
		approach: [
			{
				title: 'One source of truth',
				body: 'A single State-owned array of ordered drinks passed down through Binding. The Coffee struct holds every customization option so there is one shape moving through the app.',
			},
			{
				title: 'Pricing lives in the model',
				body: 'Each part of the price is its own function on the Coffee struct: base price by size, milk upcharges, iced upcharge. The cart just loops and sums.',
			},
			{
				title: 'Confirm before the cart',
				body: 'An order confirmation sheet lets you review a drink and its price before it joins the cart, so the cart never fills with half-decided items.',
			},
			{
				title: 'Swipe to remove',
				body: 'Cart rows use swipe actions with full swipe enabled, and removal recomputes subtotal, tax, and total immediately.',
			},
		],
		highlights: [
			{
				term: 'Modifier-based pricing',
				body: 'Oat, soy, and almond each carry their own upcharge and iced adds a flat amount, so a price is derived from the drink rather than stored alongside it.',
			},
			{
				term: 'State and Binding',
				body: 'Five connected views share one array without any external state library, which is exactly the lesson the project was for.',
			},
			{
				term: 'Live totals',
				body: 'Subtotal, tax, and total recompute on every add and remove, so what the cart shows always matches what was actually ordered.',
			},
			{
				term: 'No dependencies',
				body: 'Entirely SwiftUI and the standard library, no third-party packages.',
			},
		],
		screens: [
			{
				image: roastingDash,
				imageAlt: 'Roasting Plant order menu',
				caption: 'Order Menu',
				body: 'Browse espresso and drip options with search to find a drink fast.',
			},
			{
				image: roastingOrder,
				imageAlt: 'Roasting Plant drink customization',
				caption: 'Customization',
				body: 'Size, milk, sugar, and iced, each feeding the running price.',
			},
			{
				image: roastingCart,
				imageAlt: 'Roasting Plant cart and checkout',
				caption: 'Cart and Checkout',
				body: 'Itemized pricing with tax, and swipe to remove any drink.',
			},
		],
		demo: {
			video: '/videos/RoastingPlantDemo.mp4',
			poster: roastingDash,
			aspect: 'phone',
			heading: 'Menu to checkout',
			body: 'Customizing a drink, confirming it in the sheet, and watching the cart totals recompute as items come and go.',
		},
		role: 'iOS developer and designer, solo',
		timeline: 'Oct 2025',
		platform: 'iPhone',
		stack: ['SwiftUI'],
		stats: [
			{ value: '5', label: 'Connected views' },
			{ value: '3', label: 'Price modifiers' },
			{ value: '0', label: 'Third-party packages' },
			{ value: '1', label: 'Solo build' },
		],
		reflection:
			'Going from an empty Xcode project to a working ordering flow is where SwiftUI state stopped being abstract for me. Putting the pricing logic on the model instead of in the cart view is the decision I would make again, because it meant every screen could ask a drink what it costs rather than each one recalculating.',
	},
};
