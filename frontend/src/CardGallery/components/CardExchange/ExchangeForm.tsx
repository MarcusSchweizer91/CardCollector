import {CardToExchange} from "../../models/CardToExchange";
import {ChangeEvent, FormEvent, useState} from "react";

type ExchangeFormProps = {

    addEntry: (newEntry: CardToExchange) => void
}

export default function ExchangeForm(props: ExchangeFormProps) {

    const emptyFormPlaceholder: CardToExchange = {

        name: "",
        description: "",
        type: "",
        price: "",
        alternative: ""
    }

    const [exchangeCard, setExchangeCard] = useState<CardToExchange>(emptyFormPlaceholder)

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        props.addEntry(exchangeCard)
        setExchangeCard(emptyFormPlaceholder)
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {

        const changedInput = event.target.name

        setExchangeCard(
            (prevState) => ({
                ...prevState,
                [changedInput]: event.target.value
            })
        )
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <span>Name:</span>
                    <input type={"text"} onChange={handleChange} name={"name"} value={exchangeCard.name}/>
                </div>
                <div>
                    <span>Description:</span>
                    <input type={"text"} onChange={handleChange} name={"description"} value={exchangeCard.description}/>
                </div>
                <div>
                    <span>Search or Offer:</span>
                    <input type={"text"} onChange={handleChange} name={"type"} value={exchangeCard.type}/>
                </div>
                <div>
                    <span>Price:</span>
                    <input type={"text"} onChange={handleChange} name={"price"} value={exchangeCard.price} placeholder={"EUR"}/>
                </div>
                <div>
                    <span>Alternative:</span>
                    <input type={"text"} onChange={handleChange} name={"alternative"} value={exchangeCard.alternative}/>
                </div>
                <div>
                    <button type={"submit"}>Add</button>
                </div>

            </form>
        </div>
    )

}