import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchHottestListings,
  fetchColdestListings,
} from "../features/listings/listingsSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const {
    hottest,
    coldest,
    hottestStatus,
    coldestStatus,
    hottestError,
    coldestError,
  } = useSelector((state) => state.listings);

  useEffect(() => {
    dispatch(fetchHottestListings({ days: 1, limit: 10 }));
    dispatch(fetchColdestListings({ days: 1, limit: 10 }));
  }, [dispatch]);

  if (hottestStatus === "loading" || coldestStatus === "loading")
    return <p>Loading...</p>;
  if (hottestStatus === "failed") return <p>Error: {hottestError}</p>;
  if (coldestStatus === "failed") return <p>Error: {coldestError}</p>;

  return (
    <div className="dashboard">
      <h2>Welcome to MTG Market Trends!</h2>
      <p>The following functionality is available to you...</p>
      <p>
        <b>Dashboard:</b> View today’s hottest and coldest cards <br />
        <b>Report Generator:</b> Retrieve the hottest or coldest cards within a given time period by filling out a simple form with 4 fields<br />
        <b>Card Search:</b> See all of a card's variants and their prices through a simple card name search
      </p>

      <div className="card-lists">
        <div className="hot-cards">
          <h3>Hottest Cards</h3>
          <ol>
            {(hottest || []).map((listing, i) => (
              <li key={"hottest" + i}>
                <span>{listing.name} </span>
                <span style={{ color: "limegreen" }}>
                  + ${listing.price_diff}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="cold-cards">
          <h3>Coldest Cards</h3>
          <ol>
            {(coldest || []).map((listing, i) => (
              <li key={"coldest" + i}>
                <span>{listing.name} </span>
                <span style={{ color: "red" }}>
                  - ${Math.abs(listing.price_diff)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
