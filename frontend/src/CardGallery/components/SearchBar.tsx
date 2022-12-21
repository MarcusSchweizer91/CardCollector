import {ChangeEvent} from "react";
import "./css/SearchBar.css"
export type SearchBarProps ={
    handleSearchText: (searchText:string) => void
}

export default function SearchBar(props: SearchBarProps){

    function handleSearchTextChange (event: ChangeEvent<HTMLInputElement>){
        props.handleSearchText(event.target.value)
    }

    return(
        <div>
            <input className={"search-input"} type={"text"} placeholder={"Search..."} onChange={handleSearchTextChange}/>
        </div>
    )
}