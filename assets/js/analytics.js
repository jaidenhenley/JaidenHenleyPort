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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// --- Scroll Depth ---
const scrollMilestones = new Set();
window.addEventListener("scroll", () => {
	const scrolled = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
	[25, 50, 75, 100].forEach(milestone => {
		if (scrolled >= milestone && !scrollMilestones.has(milestone)) {
			scrollMilestones.add(milestone);
			logEvent(analytics, "scroll_depth", { percent: milestone, page: document.title });
		}
	});
}, { passive: true });

// --- Nav clicks ---
document.querySelectorAll(".site-nav a").forEach(link => {
	link.addEventListener("click", () => {
		logEvent(analytics, "nav_click", {
			label: link.textContent.trim(),
			destination: link.getAttribute("href")
		});
	});
});

// --- Footer links ---
document.querySelectorAll(".site-footer a").forEach(link => {
	link.addEventListener("click", () => {
		logEvent(analytics, "footer_link_click", {
			label: link.textContent.trim(),
			destination: link.getAttribute("href")
		});
	});
});

// --- Hero social links (index.html) ---
document.querySelectorAll(".hero-social-link").forEach(link => {
	link.addEventListener("click", () => {
		logEvent(analytics, "social_link_click", {
			platform: link.textContent.trim(),
			destination: link.getAttribute("href")
		});
	});
});

// --- CTA buttons (index.html) ---
document.querySelectorAll(".hero-cta").forEach(btn => {
	btn.addEventListener("click", () => {
		logEvent(analytics, "cta_click", { label: btn.textContent.trim() });
	});
});

// --- Case study card clicks (index.html) ---
document.querySelectorAll(".featured-project-card a").forEach(link => {
	link.addEventListener("click", () => {
		const card = link.closest(".featured-project-card");
		const project = card?.querySelector("h4")?.textContent.trim();
		logEvent(analytics, "case_study_click", {
			project: project,
			destination: link.getAttribute("href")
		});
	});
});

// --- Contact form submission (contact.html) ---
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
	contactForm.addEventListener("submit", () => {
		logEvent(analytics, "contact_form_submit", {
			subject: contactForm.querySelector("[name='subject']")?.value || "unknown"
		});
	});
}

// --- Time on page ---
const pageLoadTime = Date.now();
window.addEventListener("beforeunload", () => {
	const seconds = Math.round((Date.now() - pageLoadTime) / 1000);
	logEvent(analytics, "time_on_page", { seconds: seconds, page: document.title });
});
