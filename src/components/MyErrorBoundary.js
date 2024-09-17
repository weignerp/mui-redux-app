const MyErrorBoundary = ({ error }) => {
  return (
    <div>
      <h1>Error occurred!</h1>
      <p>{error.message}</p>
    </div>
  );
};

export default MyErrorBoundary;
