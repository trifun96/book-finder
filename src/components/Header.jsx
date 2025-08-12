import React from "react";
import { FiBook } from "react-icons/fi";

export default function Header() {
  return (
    <header className="bg-primary text-white py-3 shadow w-100" style={{ position: "relative", left: 0, right: 0 }}>
      <div className="container d-flex align-items-center">
        <FiBook size={32} className="me-2" />
        <h1 className="h4 mb-0">Book Finder</h1>
      </div>
    </header>
  );
}
