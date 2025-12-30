import React from "react";

export default function CardItem({ card, trend }) {
  const trendColor =
    trend === "hot" ? "limegreen" : trend === "cold" ? "red" : "black";
  const trendPrice =
    trend === "hot"
      ? `+ $${Number(parseFloat(card.curr_price) - parseFloat(card.start_price)).toFixed(2)} (${
          card.price_diff_pct
        }%)`
      : trend === "cold" ? `- $${Number(parseFloat(card.start_price) - parseFloat(card.curr_price)).toFixed(2)} (${Math.abs(
          card.price_diff_pct
        )}%)` : null;

  return (
    <div className="card-item">
      <img src={card.image_uri} alt={card.name} />
      <div className="card-item-data">
        <div className="card-item-data-main">
          <span className="card-price">
            ${Number(card.curr_price).toFixed(2)}
          </span>
          {trend === "hot" || trend === "cold" ? (
            <span style={{ color: trendColor }}>{trendPrice}</span>
          ) : (
            <></>
          )}
        </div>
        <span>{card.finish.charAt(0).toUpperCase() + card.finish.slice(1)}</span>
      </div>
    </div>
  );
}
