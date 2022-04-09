import { Link, Outlet } from "react-router-dom";
import { getDaosData } from "../data";

export default function Explore() {
  let daos = getDaosData();
  console.log(daos);
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        {daos.map((dao) => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/daos/${dao.members}`}
            key={dao.members}
          >
            {dao.name}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
