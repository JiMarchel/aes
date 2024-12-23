import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react"
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://110.239.71.252:5156/login", {
        email,
        password
      })

      navigate("/home")
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
            <CardTitle>Login Page</CardTitle>
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
                <Input name="password" onChange={(e) => setPassword(e.target.value)} type="password" />
              </div>
              <Link to={"/register"} className="text-muted-foreground ">Don't have an account? Register <span className="underline">here</span></Link>
              <Button type="submit">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>

    </>
  );
}

