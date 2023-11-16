import { createContext } from "react";
import { useDiamondClubData } from "../DiamondClub";

//CREATING CONTEXT
const PersonContext = createContext();

function PersonProvider({ children }) {
  // const usersData = [
  //   { "Your Name": "Ram", "Referral or Round Out?": "referral" },
  //   { "Your Name": "Bala", "Referral or Round Out?": "round-out" },
  //   { "Your Name": "Bala", "Referral or Round Out?": "referral" },
  //   { "Your Name": "Bala", "Referral or Round Out?": "round-out" },
  //   { "Your Name": "Bala", "Referral or Round Out?": "round-out" },
  //   { "Your Name": "Bala", "Referral or Round Out?": "round-out" },
  //   { "Your Name": "Ram", "Referral or Round Out?": "referral" },
  //   { "Your Name": "Ram", "Referral or Round Out?": "round-out" },
  //   { "Your Name": "Ram", "Referral or Round Out?": "referral" },
  //   { "Your Name": "Ram", "Referral or Round Out?": "referral" },
  //   { "Your Name": "Ram", "Referral or Round Out?": "referral" },
  //   { "Your Name": "Ram", "Referral or Round Out?": "referral" },
  //   { "Your Name": "Ram", "Referral or Round Out?": "referral" },
  //   { "Your Name": "Ram", "Referral or Round Out?": "referral" },
  //   { "Your Name": "Ram", "Referral or Round Out?": "referral" },
  // ];

  const { usersData, status } = useDiamondClubData();

  // WILL BECOME THE FINAL ARRAY, USED TO RENDER TABLE ROW
  const reducedUsers = [];

  // TEMP OBJECT TO STORE HOW MANY TIMES USER IS FOUND
  // {username: count}
  // {jenna: 5, steve: 1, ...}
  const totalAppearance = {};

  function computeUsers() {
    usersData.forEach((person) => {
      if (!totalAppearance[person["Your Name"]]) {
        totalAppearance[person["Your Name"]] = 1;
      } else {
        totalAppearance[person["Your Name"]]++;
      }
    });

    // CHECKS USER IS ALREADY IN reducedUsers ARRAY
    // RETURNS BOOLEAN
    function isUserFound(value) {
      return reducedUsers.some((person) => person["Your Name"] === value);
    }

    for (const person of usersData) {
      // TRUE = DO NOTHING
      // FALSE = ADD USER TO reducedUsers ARRAY
      if (!isUserFound(person["Your Name"])) reducedUsers.push(person);
    }

    // LOOPING OVER THE KEYS ARRAY
    Object.keys(totalAppearance).map((name) => {
      // TAKING A COPY OF OBJECT IN reducedUsers
      const finalPerson = reducedUsers.find(
        (person) => person["Your Name"] === name
      );

      // WILL BECOME THE ARRAY ALL THE referral or round-out SELECTED BY SINGLE USER
      const userChoice = usersData
        .filter((person) => person["Your Name"] === finalPerson["Your Name"])
        .map((person) => person["Referral or Round Out?"]);

      // ADDING PROPERTIES TO THE CURRENT PERSON OBJECT
      if (name === finalPerson["Your Name"]) {
        finalPerson["Total Appearance"] = totalAppearance[name];
        finalPerson["User Choice"] = userChoice;
      }
    });
  }

  status === "ready" && computeUsers();

  return (
    <PersonContext.Provider value={{ reducedUsers, status }}>
      {children}
    </PersonContext.Provider>
  );
}

export { PersonProvider, PersonContext };
