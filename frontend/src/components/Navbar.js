import { useState } from "react";

const Navbar = (props) => {
  const [extra, setExtra] = useState(false);

  return (
    <nav className="flex px-6 py-6 bg-blue-500 items-center">
      <a
        href={`/${props.link}`}
        className="text-white text-2xl hover:text-gray-200"
      >
        {props.name}
      </a>

      {/* Pushes the button(s) to the far right */}
      <div className="ml-auto flex space-x-4">
        <a
          href={`/${props.url}`}
          className="px-3 py-3 text-white bg-green-400 rounded-lg transition-colors hover:bg-green-600 hover:text-gray-200"
        >
          {props.urlname}
        </a>
        {props.setExtra && (
          <a
            href={`/${props.urltwo}`}
            className="px-3 py-3 text-white bg-green-400 rounded-lg transition-colors hover:bg-green-600 hover:text-gray-200"
          >
            {props.urlnametwo}
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
