// Firebase Analytics, carried over from the original site.
// Placeholders are replaced at deploy time by .github/workflows/deploy.yml.
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

const firebaseConfig = {
	apiKey: "__FIREBASE_API_KEY__",
	authDomain: "__FIREBASE_AUTH_DOMAIN__",
	projectId: "__FIREBASE_PROJECT_ID__",
	storageBucket: "__FIREBASE_STORAGE_BUCKET__",
	messagingSenderId: "__FIREBASE_MESSAGING_SENDER_ID__",
	appId: "__FIREBASE_APP_ID__",
	measurementId: "__FIREBASE_MEASUREMENT_ID__"
};

// A stray placeholder means the deploy step did not run, so stay silent
// rather than initialising Firebase with junk (local dev, forks, previews).
if (!firebaseConfig.apiKey.startsWith("__FIREBASE")) {
	const app = initializeApp(firebaseConfig);
	const analytics = getAnalytics(app);

	// --- Scroll depth ---
	let milestones = new Set();
	addEventListener("scroll", () => {
		const scrolled =
			((scrollY + innerHeight) / document.documentElement.scrollHeight) * 100;
		for (const m of [25, 50, 75, 100]) {
			if (scrolled >= m && !milestones.has(m)) {
				milestones.add(m);
				logEvent(analytics, "scroll_depth", { percent: m, page: document.title });
			}
		}
	}, { passive: true });

	// --- Time on page ---
	let pageLoadTime = Date.now();
	const flushTime = () => {
		const seconds = Math.round((Date.now() - pageLoadTime) / 1000);
		if (seconds > 0) {
			logEvent(analytics, "time_on_page", { seconds, page: document.title });
		}
	};
	addEventListener("beforeunload", flushTime);

	// Delegated so it keeps working after a client-side navigation swaps the DOM.
	document.addEventListener("click", (event) => {
		const link = event.target.closest("a");
		if (!link) return;
		const label = link.textContent.trim();
		const destination = link.getAttribute("href");

		if (link.closest(".site-header .nav, .site-header .mobile-nav")) {
			logEvent(analytics, "nav_click", { label, destination });
		} else if (link.closest(".site-footer, .cta-footer")) {
			logEvent(analytics, "footer_link_click", { label, destination });
		} else if (link.closest(".socials")) {
			logEvent(analytics, "social_link_click", { platform: label, destination });
		} else if (link.closest(".card.project, .card.featured, .next")) {
			const card = link.closest(".card.project, .card.featured, .next");
			const project = card?.querySelector("h3, .next-title")?.textContent.trim();
			logEvent(analytics, "case_study_click", { project, destination });
		} else if (link.classList.contains("btn")) {
			logEvent(analytics, "cta_click", { label });
		}
	});

	document.addEventListener("submit", (event) => {
		const form = event.target.closest("form");
		if (!form) return;
		logEvent(analytics, "contact_form_submit", {
			subject: form.querySelector("[name='subject']")?.value || "unknown"
		});
	});

	// Each client-side navigation counts as its own page view.
	document.addEventListener("astro:page-load", () => {
		milestones = new Set();
		pageLoadTime = Date.now();
		logEvent(analytics, "page_view", {
			page_title: document.title,
			page_location: location.href,
			page_path: location.pathname
		});
	});
}
