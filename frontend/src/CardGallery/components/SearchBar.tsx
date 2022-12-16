import {ChangeEvent} from "react";

export type SearchBarProps ={
    handleSearchText: (searchText:string) => void
}

export default function SearchBar(props: SearchBarProps){

    function handleSearchTextChange (event: ChangeEvent<HTMLInputElement>){
        props.handleSearchText(event.target.value)
    }

    return(
        <div>
            <input type={"text"} placeholder={"Search for Pokemon..."} onChange={handleSearchTextChange}/>
        </div>
    )
}