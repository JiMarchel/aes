import { Copy } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { copyToClipBoard } from "@/lib/utils"

export const CardResult = (props) => {
	return (
		<Card className="flex justify-between">
			<CardHeader>
				<CardTitle>{props.title}</CardTitle>
				{props.result && <CardDescription>{props.result}</CardDescription>}
			</CardHeader>
			<CardFooter>
				<Button variant="icon" onClick={() => copyToClipBoard(props.result)}><Copy /></Button>
			</CardFooter>
		</Card>

	)
}
