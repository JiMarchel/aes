import { useNavigate } from "react-router-dom";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { File, Image, LetterText } from "lucide-react";

const Home = () => {
	const navigate = useNavigate();

	return (

		<div className="grid grid-cols-3 px-20 py-72 gap-y-10 h-screen items-center justify-center gap-3 auto-rows-fr">
			<Card
				className="h-full flex flex-col justify-center text-center cursor-pointer"
				onClick={() => navigate("/encrypt-text")}
			>
				<CardHeader>
					<CardTitle className="text-3xl flex justify-center items-center gap-2">Encrypt Text <LetterText size={35} /></CardTitle>
					<CardDescription>
						Encrypts plain text into a secure format to protect its content.
					</CardDescription>
				</CardHeader>
			</Card>

			<Card className="h-full flex flex-col justify-center text-center cursor-pointer" onClick={() => navigate("/encrypt-image")}>
				<CardHeader>
					<CardTitle className="text-3xl flex justify-center items-center gap-2">Encrypt Gambar <Image size={35} /></CardTitle>
					<CardDescription>
						Secures images by converting them into an encrypted format.
					</CardDescription>
				</CardHeader>
			</Card>

			<Card className="h-full flex flex-col justify-center text-center cursor-pointer" onClick={() => navigate("/encrypt-file")}>
				<CardHeader>
					<CardTitle className="text-3xl flex justify-center items-center gap-2">Encrypt File <File size={35} /></CardTitle>
					<CardDescription>
						Encrypts files to safeguard sensitive data from unauthorized access.
					</CardDescription>
				</CardHeader>
			</Card>

			<Card
				className="h-full flex flex-col justify-center text-center cursor-pointer"
				onClick={() => navigate("/decrypt-text")}
			>
				<CardHeader>
					<CardTitle className="text-3xl flex justify-center items-center gap-2">Decrypt Text <LetterText size={35} /></CardTitle>
					<CardDescription>
						Converts encrypted text back to its original readable form.
					</CardDescription>
				</CardHeader>
			</Card>

			<Card className="h-full flex flex-col justify-center text-center cursor-pointer" onClick={() => navigate("/decrypt-image")}>
				<CardHeader>
					<CardTitle className="text-3xl flex justify-center items-center gap-2">Decrypt Gambar <Image size={35} /></CardTitle>
					<CardDescription>
						Restores encrypted images to their original state.
					</CardDescription>
				</CardHeader>
			</Card>

			<Card className="h-full flex flex-col justify-center text-center cursor-pointer" onClick={() => navigate("/decrypt-file")}>
				<CardHeader>
					<CardTitle className="text-3xl flex justify-center items-center gap-2">Decrypt File <File size={35} /></CardTitle>
					<CardDescription>
						Deciphers encrypted files to make them accessible again.
					</CardDescription>
				</CardHeader>
			</Card>
		</div>
	);
};

export default Home
