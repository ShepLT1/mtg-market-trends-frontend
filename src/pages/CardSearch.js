import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../features/cards/cardsSlice";
import { fetchCardNames } from "../features/cards/cardsSearchSlice";
import CardItem from "../components/CardItem";

export default function CardSearch() {
  const dispatch = useDispatch();
  const { cards, status, error } = useSelector((state) => state.cards);
  const { cards: cardNames, status: namesStatus } = useSelector((state) => state.cardsSearch)
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setShowDropdown(false);
      return;
    }

    const timeout = setTimeout(() => {
      dispatch(fetchCardNames({ name: searchTerm }));
      setShowDropdown(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchTerm, dispatch]);

  const handleSelectName = (name) => {
    setSearchTerm(name);
    setShowDropdown(false);
    dispatch(fetchCards({ name }));
  };

  return (
    <div className="card-search-page">
      <h1>Search Cards</h1>

      <div style={{ position: "relative", width: "300px" }}>
        <input
          type="text"
          placeholder="Enter card name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => cardNames.length && setShowDropdown(true)}
        />

        {showDropdown && cardNames.length > 0 && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              border: "1px solid #ccc",
              background: "#fff",
              listStyle: "none",
              margin: 0,
              padding: 0,
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 10,
            }}
          >
            {cardNames.map((card) => (
              <li
                key={card.name}
                onClick={() => handleSelectName(card.name)}
                style={{
                  padding: "0.5rem",
                  cursor: "pointer",
                }}
              >
                {card.name}
              </li>
            ))}
          </ul>
        )}
      </div>

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
