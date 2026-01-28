# My Academic Portfolio

This is the source code for my academic portfolio/CV website. It is designed to be hosted on GitHub Pages.

## 🚀 How to Publish This Website

Since you have **Git** and **GitHub Desktop** installed, follow these steps to get your site online:

1.  **Initialize Repository**:
    *   Open your terminal or command prompt in this folder (`D:\My_CV`).
    *   Run `git init`
    *   Run `git add .`
    *   Run `git commit -m "Initial portfolio setup"`

2.  **Create Repository on GitHub**:
    *   Log in to [GitHub.com](https://github.com/).
    *   Click the **+** icon (top right) -> **New repository**.
    *   Name it (e.g., `academic-portfolio`).
    *   Make it **Public**.
    *   Click **Create repository**.

3.  **Push to GitHub**:
    *   Copy the URL of your new repository (e.g., `https://github.com/YourUsername/academic-portfolio.git`).
    *   In your terminal, run: `git remote add origin <PASTE_URL_HERE>`
    *   Run: `git branch -M main`
    *   Run: `git push -u origin main`

4.  **Enable GitHub Pages**:
    *   Go to your repository **Settings** > **Pages** (sidebar).
    *   Under **Build and deployment** > **Branch**, select `main`.
    *   Click **Save**.
    *   Your site will be live at `https://yourusername.github.io/academic-portfolio/` shortly!

---

## ✏️ How to Edit Your CV

All content is managed in `data.js`. You generally do not need to touch HTML/CSS.

### 1. Certifications
You can add unlimited certifications in the `certifications` list in `data.js`.
Ensure your PDF/Image files are inside the `assets` folder.
```javascript
certifications: [
    {
        title: "Course Name",
        institution: "Udemy/Coursera",
        year: "2025",
        certificate: "./assets/my-certificate.pdf",
        description: "Brief description..."
    },
    ...
]
```

### 2. Gallery (Field Trips)
The gallery supports multiple field trips or categories.
Each item in the `gallery` list represents a whole section (e.g., a specific trip).
```javascript
gallery: [
    {
        title: "Sedimentology Field Trip",
        folder: "sedimentology FT", // Folder name inside 'gallery/' directory
        description: "Trip description...",
        images: [
            { file: "img1.jpeg", caption: "My Caption" },
            { file: "img2.jpeg", caption: "Another Caption" }
        ]
    },
    ...
]
```
To add a new trip:
1.  Create a new folder inside `gallery/`.
2.  Add your photos there.
3.  Add a new block to the `gallery` array in `data.js` matching the folder name.
