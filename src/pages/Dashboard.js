import React, { useEffect } from "react";
import { getDataFromFirebase } from "../helpers/database";

function Dashboard() {


  
  useEffect(() => {
    getDataFromFirebase()
  }, [input])

  return <div>Dashboard</div>;
}

export default Dashboard;
