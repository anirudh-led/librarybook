import Navbar from "../components/Navbar";
const Admin = () => {


  return (
    <div className="admin">
      <Navbar link="  " name="Admin Library" urlname="Add new book" url="admin/create" setExtra={true} urltwo="admin/books" urlnametwo="View Books"/>

    </div>
  );
};

export default Admin;
