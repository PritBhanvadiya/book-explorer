import BookDtl from "../components/BookDtl/BookDtl";
import { useParams } from "react-router-dom";

function BookDetails() {
  const { bookId } = useParams(); 

  return (
    <main role="main">
      <div className="container">
        <section className="full-flx h-screen" aria-label="Book Details">
          <BookDtl bookId={bookId} />
        </section>
      </div>
    </main>
  );
}

export default BookDetails;
