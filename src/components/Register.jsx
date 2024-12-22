import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react"
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://110.239.71.252:5156/register", {
        email,
        password
      })
      toast.success(response.data.message)
    } catch (error) {
      console.log(`${error}`)
      toast.error(`Email already exist?, ${error}`)
    }
  }

  return (
    <>
      <Link to={"/"}>
        <Button variant="link" className="mb-10"><ArrowLeft /> Back</Button>
      </Link>
      <div className="h-screen flex items-center justify-center">
        <Card className="flex flex-col justify-center max-w-sm w-full">
          <CardHeader>
            <CardTitle>Register Page</CardTitle>
            <CardDescription>Welcome to EnxryptoBox</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <div>
                <Label>Email</Label>
                <Input name="email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label>Password</Label>
                <Input name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Link to={"/login"} className="text-muted-foreground ">Already have an account? Login <span className="underline">here</span></Link>
              <Button type="submit">Register</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

