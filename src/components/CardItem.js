import React from "react";

export default function CardItem({ card, trend }) {
  const trendColor =
    trend === "hot" ? "limegreen" : trend === "cold" ? "red" : "black";
  const trendPrice =
    trend === "hot"
      ? `+ $${card.price_diff.toFixed(2)}`
      : `- $${Math.abs(card.price_diff.toFixed(2))}`

  return (
    <div className="card-item">
      <img src={card.image_uri} alt={card.name} />
      <div className="card-item-data">
        <span>
          <b>Price:</b> ${card.curr_price}
        </span>
        <span>
          <b>Diff:</b>{" "}
          <span style={{ color: trendColor }}>
            {trendPrice}
          </span>
        </span>
        <span>
          <b>CN:</b> {card.collector_num}
        </span>
        <span>
          <b>Finish:</b> {card.finish}
        </span>
      </div>
    </div>
  );
}
