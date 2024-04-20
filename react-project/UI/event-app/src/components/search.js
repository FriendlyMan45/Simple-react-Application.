
function Search({search,setSearch}){
    return(
        <form onSubmit={(e)=> e.preventDefault()}>
            <input 
                type="text"
                placeholder="Search Campaign"
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
            />
        </form>
    );
    
}

export default Search;