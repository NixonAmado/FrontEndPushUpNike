export {PeticionesManagement}
const URL = "http://localhost:5174/API"
const headers = new Headers ({'Content-Type': 'application/json'})

function configurarAccion(accion,data="")
{
    return{
        method: `${accion}`,
        headers: headers,
        body: JSON.stringify(data)
    }
}

class PeticionesManagement{
    async GetDatos(address){
    try {
        let data = await( await fetch(`${URL}/${address}`)).json();
        return data ;
        
    } catch (error) {
       console.error("Error en la petición de empleados", error) 
      }
    }

        async PostDatos(data,address){
            let response = await(await fetch(`${URL}/${address}`, configurarAccion("POST",data)));
            return response;
        }  

    async PutDatos(data,address,id){
        try{
            await fetch(`${URL}/${address}/${id}`, configurarAccion("PUT",data))
        
        } catch (error) {
            console.log("error" + error)
        }
            
    }

    async DeleteDatos(tr,id,address){
        try {
            let data = Object.fromEntries( new FormData(tr.target))
            let config = {
                method: 'DELETE',
                headers: headers,
                body: JSON.stringify(data)
            };
            await fetch(`${URL}/${address}/${id}`, config)
        } catch (error) {
            
        }
    }
}