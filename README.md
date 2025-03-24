# DuskDrop - Temporary File Sharing Platform

DuskDrop is a **simple, fast, and secure** file-sharing platform built with **TypeScript**. It allows users to **upload and share files up to 100GB** without needing an account. Files automatically expire after a chosen duration (1 day, 7 days, 15 days, or 30 days).  

🚀 **Live Demo (Coming Soon...)**  

---

## ✨ Features

- ⚡ **No Signup Required** - Share files instantly without creating an account.  
- 📂 **Upload up to 100GB** - Large file support for seamless sharing.  
- ⏳ **Auto-Expiring Files** - Set expiration (1 day, 7 days, 15 days, or 30 days).  
- 🔗 **Instant Shareable Links** - Get a unique link to share files.  
- 🔒 **Secure & Private** - Files are automatically deleted after expiration.  

---

## 🛠 Tech Stack

- **Frontend:** Next.js, Tailwind CSS, TypeScript  
- **Backend:** Next.js API routes  
- **Storage:** Microsoft SharePoint  
- **Database:** MongoDB  

---

## 📦 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/sandeep-rajputt/Dusk-Drop.git
cd Dusk-Drop
```

### **2️⃣ Install Dependencies**
```sh
npm install
# or
yarn install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env.local` file and configure your **Microsoft SharePoint storage, MongoDB, and other necessary secrets**.

Example:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
SHAREPOINT_SITE_URL=your_sharepoint_url
SHAREPOINT_CLIENT_ID=your_client_id
SHAREPOINT_CLIENT_SECRET=your_client_secret
```

### **4️⃣ Run the Development Server**
```sh
npm run dev
# or
yarn dev
```
Now open **http://localhost:3000** in your browser. 🚀

---

## 💻 Contributing

We welcome contributions! Follow these steps:

1. Fork the repo 🍴  
2. Create a new branch (`git checkout -b feature-name`)  
3. Commit your changes (`git commit -m "Added feature"`)  
4. Push to the branch (`git push origin feature-name`)  
5. Open a pull request ✅  

---

## 📜 License

This project is **open-source** under the **MIT License**.

---

## 🔗 Links

- **GitHub Repo:** [DuskDrop](https://github.com/sandeep-rajputt/Dusk-Drop)  
- **Issues & Feature Requests:** [Submit here](https://github.com/sandeep-rajputt/Dusk-Drop/issues)  

---

💡 **DuskDrop - Share Files. No Hassle. No Limits.** 🌙🚀