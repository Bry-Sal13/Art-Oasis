import React from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function LandingPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">ArtOasis</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">Welcome to your artistic community</p>
      </div>
    </div>
  );
}

export default LandingPage;
