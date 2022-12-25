import {CardToExchange} from "../../models/CardToExchange";
import {ChangeEvent, FormEvent, useState} from "react";
import {Button, Card, TextField} from "@mui/material";
import "../css/ExchangeForm.css";

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
            <Card variant={"outlined"} sx={{my:'2rem', mx:'5rem'}}>
                <form onSubmit={handleSubmit}>
                    <div className={"input-field"}>
                        <TextField
                            type={"text"}
                            value={exchangeCard.name}
                            onChange={handleChange}
                            name={"name"}
                            id="outlined-required"
                            label="Name"
                            size="small"
                            fullWidth
                        />
                    </div>
                    <div className={"input-field"}>
                        <TextField
                            type={"text"}
                            value={exchangeCard.description}
                            onChange={handleChange}
                            name={"description"}
                            id="outlined-multiline-flexible"
                            multiline
                            maxRows={5}
                            fullWidth
                            label="Description"
                            size="small"
                        />
                    </div>
                    <div className={"input-field"}>
                        <TextField
                            type={"text"}
                            value={exchangeCard.type}
                            onChange={handleChange}
                            name={"type"}
                            id="outlined-required"
                            label="Search or Offer"
                            size="small"
                            fullWidth
                        />


                    </div>
                    <div className={"input-field"}>
                        <TextField
                            type={"text"}
                            value={exchangeCard.price}
                            onChange={handleChange}
                            name={"price"}
                            id="outlined-required"
                            label="Price in EUR"
                            size="small"
                            fullWidth


                        />
                    </div>
                    <div className={"input-field"}>
                        <TextField
                            type={"text"}
                            value={exchangeCard.alternative}
                            onChange={handleChange}
                            name={"alternative"}
                            id="outlined-required"
                            label="Alternative Trade"
                            size="small"
                            fullWidth


                        />
                    </div>
                    <div>
                        <Button sx={{mb: '1rem'}} variant={"outlined"} type={"submit"}>Add</Button>
                    </div>

                </form>
            </Card>
        </div>
    )

}