import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  return (
    <>
      <Link to={"/"}>
        <Button variant="link" className="mb-10"><ArrowLeft /> Back</Button>
      </Link>
      <div className="h-screen flex items-center justify-center">
        <Card className="flex flex-col justify-center max-w-sm w-full">
          <CardHeader>
            <CardTitle>Welcome to EnxryptoBox</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-2">
              <div>
                <Label>Username</Label>
                <Input name="username" id="username" />
              </div>
              <div>
                <Label>Password</Label>
                <Input name="password" />
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

