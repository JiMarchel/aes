import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Wrapper from "./Wrapper";
import { CardResult } from "./CardResult";

const BACKEND_URL = "http://110.239.71.90:7983";

const DecryptFile = () => {
	const [file, setFile] = useState(null);
	const [aesKey, setAesKey] = useState("");
	const [iv, setIv] = useState("");
	const [keyLength, setKeyLength] = useState("128");
	const [decryptedFilePath, setDecryptedFilePath] = useState("");
	const [decryptionType, setDecryptionType] = useState("decrypt"); // "decrypt", "upload", or "decryptxl"

	const handleDecryptPDF = async () => {
		if (!file || !aesKey || !iv || !keyLength) {
			alert("Harap lengkapi semua input.");
			return;
		}

		const formData = new FormData();
		formData.append("encrypted_file", file);
		formData.append("key", aesKey);
		formData.append("iv", iv);
		formData.append("key_length", keyLength);

		try {
			const response = await axios.post(`${BACKEND_URL}/decrypt`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setDecryptedFilePath(response.data.decrypted_file_path);
			alert("File PDF berhasil didekripsi!");
		} catch (error) {
			console.error("Error:", error.response?.data || error.message);
			alert("Terjadi kesalahan saat mendekripsi file PDF.");
		}
	};

	const handleDecryptDOCX = async () => {
		if (!file || !aesKey || !iv || !keyLength) {
			alert("Harap lengkapi semua input.");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);
		formData.append("key", aesKey);
		formData.append("iv", iv);
		formData.append("key_length", keyLength);

		try {
			const response = await axios.post(`${BACKEND_URL}/upload`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setDecryptedFilePath(response.data.decrypted_file_path);
			alert("File DOCX berhasil didekripsi!");
		} catch (error) {
			console.error("Error:", error.response?.data || error.message);
			alert("Terjadi kesalahan saat mengunggah dan mendekripsi file DOCX.");
		}
	};

	const handleDecryptExcel = async () => {
		if (!file || !aesKey || !iv || !keyLength) {
			alert("Harap lengkapi semua input.");
			return;
		}

		const formData = new FormData();
		formData.append("encrypted_file", file);
		formData.append("key", aesKey);
		formData.append("iv", iv);
		formData.append("key_length", keyLength);

		try {
			const response = await axios.post(`${BACKEND_URL}/decryptxl`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setDecryptedFilePath(response.data.decrypted_file_path);
			alert("File Excel berhasil didekripsi!");
		} catch (error) {
			console.error("Error:", error.response?.data || error.message);
			alert("Terjadi kesalahan saat mendekripsi file Excel.");
		}
	};

	const handleDownload = async () => {
		if (!decryptedFilePath) {
			alert("Tidak ada file untuk diunduh.");
			return;
		}
		try {
			const response = await axios.get(`${BACKEND_URL}/download`, {
				params: { file_path: decryptedFilePath },
				responseType: "blob",
			});
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", decryptedFilePath.split('/').pop());
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (error) {
			console.error("Error:", error.response?.data || error.message);
			alert("Gagal mengunduh file.");
		}
	};

	return (
		<Wrapper>
			<Card >
				<CardHeader>
					<CardTitle className="text-3xl">
						Decrypt File
					</CardTitle>
					<CardDescription>
						Decrypt your file
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-2 mb-8">

					<div>
						<Select
							onValueChange={setDecryptionType}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select file type" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>File type</SelectLabel>
									<SelectItem value="decrypt">Decrypt file PDF</SelectItem>
									<SelectItem value="upload">Decrypt file DOCX</SelectItem>
									<SelectItem value="decryptxl">Decrypt file Excel</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<Input
						type="file"
						accept={decryptionType === "decrypt" ? ".aes" : ".aes"}
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<Input
						type="text"
						placeholder="Masukkan Kunci AES"
						value={aesKey}
						onChange={(e) => setAesKey(e.target.value)}
					/>
					<Input
						type="text"
						placeholder="Masukkan IV"
						value={iv}
						onChange={(e) => setIv(e.target.value)}
					/>

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

					<div>
						<Button
							onClick={
								decryptionType === "decrypt"
									? handleDecryptPDF
									: decryptionType === "upload"
										? handleDecryptDOCX
										: handleDecryptExcel
							}
						>
							{decryptionType === "decrypt"
								? "Dekripsi PDF"
								: decryptionType === "upload"
									? "Dekripsi DOCX"
									: "Dekripsi Excel"}
						</Button>
					</div>
				</CardContent>

				{decryptedFilePath && (
					<CardFooter>
						<div className="w-full space-y-2">
							<h3>Decryption result:</h3>
							<CardResult title="File:" result={decryptedFilePath} />
							<Button onClick={handleDownload}>
								Download File
							</Button>
						</div>
					</CardFooter>
				)}
			</Card>
		</Wrapper>
	);
};

export default DecryptFile;
