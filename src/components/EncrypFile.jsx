import { useState, useEffect } from "react";
import axios from "axios"; // Ensure Axios is imported
import Wrapper from "./Wrapper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { CardResult } from "./CardResult";

const EncryptFile = () => {
  const [file, setFile] = useState(null);
  const [keyLength, setKeyLength] = useState("128");
  const [aesKey, setAesKey] = useState("");
  const [iv, setIv] = useState("");
  const [encryptedFilePath, setEncryptedFilePath] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get("http://110.239.93.223:7879/csrf-token", { withCredentials: true });
        setCsrfToken(response.data.csrf_token);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };

    fetchCsrfToken();
  }, []);

  // Handle file encryption
  const handleEncrypt = async () => {
    if (!file) {
      alert("Pilih file terlebih dahulu.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("key_length", keyLength);

    try {
      // Send the CSRF token in the headers
      const response = await axios.post("http://110.239.93.223:7879/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": csrfToken, // Send CSRF token in the headers
        },
        withCredentials: true, // Ensure cookies are sent
      });

      // Process encryption response
      setAesKey(response.data.key);
      setIv(response.data.iv);
      setEncryptedFilePath(response.data.encrypted_file_path);
      alert("File berhasil dienkripsi.");
    } catch (error) {
      console.error("Error during encryption:", error);
      alert("Terjadi kesalahan saat proses enkripsi.");
    }
  };

  // Handle file download
  const handleDownload = () => {
    if (!encryptedFilePath) {
      alert("Tidak ada file terenkripsi untuk diunduh.");
      return;
    }

    // Make sure the download URL is correct
    const downloadUrl = `http://110.239.93.223:7879/download/${encryptedFilePath}`;
    window.open(downloadUrl, "_blank");
  };

  return (
    <Wrapper>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">
            Enkripsi File
          </CardTitle>
          <CardDescription>
            Encrypt your file
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-2 mb-8">
          <Input
            type="file"
            accept=".pdf,.docx,.xlsx"
            onChange={(e) => setFile(e.target.files[0])}
          />
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
            <Button onClick={handleEncrypt}>
              Encrypt
            </Button>
          </div>
        </CardContent>

        {aesKey && iv && encryptedFilePath && (
          <CardFooter>
            <div className="w-full space-y-2">
              <h3>Encryption result:</h3>
              <CardResult title="Kunci AES:" result={aesKey} />
              <CardResult title="IV:" result={iv} />
              <CardResult title="Encrypted file:" result={encryptedFilePath} />

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

export default EncryptFile;
