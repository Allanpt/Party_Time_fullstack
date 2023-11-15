import partyFecth from "../axios/config"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import "./Home.css"

function Home() {

    const [parties, setParties] = useState(null)

    const getParties = async () => {
        try {
            
            const response = await partyFecth.get("/party")
            console.log(response.data)
            setParties(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getParties()
    }, [])

    if(!parties) return <p>Carregando...</p>

  return (
    <div className="home">
        <h1>Sua festas</h1>
        <div className="parties-container">
            {parties.length === 0 && <p>Não há festas cadastradas</p>}
            {parties.map((party) => (
                <div className="party" key={party._id}>
                    <img src={party.image} alt="Imagem da festa" />
                    <h3>{party.title}</h3>
                    <Link to={`/party/${party._id}`} className="btn-second">Detalhes</Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Home