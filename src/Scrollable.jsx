import './Scrollable.css';

export default function Scrollable({ width, height, children }) {
  return (
    <div className="scroll-container" style={{ width, height }}>
      {children}
    </div>
  );
}