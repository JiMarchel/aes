import { ScanEye, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <div className="flex flex-col justify-center items-center py-40 gap-4">
        <h1 className="font-bold text-7xl tracking-tighter">Secure Your Data With EncryptoBox</h1>
        <p className="text-xl text-gray-600">Powerful encryption and decryption tools to keep your information safe and private.</p>
        <Link to="/login">
          <Button className="font-medium mt-10">Get Started</Button>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center gap-14 bg-gray-100 flex-grow">
        <h1 className="font-bold text-5xl">Key Features</h1>

        <div className="flex flex-row gap-10">
          <div className="flex flex-col items-center text-center">
            <Shield size={50} />
            <h3 className="text-2xl font-bold">End-to-end Encryption</h3>
            <p className="text-gray-600">Secure your data with encryption algorithms.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Zap size={50} />
            <h3 className="text-2xl font-bold">Fast Processing</h3>
            <p className="text-gray-600">Encrypt and decrypt your files in seconds, not minutes.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <ScanEye size={50} />
            <h3 className="text-2xl font-bold">Secure Process</h3>
            <p className="text-gray-600">We dont collect any data from users.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

