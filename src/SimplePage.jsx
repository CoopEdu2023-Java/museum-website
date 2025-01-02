export const SimplePage = ({ id }) => {
  return (
    <div
      className="full page"
      style={{ background: id % 2 === 0 ? 'lightblue' : 'lightgreen' }}
    >
      Page {id}
    </div>
  );
};
