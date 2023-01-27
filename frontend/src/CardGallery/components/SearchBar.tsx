import {ChangeEvent} from "react";
import "./css/SearchBar.css"
import {TextField} from "@mui/material";


export type SearchBarProps = {
    handleSearchText: (searchText: string) => void
}

export default function SearchBar(props: SearchBarProps) {

    function handleSearchTextChange(event: ChangeEvent<HTMLInputElement>) {
        props.handleSearchText(event.target.value)
    }

    return (
        <section className={"search"}>


                <div>
                    <TextField size={"small"} className={"search-input"} type={"text"} placeholder={"Search..."}
                               onChange={handleSearchTextChange}/>
                </div>



        </section>
    )
}