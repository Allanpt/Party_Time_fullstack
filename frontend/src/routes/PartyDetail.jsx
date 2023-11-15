import partyFecth from "../axios/config"

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import UseToast from "../hook/useToast"

import "./PartyDetail.css"

function PartyDetail() {

  const {id} = useParams()
  const navigate = useNavigate()

  const [party, setParty] = useState(null)

  useEffect(() => {
    const loadParty = async () => {
      const res = await partyFecth.get(`/party/${id}`)
      console.log(res.data)
      setParty(res.data)
    }
    loadParty()
  }, [])

  const handleDelete = async () => {
    const res = await partyFecth.delete(`/party/${id}`)

    if(res.status === 200){
      UseToast(res.data.msg)
      navigate("/")
    }
  }

  if(!party) return <p>Carregando...</p>

  return (
    <div id="party-detail">
      <h1>{party.title}</h1>
      <div className="action-container">
        <Link className="edit-btn" to={`/party/edit/${party._id}`}>Editar</Link>
        <button className="delete-btn" onClick={handleDelete}>Excluir</button>
      </div>
      <p>Orçamento: R${party.budget}</p>
      <h3>Serviços Contratados:</h3>
      <div className="services-container">
        {party.services.map((service) => (
          <div className="service" key={service._id}>
            <img src={service.image} alt={service.name} />
            <div className="details">
            <p>{service.name}</p>
            <p>R$: {service.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PartyDetail