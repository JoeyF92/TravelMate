import "./Landing.css";
import image from "../../assets/Logo.png";
import { AuthModal } from "../../components";

export default function Landing() {
  return (
    <>
      <div className="body">
        <div className="login-button">
          <AuthModal buttonLabel="Login"/>
        </div>
        <div className="landing-body">
            <div className="content">
                <h1>Welcome to <span className="title">Travel Mate</span></h1>
                <h1>Your Ultimate Travel Companion</h1>
                <p>Embark on a journey of a lifetime with Travel Mate, the app designed to elevate your travel experiences to new heights. Our mission is to make your travel adventures more memorable, organized, and enjoyable. Whether you're a solo explorer or a globetrotting group, Travel Mate offers an array of features tailored to enhance your travel memories.</p>
                <AuthModal buttonLabel="Get started" showPlaneIcon />
            </div>

            <div className="image-container">
                <img src={image} alt="Travel mate logo" />
            </div>
        </div>
      </div>
    </>
  )
}
