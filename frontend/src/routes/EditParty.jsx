import partyFecth from "../axios/config"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import UseToast from "../hook/useToast"


import "./EditParty.css"

function EditParty() {

    const navigate = useNavigate()
    const {id} = useParams()
    const [party, setParty] = useState(null)
    const [services, setServices] = useState([])

    const getServices = async () => {
        try {
            
            const response = await partyFecth.get("/services")
            
            setServices(response.data)
            
            loadParty()
        } catch (error) {
            console.log(error)
        }
      }
    const loadParty = async () => {
        const res = await partyFecth.get(`/party/${id}`)
        setParty(res.data)
    }
      
    const editParty = async(e) => {
        e.preventDefault()

        try {
            const res = await partyFecth.put(`/party/${party._id}`, party)

            if(res.status === 200){
                UseToast(res.data.msg)
                navigate(`/party/${id}`)
            }
            
        } catch (error) {
            UseToast(error.response.data.msg, "error")
        }
    }

    const handleService = (e) => {

        const checked = e.target.checked
        const value = e.target.value
    
        const filteredService = services.filter((service) => service._id === value)
        let partyServices = party.services;

        if (checked) {
            partyServices = [...partyServices, filteredService[0]]
        } else {
            partyServices = partyServices.filter((service) => service._id !== value )
        }
        setParty({...party, services: partyServices})
    }
    useEffect(() => {
        getServices()
        
    }, [])

    if(!party) return <p>Carregando...</p>

    
    
  return (
    <div className="create-edit-party">
        <h2>Editando: {party.title}</h2>
        <p>Ajustes as informações da sua festa</p>
        <form onSubmit={(e) => editParty(e)}>
        <label>
          <span>Nome da Festa:</span>
          <input type="text" placeholder='Nome da festa...' required onChange={(e) => setParty({...party, title: e.target.value})} value={party.title}/>
        </label>
        <label>
          <span>Anfitrião:</span>
          <input type="text" placeholder='Quem está dando a festa?' required onChange={(e) => setParty({...party, author: e.target.value})} value={party.author}/>
        </label>
        <label>
          <span>Descrição:</span>
          <textarea placeholder='Conte mais sobre a festa...' required onChange={(e) => setParty({...party, description: e.target.value})} value={party.description}></textarea>
        </label>
        <label>
          <span>Orçamento:</span>
          <input type="number" placeholder='Qual o valor do investimento?' required onChange={(e) => setParty({...party, budget: e.target.value})} value={party.budget}/>
        </label>
        <label>
          <span>Imagem:</span>
          <input type="text" placeholder="Insira a URL da imagem" required onChange={(e) => setParty({...party, image: e.target.value})} value={party.image}/>
        </label>
        <div className="party-services">
          <h2>Escolha os serviços</h2>
          <div className="services-container">
            {services.length === 0 && <p>Não há serviços cadastrados</p>}
            {services.map((service) => (
                <div className="service" key={service._id}>
                    <h3>{service.name}</h3>
                    <img src={service.image} alt="Imagem do serviço" />
                    <p>Custo de aquisição: R${service.price}</p>
                    <div className="checkbox-container">
                      <input type="checkbox" value={service._id} onChange={(e) => handleService(e)} checked={party.services.find((partyService) => partyService._id === service._id) || ""}/>
                      <p>Marque para solicitar</p>
                    </div>
                </div>
            ))}
        </div>
        </div>
        <input type="submit" value="Editar Festa" className='create-btn' />
      </form>
    </div>
  )
}

export default EditParty