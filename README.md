# Portfolio Complete Guide & Deployment

Welcome to your new modern, responsive portfolio for your Data Analyst business! This project is built cleanly with pure HTML, CSS, and JS to ensure lightning-fast performance and an SEO-friendly structure.

## Overview of Files Provided:
- `index.html`: The core website structure with SEO meta tags.
- `style.css`: All styling, animations, colors and mobile responsiveness.
- `script.js`: Interactive elements like the mobile menu, scroll reveal animations, skill bars, and the EmailJS contact form.

---

## Deployment Guide

Here is a step-by-step guide on how to preview and deploy your new website.

### 1. Run Locally
To view your website on your own computer:
1. Make sure all three files (`index.html`, `style.css`, `script.js`) are in the same folder.
2. Simply **double-click** the `index.html` file. It will open in your default web browser.
3. For a more accurate test (especially for the contact form), it is recommended to run a local server:
   - If you use VS Code, install the extension **"Live Server"**.
   - Open your project folder in VS Code, right-click `index.html` and select **"Open with Live Server"**. 

### 2. Connect EmailJS (Crucial Step for Contact Form)
Your contact form uses EmailJS so you don't need a backend server to receive emails.

1. Go to [EmailJS](https://www.emailjs.com/) and create a free account.
2. **Add an Email Service**:
   - Go to "Email Services" and add a new service (e.g., Gmail).
   - Connect it to your email: `mdsahabubaiam01@gmail.com`.
   - Note your **Service ID**.
3. **Create an Email Template**:
   - Go to "Email Templates" and click "Create New Template".
   - Set up the content you want:
     - Subject: `New Client Inquiry from Portfolio`
     - Content (matching our JS code):
       ```
       Name: {{name}}
       Email: {{email}}
       Message: {{message}}
       ```
   - Save and note your **Template ID**.
4. **Get Your Public Key**:
   - Go to "Account" (top right) -> "API Keys" to find your **Public Key**.
5. **Update Your Code**:
   - Open `index.html` and replace `"YOUR_PUBLIC_KEY"` with your actual Public Key in the `<head>` tag.
   - Open `script.js`, find line 118, and replace `"YOUR_SERVICE_ID"` and `"YOUR_TEMPLATE_ID"` with your actual IDs.

### 3. Deploy on GitHub Pages
GitHub Pages is a great free hosting solution.
1. Create a free account on [GitHub](https://github.com/).
2. Create a new repository (name it something like `data-analyst-portfolio`). Leave it public.
3. Upload your three files (`index.html`, `style.css`, `script.js`) directly to this repository through the web interface or via Git push.
4. Go to the repository **Settings**.
5. On the left sidebar, click **Pages**.
6. Under "Build and deployment" -> "Source", select **Deploy from a branch**.
7. Under "Branch", change `None` to `main` (or `master`) and click **Save**.
8. Wait a couple of minutes, refresh the page, and GitHub will provide you with your live website link!

### 4. Deploy on Netlify (Alternative)
Netlify is another excellent free hosting provider, often faster and easier.
1. Create a free account on [Netlify]https://www.netlify.com/)(.
2. Go to your dashboard and look for the **Sites** tab or **Add new site**.
3. Select **Deploy manually**.
4. You will see an upload box ("Drag and drop your site output folder here").
5. Simply drag the folder containing your 3 files (`index.html`, `style.css`, `script.js`) into that box.
6. Netlify will instantly generate a live link for you. 
7. You can go to "Site Settings" -> "Change site name" to customize the Netlify URL.

---
### Final Touches
Your portfolio text is optimized to convert visitors! To make it complete:
- Replace the image placeholder texts in `index.html` with real screenshot links of your projects when you have them. To add an image, replace `<div class="project-img placeholder-img">...</div>` with `<img class="project-img" src="your-image.png" alt="Project Name">`.
- Update your WhatsApp number link in the footer if it ever changes.
