import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../features/cards/cardsSlice";
import CardItem from "../components/CardItem";

export default function CardSearch() {
  const dispatch = useDispatch();
  const { cards, status, error } = useSelector((state) => state.cards);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(fetchCards({ name: searchTerm }));
    }
  };

  return (
    <div className="card-search-page">
      <h1>Search Cards</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter card name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {status === "loading" && <p>Loading cards...</p>}
      {status === "failed" && <p style={{ color: "red" }}>{error}</p>}
      {status === "succeeded" && cards.length === 0 && <p>No cards found.</p>}

      <div className="card-list">
        {cards.map((card) => (
          <CardItem key={card.id} card={card} trend="neutral" />
        ))}
      </div>
    </div>
  );
}
