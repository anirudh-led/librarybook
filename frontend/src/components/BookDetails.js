const BookDetails = ({ book, books }) => {
  
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // 24-hour format, set to true for 12-hour format with AM/PM
    }).format(date);
  };
  
  return (
    <>
      <div>
        <h2 className="font-bold text-3xl text-center my-3">Books</h2>
      </div>
      
      <div className="my-5 flex justify-center items-center">
        <table className="border border-black text-center">
          <tr>
            <th className="border border-black">ID</th>
            <th className="border border-black">Title</th>
            <th className="border border-black">Author</th>
            <th className="border border-black">Description</th>
            <th className="border border-black">Created at</th>
            <th className="border border-black">Updated at</th>
          </tr>
          {books && books.map((book, index) => (
              <tr key={book.id}>
                <td className="border border-black px-2">{index + 1}</td>
                <td className="border border-black px-2">{book.title}</td>
                <td className="border border-black px-2">{book.authour}</td>
                <td className="border border-black px-2">{book.description}</td>
                <td className="border border-black px-2">{formatDateTime(book.createdAt)}</td>
                <td className="border border-black px-2">{formatDateTime(book.updatedAt)}</td>
              </tr>
            ))}
        </table>
      </div>
    </>
  );
};

export default BookDetails;
