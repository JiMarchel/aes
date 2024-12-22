import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"

const Wrapper = ({ children }) => {
  return (
    <div className="mx-20 my-10">
      <Link to="/home" >
        <Button variant="link" className="mb-10"><ArrowLeft /> Back</Button>
      </Link>
      {children}
    </div>
  )
}

export default Wrapper
