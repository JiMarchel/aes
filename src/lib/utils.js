import { clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function copyToClipBoard(text) {
	navigator.clipboard.writeText(text)
	if (text === "") return;
	toast.success("Succesfully copy to your clipboard")
}
