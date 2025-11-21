import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateReport } from "../features/reports/reportsSlice";
import ReportModal from "../components/ReportModal";
import CardItem from "../components/CardItem";

export default function ReportGenerator() {
  const dispatch = useDispatch();
  const { report, trend, history, status, error } = useSelector(
    (state) => state.reports
  );

  const [formValues, setFormValues] = useState({
    limit: 10,
    trend: "hot",
    unit: "day",
    amount: 1,
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleGenerate = () => {
    const days =
      formValues.unit === "month"
        ? parseInt(formValues.amount) * 30
        : parseInt(formValues.amount);

    dispatch(
      generateReport({
        limit: parseInt(formValues.limit),
        order: formValues.trend === "hot" ? "desc" : "asc",
        trend: formValues.trend,
        unit: formValues.unit,
        amount: formValues.amount,
        days,
      })
    );

    setShowModal(false);
  };


  const handleHistoryClick = (entry) => {
    setFormValues(entry);
  };

  return (
    <div className="report-generator-container">
      {/* Left column */}
      <div className="report-left-column">
        <form onSubmit={handleSubmit} className="report-form">
          <h3>Generate Report</h3>
          <div className="report-form-section">
            <label># of cards</label>
            <input
              type="number"
              name="limit"
              value={formValues.limit}
              onChange={handleChange}
            />
          </div>
          <div className="report-form-section">
            <label>Trend</label>
            <div className="report-form-radio-container">
              <div>
                <input
                  type="radio"
                  name="trend"
                  value="hot"
                  checked={formValues.trend === "hot"}
                  onChange={handleChange}
                />{" "}
                Hot
              </div>
              <div>
                <input
                  type="radio"
                  name="trend"
                  value="cold"
                  checked={formValues.trend === "cold"}
                  onChange={handleChange}
                />{" "}
                Cold
              </div>
            </div>
          </div>
          <div className="report-form-section">
            <label>Time Unit</label>
            <div className="report-form-radio-container">
              <div>
                <input
                  type="radio"
                  name="unit"
                  value="day"
                  checked={formValues.unit === "day"}
                  onChange={handleChange}
                />{" "}
                Day
              </div>
              <div>
                <input
                  type="radio"
                  name="unit"
                  value="month"
                  checked={formValues.unit === "month"}
                  onChange={handleChange}
                />{" "}
                Month
              </div>
            </div>
          </div>
          <div className="report-form-section">
            <label>Unit Count</label>
            <input
              type="number"
              name="amount"
              value={formValues.amount}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Submit</button>
        </form>

        <div className="report-history">
          <h3>Recent Reports</h3>
          {history.length === 0 ? (
            <p>No reports yet</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Trend</th>
                  <th>Card Count</th>
                  <th>Unit</th>
                  <th>Unit Count</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, index) => (
                  <tr
                    key={index}
                    onClick={() => handleHistoryClick(entry)}
                    className={entry === formValues ? "selected" : ""}
                  >
                    <td>{index + 1}</td>
                    <td>{entry.trend}</td>
                    <td>{entry.limit}</td>
                    <td>{entry.unit}</td>
                    <td>{entry.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Right column: report results */}
      <div className="report-right-column">
        <h2>Results</h2>
        {status === "loading" && <p>Loading report...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" && report.length > 0 && (
          <div className="report-results">
            {report.map((listing, i) => (
              <CardItem key={i} card={listing} trend={trend} />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <ReportModal
          onCancel={() => setShowModal(false)}
          onGenerate={handleGenerate}
        />
      )}
    </div>
  );
}
