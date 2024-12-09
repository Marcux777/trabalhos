// ZoomButtons.js
import React from 'react';
import { FaPlus, FaMinus, FaCrosshairs } from 'react-icons/fa';
import './ZoomButtons.css'; // Importe o CSS correspondente

const ZoomButtons = React.memo(({ zoomIn, zoomOut, resetarZoom }) => (
  <div className="zoom-buttons-container">
    <button onClick={zoomIn} aria-label="Aumentar Zoom" className="zoom-button">
      <FaPlus />
    </button>
    <button onClick={zoomOut} aria-label="Reduzir Zoom" className="zoom-button">
      <FaMinus />
    </button>
    <button onClick={resetarZoom} aria-label="Centralizar grafo" className="zoom-button">
      <FaCrosshairs />
    </button>
  </div>
));

export default ZoomButtons;