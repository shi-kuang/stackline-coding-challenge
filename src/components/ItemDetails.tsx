import type { RootState } from "../store";
import { useSelector } from "react-redux";
import "../css/ItemDetails.css";

const ItemDetails = () => {
  //grab details data from state
  const details = useSelector((state: RootState) => state.data);

  return (
    <div className="details">
      <img
        src={details.image}
        alt={`${details.title} IMG`}
        style={{ width: "200px", height: "200px" }}
      />
      <div style={{ color: "black", fontWeight: "bold" }}> {details.title}</div>

      <div>{details.subtitle}</div>
      <div className="tags">
        {details.tags.map((tag: string, i: number) => (
          <div key={`${tag}-${i}`} className="tag-details">
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemDetails;
