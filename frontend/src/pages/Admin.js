import React from "react";
import PieChart from "../components/PieChart";
import BookChart from "../components/BookChart";
import Navbar from "../components/Navbar";

const Admin = () => {
  return (
    <div>
                  <Navbar
                link=""
                name="Admin Library"
                urlname="Add new book"
                url="admin/create"
                setExtra={true}
                urltwo="admin/books"
                urlnametwo="View Books"
            />
      <div className="p-6">
        <div className="flex flex-wrap gap-6 mt-6">
          <div className="flex-1 max-w-full sm:max-w-md">
            <PieChart />
          </div>
          <div className="flex-1 max-w-full sm:max-w-md">
            <BookChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
