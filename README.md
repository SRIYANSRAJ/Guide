# NumVisual - Interactive Number Systems & Slow-Mo Arithmetic Laboratory

Interactive Computer Science laboratory for exploring positional place values, arbitrary radix conversions, slow-motion chain borrowing, carry propagation, and complements across Binary, Octal, Decimal, and Hexadecimal.

Crafted by **Sriyans And Devashish**.

---

## 🚀 How to Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```

3. Open your browser at `http://localhost:3000`.

---

## 🌐 Deploying to GitHub Pages

This repository is pre-configured with a dual-mode workflow that works seamlessly with GitHub Pages.

### Step 1: Enable Workflow Permissions in your GitHub Repo (Required)
If GitHub Actions fails with permission or 403 errors:
1. Go to your GitHub repository **Settings** → **Actions** → **General**.
2. Scroll down to **Workflow permissions**.
3. Select **"Read and write permissions"** and check **"Allow GitHub Actions to create and approve pull requests"**.
4. Click **Save**.

### Step 2: Choose your GitHub Pages Setting
In your GitHub repo, go to **Settings** → **Pages**:
- **Option A (GitHub Actions)**: Under *Build and deployment* > *Source*, select **GitHub Actions**.
- **Option B (Deploy from branch)**: Under *Build and deployment* > *Source*, select **Deploy from a branch** → choose branch **`gh-pages`** and folder **`/ (root)`**.

The automated workflow supports **both** options out of the box!

---

### Alternative: Deploy directly via CLI (`npm run deploy`)
You can also deploy locally without GitHub Actions:
```bash
npm run deploy
```
This automatically compiles the TypeScript project into `./dist` and pushes it to the `gh-pages` branch.
