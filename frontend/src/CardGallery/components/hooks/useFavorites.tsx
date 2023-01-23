import axios from "axios";
import {useEffect, useState} from "react";
import {FavoriteCard} from "../../models/FavoriteCard";




export default function useFavorites() {

    const [favorites, setFavorites] = useState<FavoriteCard[]>([])

    useEffect(() => {
        getFavoriteCards()
    }, [])


    function getFavoriteCards(): Promise<string[]> {
        return axios.get("/api/users/favorites").then((response) => {
            setFavorites(response.data)
            return response.data
        })
            .catch((e) => {
                console.error(e)
                return Promise.reject(e)
            })
    }

    const isCardInFavorites = (cardId: string) => {
        return favorites.map((card) => card.id).includes(cardId)
    }

    async function removeCardFromFavorites(cardId: string) {
        try {
            const response = await axios.delete(`/api/users/favorites/${cardId}`)
            console.log(response)
            setFavorites(prevState => {
                return prevState.filter(card => card.id !== cardId)
            })
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    function addCardToFavorites(id: string, favorites: FavoriteCard[]) {
        try {

            axios.put(`/api/users/favorites/${id}`)
                .then(() => {
                        axios.get(`/api/cards/details/${id}`)
                            .then((detailCardResponse) => {
                                console.log(detailCardResponse)
                                console.log(favorites)
                                const newFavorites: FavoriteCard[] = [...favorites]
                                newFavorites.push(detailCardResponse.data)
                                setFavorites(newFavorites)
                            })

                    }
                )


        } catch (error) {
            console.log(error)
            throw error
        }
    }


    return {favorites,getFavoriteCards, isCardInFavorites, removeCardFromFavorites, addCardToFavorites}
}