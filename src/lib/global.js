import { toast } from "sonner";

export const randomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
export const isValidEmail = email => /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(email)
export const toCapitalizeCase = str => str?.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ") || ""

export const showToast = (message, type = "info") => toast[type](message)