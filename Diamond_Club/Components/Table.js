import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { useContext } from "react";
import { PersonContext } from "../Contexts/PersonProvider";
import Loader from "./Loader";
// TABLE
export default function Table() {
  const { status } = useContext(PersonContext);
  return (
    <>
      {status === "fresh" && null}
      {status === "loading" && <Loader />}
      {status === "ready" && (
        <table className="table">
          <TableHead />
          <TableBody />
        </table>
      )}
    </>
  );
}
