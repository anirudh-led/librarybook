const BookDetails = ({ books }) => {
  
  const formatDateTime = (dateString) => {
    console.log('formatDateTime input:', dateString); // Debugging line
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date'; // Check for invalid dates
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date);
  };
  
  const formatDate = (dateString) => {
    console.log('formatDate input:', dateString); // Debugging line
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date'; // Check for invalid dates
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <>
      <div>
        <h2 className="font-bold text-3xl text-center my-3">Books</h2>
      </div>
      
      <div className="my-5 flex justify-center items-center">
        <table className="border border-black text-center">
          <thead>
            <tr>
              <th className="border border-black">ID</th>
              <th className="border border-black">Title</th>
              <th className="border border-black">Author</th>
              <th className="border border-black">Description</th>
              <th className="border border-black">Created at</th>
              <th className="border border-black">Issued on</th>
              <th className="border border-black">Return Date</th>
              <th className="border border-black">Issued to</th>
            </tr>
          </thead>
          <tbody>
            {books && books.length > 0 ? (
              books.map((book, index) => (
                <tr key={book.id}>
                  <td className="border border-black px-2">{index + 1}</td>
                  <td className="border border-black px-2">{book.title}</td>
                  <td className="border border-black px-2">{book.authour}</td>
                  <td className="border border-black px-2">{book.description}</td>
                  <td className="border border-black px-2">{formatDateTime(book.createdAt)}</td>
                  <td className="border border-black px-2">
                    {book.issuedOn ? formatDate(book.issuedOn) : 'N/A'}
                  </td>
                  <td className="border border-black px-2">
                    {book.returnDate ? formatDate(book.returnDate) : 'N/A'}
                  </td>
                  <td className="border border-black px-2">{book.issuedTo || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="border border-black px-2 text-center">No books available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookDetails;
