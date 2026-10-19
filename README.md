# 🌸 Sanjana Kumari - Animated Portfolio 🌸

A premium, interactive, scroll-based animated portfolio website built using vanilla technologies (HTML5, CSS3, JavaScript ES6) and canvas frame-rendering techniques. The website binds a smooth cherry-blossom animation sequence directly to scroll progression.

👉 **Live Demo:** https://sanjana-animated-portfolio.vercel.app/
👉 **GitHub Repository:** [SanjanaAnimatedPortfolio](https://github.com/sanjana22032005-cmd/SanjanaAnimatedPortfolio)

---

## 🚀 Key Features

* **Scroll-Bound Cinematic Canvas**: Features a 240-frame cherry-blossom animation running on an optimized HTML5 `<canvas>` that updates smoothly based on natural scrolling speeds using linear interpolation (`lerp`).
* **Minimalist Brand Identity**: Fixed top-left brand watermark (`SANJANA`) aligned perfectly with page margins.
* **macOS-Dock Navigation Capsule**: A floating glassmorphic nav pill centered at the top of the viewport featuring a scroll-spy engine that highlights active sections.
* **Interactive Timeline & Stats**:
  * **Hero Typewriter**: Dynamic typing effect cycling through professional titles.
  * **DSA & Project Stats**: High-contrast counters for DSA counts (`500+`), project lists, and scholarships.
  * **Vertical Education Journey**: Visual tracking of B.Tech CSE (IIIT Guwahati), XII, and X details alongside decorative glowing branches.
* **Projects & Achievements Catalog**: Includes individual links to GitHub repositories (Uber Clone, Zivro, Media Search), hackathons, and credentials.
* **Mobile-Responsive Dock**: On mobile viewports (`max-width: 768px`), the navigation capsule converts into a floating thumb-reachable bottom navigation dock.

---

## ⚡ Performance Optimizations

* **90% Frame Compression**: Downscaled 240 cinematic frames from 1080p to 720p and converted them from JPEG to WebP (`quality=50`), lowering total weight from **74MB** to **~7MB**.
* **Progressive Rendering Stream**: Removed blocking loader screens. The app loads instantly, rendering the initial frame in milliseconds while remaining frames stream asynchronously in the background.
* **GPU & DPR Capping**: Capped the canvas `devicePixelRatio` to a maximum of `2` inside resize listeners to prevent memory bottlenecks and animation lag on high-DPI retina mobile viewports.
* **Glassmorphic Filters**: Backed by `backdrop-filter: blur(16px)` and variable-saturated glowing pink (`#ff2a75`) accents to create deep, interactive layer boundaries.

---

## 📂 Project Structure

```bash
├── frames/                         # 240 compressed animation frames (.webp)
│   ├── frame_000001.webp
│   └── ...
├── index.html                      # Layout, grid blocks, and structure
├── style.css                       # Glowing glassmorphic variables and responsive queries
├── main.js                         # Canvas rendering engine, scroll spy, and typewriter
├── Sanjana_resume_full_n_final.pdf   # Downloadable curriculum vitae
├── .gitignore                      # Excludes heavy zip files and temporary utilities
└── README.md                       # Documentation
```

---

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sanjana22032005-cmd/SanjanaAnimatedPortfolio.git
   cd SanjanaAnimatedPortfolio
   ```

2. **Run a local server:**
   You can run a local server using Python, Node, or VS Code's Live Server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (with live-server installed)
   npx live-server
   ```

3. **Open in browser:**
   Navigate to `http://localhost:8000` (or the port specified by your server).

---

## 🌐 Deployment Instructions

### GitHub Pages
1. Go to the repository settings on GitHub.
2. Navigate to the **Pages** section on the left sidebar.
3. Under **Build and deployment**, select **Deploy from a branch** and select the `main` branch.
4. Click **Save**. Your site will be live at `https://sanjana22032005-cmd.github.io/SanjanaAnimatedPortfolio/` in a few minutes.

---

## 👩‍💻 Developer

**Sanjana Kumari**
* B.Tech Student in Computer Science & Engineering, IIIT Guwahati
* **Email:** sanjanawork48@gmail.com
* **LinkedIn:** [sanjana-kumari-5585b4340](https://www.linkedin.com/in/sanjana-kumari-5585b4340/)
* **GitHub:** [@sanjana22032005-cmd](https://github.com/sanjana22032005-cmd)
* **Codolio:** [sanjanamehta](https://codolio.com/profile/sanjanamehta)
