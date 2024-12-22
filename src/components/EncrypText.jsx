import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";
import Wrapper from "./Wrapper";
import { CardResult } from "./CardResult";

const EncryptText = () => {
  const [text, setText] = useState("");
  const [keyLength, setKeyLength] = useState("128");
  const [encryptionResult, setEncryptionResult] = useState({ key: "", iv: "", cipher: "" });
  const [error, setError] = useState("");  // State untuk error
  const [csrfToken, setCsrfToken] = useState("");

  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get("http://110.239.93.223:7821/generate-token");
      setCsrfToken(response.data.csrf_token);
    } catch (err) {
      console.error("Gagal mendapatkan CSRF token", err);
    }
  };

  useState(() => {
    fetchCsrfToken();
  }, []);

  // Fungsi untuk menangani enkripsi
  const handleEncrypt = async () => {
    try {
      // Kirimkan data ke backend Flask melalui request POST
      const response = await axios.post("http://110.239.93.223:7821/encrypt", {
        text: text,
        key_length: parseInt(keyLength),
        csrf_token: csrfToken
      });

      // Menyimpan hasil enkripsi dari respons backend
      setEncryptionResult({
        key: response.data.key,
        iv: response.data.iv,
        cipher: response.data.ciphertext,
      });

      // Menghapus pesan error jika berhasil
      setError("");
      fetchCsrfToken();
    } catch (err) {
      // Menangani error jika terjadi masalah
      setError("Terjadi kesalahan saat melakukan enkripsi.");
      console.error(`${error}`, err);
    }
  };

  return (
    <Wrapper >
      <Card >
        <CardHeader>
          <CardTitle className="text-3xl">
            Encrypt Text
          </CardTitle>
          <CardDescription>Encrypt your text.</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-2 mb-8">
          <div>
            <Label htmlFor="textarea">Text to encrypt :</Label>
            <Textarea
              id="textarea"
              placeholder="Masukkan teks untuk dienkripsi"
              rows="5"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

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

          {/* Menampilkan pesan error jika ada */}
          {error && <p className="text-red-400">{error}</p>}

          <div>
            <Button onClick={handleEncrypt} className="block">
              Encrypt
            </Button>
          </div>

        </CardContent>
        {encryptionResult.key && encryptionResult.iv && encryptionResult.cipher && (
          <CardFooter>
            {/* Menampilkan hasil enkripsi */}
            <div className="w-full space-y-2">
              <CardResult title="Key:" result={encryptionResult.key} />
              <CardResult title="IV:" result={encryptionResult.iv} />
              <CardResult title="Ciphertext:" result={encryptionResult.cipher} />
            </div>
          </CardFooter>
        )}
      </Card>
    </Wrapper>
  );
};

export default EncryptText;
