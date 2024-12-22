import { useState } from "react";
import axios from "axios";
import Wrapper from "./Wrapper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { CardResult } from "./CardResult";

const DecryptImage = () => {
	const [encryptedImage, setEncryptedImage] = useState(null);
	const [aesKey, setAesKey] = useState("");
	const [iv, setIv] = useState("");
	const [keyLength, setKeyLength] = useState("128");
	const [decryptedFileName, setDecryptedFileName] = useState("");
	const [decryptedImage, setDecryptedImage] = useState(null);

	const handleDecrypt = async () => {
		if (!encryptedImage || !aesKey || !iv) {
			alert("Pastikan semua field telah diisi dengan benar!");
			return;
		}

		const formData = new FormData();
		formData.append("file", encryptedImage);
		formData.append("key", aesKey);
		formData.append("iv", iv);
		formData.append("key_length", keyLength);

		try {
			const response = await axios.post("http://110.239.71.90:7881/decrypt", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			const { decrypted_file_path } = response.data;

			// URL backend untuk mengunduh file
			const downloadURL = `http://110.239.71.90:7881/download/${decrypted_file_path.split("/").pop()}`;

			setDecryptedFileName(decrypted_file_path.split("/").pop());
			setDecryptedImage(downloadURL);
		} catch (error) {
			alert(`Error: ${error.response?.data?.error || error.message}`);
		}
	};

	return (
		<Wrapper >
			<Card>
				<CardHeader>
					<CardTitle className="text-3xl">
						Dekripsi Gambar
					</CardTitle>
					<CardDescription>Decrypt your image.</CardDescription>
				</CardHeader>

				<CardContent className="flex flex-col gap-2 mb-8">

					{/* Input file untuk gambar terenkripsi */}
					<div>
						<Label htmlFor="image">Image to decrypt</Label>
						<Input
							id="image"
							type="file"
							accept=".aes"
							onChange={(e) => setEncryptedImage(e.target.files[0])}
						/>
					</div>

					{/* Input untuk AES Key */}
					<Input
						type="text"
						placeholder="Masukkan Kunci AES"
						value={aesKey}
						onChange={(e) => setAesKey(e.target.value)}
					/>

					{/* Input untuk IV */}
					<Input
						type="text"
						placeholder="Masukkan IV"
						value={iv}
						onChange={(e) => setIv(e.target.value)}
					/>

					{/* Pilihan panjang kunci AES */}
					<div>
						<Select
							onValueChange={setKeyLength}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select an algorithm" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Algorithm</SelectLabel>
									<SelectItem value="128">AES-128</SelectItem>
									<SelectItem value="256">AES-256</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					{/* Tombol proses dekripsi */}
					<div>
						<Button onClick={handleDecrypt}>
							Encrypt
						</Button>
					</div>
				</CardContent>

				{/* Hasil dekripsi */}
				<CardFooter>
					{decryptedImage && decryptedFileName && (
						<div className="w-full space-y-2">
							<h3>Decrypt Result</h3>
							<CardResult title="Name File:" result={decryptedFileName} />
							<img src={decryptedImage} alt="Decrypted" />
							{/* Tombol unduh gambar hasil dekripsi */}
							<Button asChild className="cursor-pointer ">
								<a href={decryptedImage} download={decryptedFileName}>
									Download Gambar
								</a>
							</Button>
						</div>
					)}
				</CardFooter>
			</Card>
		</Wrapper>
	);
};

export default DecryptImage;
