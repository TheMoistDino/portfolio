# Darren Luu | Personal Portfolio

An interactive, developer-themed portfolio website built with React 19 and Vite. This project features a custom command-line interface (CLI) style terminal and a responsive project showcase.

## 🚀 Live Site
Check it out at: [portfolio.darrenluu.com](https://portfolio.darrenluu.com)

## 🛠️ Tech Stack
- **Framework:** React 19 (Hooks, Functional Components)
- **Build Tool:** Vite (Ultra-fast HMR and bundling)
- **Styling:** Tailwind CSS (Utility-first styling)
- **Icons:** Lucide React
- **Deployment:** GitHub Actions + GitHub Pages

## 📂 Project Structure
- `/src/components`: Contains the Interactive Terminal, Particle Background, and Project Modals.
- `/public`: Stores static assets including `resume.pdf` and project images.
- `/scripts`: Utility scripts for image conversion and asset management.

## 🔄 Deployment Workflow
This project uses **GitHub Actions** for CI/CD. Manual deployment via `npm run deploy` is disabled to prevent branch synchronization conflicts.

### How to push updates:
1. **Local Development:** Run `npm run dev` to preview changes locally.
2. **Commit Changes:** Stage your files and commit them to the `main` branch.
   ```bash
   git add .
   git commit -m "Update: Added new hackathon win"