import { useEffect, useState } from "react";

const Tips = () => {
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRandomTip();
  }, []);

  const fetchRandomTip = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5010/api/tips/random");
      if (!response.ok) throw new Error("Failed to fetch tip");

      const data = await response.json();
      setTip(data.text);
    } catch (error) {
      console.error("Error fetching tip:", error);
      setError("Could not load tip. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Creative Tip</h3>
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <p>{tip}</p>}
      <button onClick={fetchRandomTip}>Show another tip</button>
    </div>
  );
};

export default Tips;
