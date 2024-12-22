import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Wrapper from "./Wrapper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { CardResult } from "./CardResult";

const EncryptImage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [keyLength, setKeyLength] = useState("128");
  const [encryptionResult, setEncryptionResult] = useState({ aesKey: "", iv: "", encryptedFilePath: "" });
  const [csrfToken, setCsrfToken] = useState("");

  // Fetch CSRF token from the backend
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get("http://110.239.93.223:7859/csrf-token");
        setCsrfToken(response.data.csrf_token);
      } catch (error) {
        console.error("Error fetching CSRF token", error);
      }
    };
    fetchCsrfToken();
  }, []);

  const handleEncrypt = async () => {
    if (!imageFile) {
      alert("Pilih file gambar terlebih dahulu.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("key_length", keyLength);
    formData.append("csrf_token", csrfToken);

    try {
      const response = await axios.post("http://110.239.93.223:7859/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setEncryptionResult({
        aesKey: response.data.key,
        iv: response.data.iv,
        encryptedFilePath: response.data.encrypted_file_path,
      });

      alert("Enkripsi berhasil!");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat proses enkripsi.");
    }
  };

  // Fungsi untuk mendownload file terenkripsi
  const handleDownload = () => {
    if (!encryptionResult.encryptedFilePath) {
      alert("Tidak ada file terenkripsi untuk diunduh!");
      return;
    }

    const filename = encryptionResult.encryptedFilePath.split("/").pop();
    const downloadUrl = `http://110.239.93.223:7859/download/${filename}`;

    // Membuka file terenkripsi di tab baru
    window.open(downloadUrl, "_blank");
  };

  return (
    <Wrapper>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Enkripsi Gambar</CardTitle>
          <CardDescription>Encrypt your image.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 mb-8">
          <div>
            <Label htmlFor="image">Image to encrypt</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>

          <div>
            <Select onValueChange={setKeyLength}>
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
            <Button onClick={handleEncrypt}>Encrypt</Button>
          </div>
        </CardContent>

        {encryptionResult.aesKey && encryptionResult.iv && encryptionResult.encryptedFilePath && (
          <CardFooter>
            <div className="w-full space-y-2">
              <CardResult title="Key:" result={encryptionResult.aesKey} />
              <CardResult title="IV:" result={encryptionResult.iv} />
              <CardResult title="Encryption:" result={encryptionResult.encryptedFilePath} />

              {encryptionResult.encryptedFilePath && (
                <Button onClick={handleDownload}>Download Encrypted File</Button>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </Wrapper>
  );
};

export default EncryptImage;
