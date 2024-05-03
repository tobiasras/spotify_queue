export const Search = (props) => {

  async function getSearch(e) {
    e.preventDefault()
    const searchTerm = e.target.elements.search_track.value;

    if (!searchTerm)
      return

    const connSearch = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/search/?q=${searchTerm}`, {
      method: "GET"
    });

    const dataSearch = await connSearch.json();
    props.setSearch(dataSearch)
  }

  return (
    <>
      <form onSubmit={(e) => getSearch(e)}>
        <div className="sticky top-0 z-10 w-full" id="searchfield_box">
          <div className="rounded-full bg-neutral-800 px-6 py-3 flex gap-4 items-center">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
            </svg>
            <input type="text" name="search_track"
                   placeholder="Search Track" className="bg-inherit w-full"/>

            <button type="submit"
                    className="text-gray-400 bg-neutral-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-4/12 sm:w-auto px-5 py-2.5 text-center ">Search
            </button>
          </div>

          <div id="search_results" className="hidden w-full bg-zinc-800 h-32 rounded-lg mt-4"></div>
        </div>

      </form>
    </>
  )
}

