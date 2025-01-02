import './Scrollable.css';

export default function Scrollable({ direction = null, width, height, children }) {
  const touchAction = direction ? { touchAction: 'pan-' + direction } : {};
  return (
    <div className="scroll-container" style={{ width, height, ...touchAction }}>
      {children}
    </div>
  );
}