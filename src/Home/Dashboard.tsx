import Books from "../Books";

export default function Dashboard() {
  return (
    <div>
      <h1>Book Reviews Hub</h1>
      <div id="wd-home-books">
        <h2>Discover the Books </h2>
        <p>
          Explore our community's reviews on classic and contemporary books:
        </p>
        <Books />
      </div>
    </div>
  );
}
