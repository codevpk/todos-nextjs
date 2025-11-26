import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
  title: "Auth - Todos App by CoDev Technologies",
  description:
    "Manage your daily tasks effortlessly with the Todos App by CoDev Technologies. A simple, fast, and responsive task management tool built using Next.js, designed to help you stay productive and organized anytime, anywhere.",
  keywords: ["todos app", "task manager", "productivity app", "CoDev Technologies", "nextjs app", "todo list", "task tracker", "daily planner", "web app", "codev todos"],
  authors: [{ name: "CoDev Technologies", url: "https://codevpk.com" }],
  openGraph: {
    title: "Todos App by CoDev Technologies",
    description:
      "Organize your daily tasks with ease. Built by CoDev Technologies using Next.js for ultimate speed and performance.",
    url: "https://todos.codevpk.com/",
    siteName: "CoDev Technologies",
    images: [
      {
        url: "https://res.cloudinary.com/codevpk/image/upload/v1762023304/codev/logos/CoDev_Logo_yhyyqb.png", // replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Todos App by CoDev Technologies",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Todos App by CoDev Technologies",
    description:
      "A simple, fast, and organized todo app built by CoDev Technologies using Next.js.",
    creator: "@CoDevPK",
    images: ["https://res.cloudinary.com/codevpk/image/upload/v1762023304/codev/logos/CoDev_Logo_yhyyqb.png"], // replace with actual image URL
  },
};

export default function AuthLayout({ children }) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}
