# LinkedIn Profile Roaster 🔥

**Built by Meet Bhorania for GDG AI Innovation Hub**

> "If someone's profile doesn't make you cringe, you're not roasting hard enough."

<!-- REPLACE THE LINK BELOW WITH YOUR MAIN APP SCREENSHOT -->
<img width="1470" height="869" alt="image" src="https://github.com/user-attachments/assets/76bde046-ef12-4645-a92b-860a61fe2054" />


A brutally honest, hilariously savage, and surprisingly helpful AI application that roasts your LinkedIn profile to help you improve it. Using the power of **Google Gemini AI**, this app analyzes your headline, about section, and experience to deliver a roast so hot it'll burn your ego (but heal your career).

## 📸 Screenshots

<!-- REPLACE THESE LINKS WITH YOUR ACTUAL SCREENSHOTS -->
| The Roast Form | The Result Flipbook |
|:---:|:---:|
| ![Input Form](https://via.placeholder.com/400x300.png?text=Input+Form) | ![Roast Result](https://via.placeholder.com/400x300.png?text=Flipbook+Result) |
| *Choose your intensity level* | *Interactive 3D Flipbook Report* |

## 🌟 Features

- **AI-Powered Roasting:** Uses Google's `gemini-2.5-pro` model to generate context-aware, witty, and savage feedback.
- **Three Intensity Levels:**
  - 😊 **Mild:** Gentle teasing with constructive feedback.
  - 😬 **Medium:** Savage but funny. The "brutally honest best friend" vibe.
  - 💀 **Savage:** Absolutely ruthless. Gordon Ramsay energy.
- **Interactive Flipbook Report:** Results are presented in a beautiful, animated 3D book format.
- **Detailed Analytics:**
  - 📊 **Roast Scorecard:** Ratings for Headline, About Section, and Originality.
  - 🏆 **Shame Badges:** Awards like "Corporate Word Vomit Champion" or "Red Flag Collector".
  - 👯 **LinkedIn Twins:** Estimates how many other people have your exact same generic personality.
- **The Glow-Up Plan:** It’s not just mean; it’s helpful. Get actionable, rewritten versions of your profile sections to actually improve.

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **AI Model:** Google Gemini API (`@google/genai`)
- **Styling:** Tailwind CSS
- **Animations:** CSS Animations & `react-pageflip` (for the book effect)
- **Icons:** Heroicons

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google Gemini API Key (Get one at [aistudio.google.com](https://aistudio.google.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/linkedin-profile-roaster.git
   cd linkedin-profile-roaster
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```
   Add your Google Gemini API key:
   ```env
   API_KEY=your_google_gemini_api_key_here
   ```
   *Note: The application is configured to look for `process.env.API_KEY`. Ensure your build tool (Vite) is configured to expose this securely if deploying, or use a backend proxy for production security.*

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📸 How it Works

1. **Input Details:** Paste your LinkedIn Headline, About Section, and Experience.
2. **Select Level:** Choose how much emotional damage you can handle.
3. **Get Roasted:** Watch the AI analyze your profile and present the results in a flipbook.
4. **Improve:** Use the "Glow-Up" suggestions to fix your profile.

## 🤝 Contributing

Contributions are welcome! If you have ideas for new "Badges" or roasting logic, feel free to open a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ (and a little bit of savage intent) for <b>GDG AI Innovation Hub</b>
</p>
