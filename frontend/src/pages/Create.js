import BookForm from "../components/BookForm";
import Navbar from "../components/Navbar";

const Create = () => {
  return (
    <>
      <Navbar
        name="Library"
        setExtra={true}
        urltwo="admin/books"
        urlnametwo="View Books"
        link=""
        url="admin"
        urlname="Admin"
      />
      <BookForm />
    </>
  );
};

export default Create;
