import { Navigate, Route, Routes } from "react-router";
import Home from "./Home";
import Profile from "./Account/Profile";
import Signin from "./Account/Signin";
import Signup from "./Account/Signup";
import Navigation from "./Navigation";
import Search from "./Search";
import Details from "./Books/Details";
import Following from "./Account/Follows/Following";
import Follower from "./Account/Follows/Follower";

export default function SocialNetwork() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:gid/:name?" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:uid" element={<Profile />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/details/:bid" element={<Details />} />
        <Route path="/following/:uid" element={<Following />} />
        <Route path="/followers/:uid" element={<Follower />} />
      </Routes>
    </div>
  );
}
