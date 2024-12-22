import { useState } from "react";
import axios from "axios";  // Import axios untuk request HTTP
import Wrapper from "./Wrapper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { CardResult } from "./CardResult";

const DecryptText = () => {
  const [cipherText, setCipherText] = useState("");
  const [aesKey, setAesKey] = useState("");
  const [iv, setIv] = useState("");
  const [keyLength, setKeyLength] = useState("128");
  const [decryptedResult, setDecryptedResult] = useState("");
  const [error, setError] = useState("");

  const handleDecrypt = async () => {
    // Validasi input
    if (!cipherText || !aesKey || !iv) {
      setError("Ciphertext, AES Key, and IV are required.");
      return;
    }
    try {
      const response = await axios.post("http://110.239.93.223:7821/decrypt", {
        key: aesKey,
        iv: iv,
        ciphertext: cipherText,
      });

      setDecryptedResult(response.data.decrypted_text);
      setError(""); // Reset error if successful
    } catch (error) {
      console.error("Error during decryption:", error);
      setError("Decryption failed. Please check the inputs.");
    }
  };

  return (
    <Wrapper >
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">
            Decrypt Text
          </CardTitle>
          <CardDescription>Decrypt your text.</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-2 mb-8">
          <div>
            <Label htmlFor="textarea">Text to decrypt :</Label>
            <Textarea
              id="textarea"
              placeholder="Masukkan ciphertext"
              rows="5"
              value={cipherText}
              onChange={(e) => setCipherText(e.target.value)}
            ></Textarea>
          </div>
          <Input
            type="text"
            placeholder="Masukkan AES Key"
            value={aesKey}
            onChange={(e) => setAesKey(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Masukkan IV (Hex)"
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

          {error && <p className="text-red-400">{error}</p>}

          <div>
            <Button onClick={handleDecrypt}>
              Decrypt
            </Button>
          </div>
        </CardContent>

        {decryptedResult && (
          <CardFooter>
            <div className="w-full">
              <CardResult title="Decrypt text:" result={decryptedResult} />
            </div>
          </CardFooter>
        )}

      </Card>
    </Wrapper>
  );
};

export default DecryptText;
