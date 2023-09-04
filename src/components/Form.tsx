

function Form() {
    return (
        <form>
            <input
                className="w-full px-4 py-2 my-2 text-black bg-white rounded-md focus:outline-none focus:online-none focus:ring-2 focus:ring-blue-600"
                type="text" name="title" id="" autoFocus placeholder="Title" />
            <textarea
                className="w-full px-4 py-2 my-2 text-black bg-white rounded-md focus:outline-none focus:online-none focus:ring-2 focus:ring-blue-600"
                name="content" id="" autoFocus placeholder="Content" >
            </textarea>
            <button
                className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                type="submit">Save</button>
        </form >
    )
}

export default Form