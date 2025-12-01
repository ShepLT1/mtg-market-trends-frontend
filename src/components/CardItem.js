import React from "react";

export default function CardItem({ card, trend }) {
  const trendColor =
    trend === "hot" ? "limegreen" : trend === "cold" ? "red" : "black";
  const trendPrice =
    trend === "hot"
      ? `+ $${Number(parseFloat(card.curr_price) - parseFloat(card.start_price)).toFixed(2)} (${
          card.price_diff_pct
        }%)`
      : `- $${Number(parseFloat(card.start_price) - parseFloat(card.curr_price)).toFixed(2)} (${Math.abs(
          card.price_diff_pct
        )}%)`;

  return (
    <div className="card-item">
      <img src={card.image_uri} alt={card.name} />
      <div className="card-item-data">
        <span>
          <b>Price:</b> ${Number(card.curr_price).toFixed(2)}
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
