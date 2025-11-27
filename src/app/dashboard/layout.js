import ProtectedRoute from "@/components/ProtectedRoute"
import { AppSidebar } from "@/components/app-sidebar"
import NavBreadcrumb from "@/components/nav-breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar"

export const metadata = {
  title: "Dashboard - Todos App by CoDev Technologies",
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

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <NavBreadcrumb />
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
