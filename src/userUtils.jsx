

import { Hanko } from "@teamhanko/hanko-elements";
import { redirect } from "react-router-dom";

const hankoApi = "https://6a2c061a-8cdd-4297-af87-11afe6acdd0a.hanko.io";
const hanko = new Hanko(hankoApi);

export async function getUserData(setUserExists) {
  try {
    let userExists = false;

    
    const currentUser = hanko.user.getCurrent();

    if (currentUser !== null) {
      
      userExists = true;
      const { id, email } = await currentUser;
      
    } else {
      
          
      return <redirect to="/hanko-auth" />;
    }

    setUserExists(userExists); 
    return userExists; 
  } catch (error) {
    
  }
}


