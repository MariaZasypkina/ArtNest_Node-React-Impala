import { useEffect, useState } from "react";

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState({
    artist: "",
    mood: "",
    description: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
const [sort, setSort] = useState(""); 
const [order, setOrder] = useState("asc");

  useEffect(() => {
    fetchGallery();
}, [page, sort, order]); // Fetch new data when page, sort, or order changes

const fetchGallery = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        page,
        sort,
        order,
        ...search, //Keep the current search parameters
      });
  
      const response = await fetch(`http://localhost:5010/api/gallery/search?${queryParams.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch artworks");
  
      const data = await response.json();
      setArtworks(data.results);
      setTotalPages(Math.ceil(data.totalResults / 6));
    } catch (error) {
      console.error("Error fetching artworks:", error);
      setError("Could not load artworks. Try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // reset to 1 page on new search
    const queryParams = new URLSearchParams(search);
    fetchGallery(`?${queryParams.toString()}`);
  };

  const handleSort = (field) => {
    if (sort === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSort(field);
      setOrder("asc");
    }
  };

  return (
    <div>
      <h2>Gallery</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by artist"
          value={search.artist}
          onChange={(e) => setSearch({ ...search, artist: e.target.value })}
        />
        <input
          type="text"
          placeholder="Search by mood"
          value={search.mood}
          onChange={(e) => setSearch({ ...search, mood: e.target.value })}
        />
        <input
          type="text"
          placeholder="Search by description"
          value={search.description}
          onChange={(e) =>
            setSearch({ ...search, description: e.target.value })
          }
        />
        <button type="submit">Search</button>
        <button
          type="button"
          onClick={() => {
            setSearch({ artist: "", mood: "", description: "" }); // Clear search fields
            fetchGallery(); // Reload gallery with default view
          }}
        >
          Reset
        </button>
      </form>

           {/* Sorting Buttons */}
           <div>
  <button onClick={() => handleSort("artist")}>
    Sort by Artist (A-Z / Z-A) </button>
  <button onClick={() => handleSort("mood")}>
    Sort by Mood (A-Z / Z-A) </button>
  <button onClick={() => handleSort("description")}>
    Sort by Description (A-Z / Z-A) </button>
</div>


{/* Display artworks */}
{loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
  <div className="gallery-grid">
    {artworks.map((art) => (
      <div key={art._id} className="gallery-item">
        <img src={art.imageUrl} alt={art.title} />
        <h3>{art.title}</h3>
        <p><strong>Artist:</strong> {art.artist}</p>
        <p><strong>Mood:</strong> {art.mood}</p>
        <p><strong>Description:</strong> {art.description}</p>
      </div>
    ))}
  </div>
)}



      {/* Pagination */}
      <div>
        <button 
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
          disabled={page === 1}
        >
          Prev
        </button>
        <span> Page {page} of {totalPages} </span>
        <button 
          onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))} 
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Gallery;
