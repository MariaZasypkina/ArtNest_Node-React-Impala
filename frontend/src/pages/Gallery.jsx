import { useEffect, useState } from "react";
import ArtworkModal from "../../components/ArtworkModal"; //Import modal
import "../styles/Gallery.css";  // Import custom styles for gallery


const Gallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState({
    artist: "",
    mood: "",
    description: "",
    media: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("asc");
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  // Open modal
  const openModal = (artwork) => {
    console.log("Selected artwork state:", artwork);
    setSelectedArtwork(artwork);
  };

  // Close modal
  const closeModal = () => {
    setSelectedArtwork(null);
  };

  // Fetch gallery
  const fetchGallery = async () => {
    setLoading(true);
    setError(null);

    const validSearch = Object.fromEntries( //filtering emplty lines
      Object.entries(search).filter(([_, value]) => value.trim() !== "")
  );

    try {
      const queryParams = new URLSearchParams({
        page,
        sort,
        order,
        ...validSearch,
      });

      console.log("Sending query:", queryParams.toString());

      const response = await fetch(`http://localhost:5010/api/gallery/search?${queryParams}`);

      if (!response.ok) throw new Error("Failed to fetch artworks");

      const data = await response.json();
      console.log("✅ Fetched artworks:", data.results);


      setArtworks(data.results);
      setTotalPages(Math.ceil(data.totalResults / 6));

    } catch (error) {

      console.error("Error fetching artworks:", error);
      setError("Could not load artworks. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when page, sort, or order changes
  useEffect(() => {
    fetchGallery();
  }, [page, sort, order]);

  // Log selected artwork
  useEffect(() => {
    console.log("Updated selectedArtwork state:", selectedArtwork);
  }, [selectedArtwork]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchGallery();
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sort === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSort(field);
      setOrder("asc");
    }
    fetchGallery();
  };

  return (
    <div>
      <h2>Our Gallery</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by artist"
          value={search.artist}
          className="input-field"  
          onChange={(e) => setSearch({ ...search, artist: e.target.value })}
        />
        <input
          type="text"
          placeholder="Search by mood"
          value={search.mood}
          className="input-field"  
          onChange={(e) => setSearch({ ...search, mood: e.target.value })}
        />
        <input
          type="text"
          placeholder="Search by description"
          value={search.description}
          className="input-field"  
          onChange={(e) =>
            setSearch({ ...search, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Search by media"
          value={search.media}
          className="input-field"  
          onChange={(e) => setSearch({ ...search, media: e.target.value })}
        />
        <br></br>
        <button type="submit"
        className="submit-button"
        >Search</button>
        <button
          type="button"
          className="submit-button"
          onClick={() => {
            setSearch({ artist: "", mood: "", description: "", media: "" });
            fetchGallery();
          }}
        >
          Reset
        </button>
        <br></br><br></br>
      </form>

      {/* Sorting Buttons */}
      <div>
        <button onClick={() => handleSort("artist")}className="submit-button">Sort by Artist</button>
        <button onClick={() => handleSort("mood")}className="submit-button">Sort by Mood</button>
        <button onClick={() => handleSort("description")}className="submit-button">
          Sort by Description
        </button>
        <button onClick={() => handleSort("media")}className="submit-button">Sort by Media</button>
      </div>

      {/* Display artworks */}
{loading ? (
    <p>Loading...</p>
) : error ? (
    <p>{error}</p>
) : (
    <div className="gallery-grid"> {/* Apply grid style */}
        {artworks.map((art) => (
            <div
                key={art._id}
                className="gallery-item"  // Apply item style
                onClick={() => openModal(art)}
            >
                <img 
                    src={art.imageUrl} 
                    alt={art.title} 
                />
                <h3>{art.title}</h3>
                <p><strong>Artist:</strong> {art.artist}</p>
                <p><strong>Mood:</strong> {art.mood}</p>
                <p><strong>Description:</strong> {art.description}</p>
                <p><strong>Media:</strong> {art.media}</p>
            </div>
        ))}
    </div>
)};

      {/* Modal for enlarged artwork */}

      <ArtworkModal artwork={selectedArtwork} onClose={closeModal} />

      {/* Pagination */}
      <div>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          {" "}
          Page {page} of {totalPages}{" "}
        </span>
        <button
          onClick={() =>
            setPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Gallery;
