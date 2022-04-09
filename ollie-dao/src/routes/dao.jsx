import { useParams } from "react-router-dom";
import { getDao } from "../data";

export default function Dao() {
  let params = useParams();
  let dao = getDao(parseInt(params.daoId, 10));
  return (
    <main style={{ padding: "1rem" }}>
      <h2>Funds: {dao.funds}</h2>
      <p>
        {dao.name}: {dao.members}
      </p>
      <p>Created: {dao.created}</p>
    </main>
  );
}
