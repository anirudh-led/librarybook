import BookForm from "../components/BookForm"
import Navbar from "../components/Navbar"

const Create =  () => {
    return (
        <>
            <Navbar name="Create new book" url="admin" urlname="Admin"/>
            <BookForm />
        </>
    )
}

export default Create;