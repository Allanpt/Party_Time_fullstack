import partyFecth from "../axios/config"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import UseToast from "../hook/useToast"


import "./CreateParty.css"


function CreateParty() {

  const [services, setServices] = useState([])

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState(0)
  const [image, setImage] = useState("")
  const [partyService, setPartyService] = useState([])

  const navigate = useNavigate()

  const getServices = async () => {
    try {
        
        const response = await partyFecth.get("/services")

        setServices(response.data)
        

    } catch (error) {
        console.log(error)
    }
  }
//Add or Remove service
  const handleService = (e) => {
    const checked = e.target.checked
    const value = e.target.value

    const filteredService = services.filter((service) => service._id === value)

    if (checked) {
      setPartyService((services) => [...services, filteredService[0]])
    } else {
      setPartyService((services) => services.filter((service) => service._id !== value ))
    }

  }

// Create party
  const createParty = async (e) => {
    e.preventDefault()

    try {
      const party = {
        title,
        author,
        description,
        budget,
        image,
        services: partyService
      }
      const res = await partyFecth.post("/party", party)
  
      if(res.status == 201){
        UseToast(res.data.msg)
        navigate("/")
      }
    } catch (error) {
      UseToast(error.response.data.msg, "error")
    }
  }

  useEffect(() => {
      getServices()
  }, [])


  if(!services) return <p>Carregando serviços...</p>


  return (
    <div className='create-edit-party'>
      <h2>Crie sua próxima festa</h2>
      <p>Defina o seu orçamento e escolha os serviços</p>
      <form onSubmit={(e) => createParty(e)}>
        <label>
          <span>Nome da Festa:</span>
          <input type="text" placeholder='Nome da festa...' required onChange={(e) => setTitle(e.target.value)} value={title}/>
        </label>
        <label>
          <span>Anfitrião:</span>
          <input type="text" placeholder='Quem está dando a festa?' required onChange={(e) => setAuthor(e.target.value)} value={author}/>
        </label>
        <label>
          <span>Descrição:</span>
          <textarea placeholder='Conte mais sobre a festa...' required onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
        </label>
        <label>
          <span>Orçamento:</span>
          <input type="number" placeholder='Qual o valor do investimento?' required onChange={(e) => setBudget(e.target.value)} value={budget}/>
        </label>
        <label>
          <span>Imagem:</span>
          <input type="text" placeholder="Insira a URL da imagem" required onChange={(e) => setImage(e.target.value)} value={image}/>
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
                      <input type="checkbox" value={service._id} onChange={(e) => handleService(e)}/>
                      <p>Marque para solicitar</p>
                    </div>
                </div>
            ))}
        </div>
        </div>
        <input type="submit" value="Criar Festa" className='create-btn' />
      </form>
      
    </div>
  )
}

export default CreateParty