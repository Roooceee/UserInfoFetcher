// Simule un main en async
async function main(){
   createSelectUsers()
}

// Appel de la fonction mail
main()


const body = document.querySelector("body")

// Permet de faire une requete
async function request(url){

   try {
      const req = await fetch(url)
      const response = req.status
      console.log(response)

      if(response == 200){
         const datas = await req.json()
         return datas
      }

   }
   catch(e){
      console.log(e)
      return null
   }
}

let usersData = [];

// Crée un select avec la liste des users
async function createSelectUsers(){

   const users = await request("https://jsonplaceholder.typicode.com/users")
   usersData = users
   let nameUsers = ""

   if(users!=null){
      users.forEach(element => {
         nameUsers += `<option value='${element.id}'>${element.name}</option>`
      });
   
      let formChooseUser = `<form id='chooseUser'>
                                       <h2>User</h2>
                                          <select>
                                          ${nameUsers}
                                          </select>
                                       <input type="submit" value="Show Details">                                 
                                    </form>`
   
      body.insertAdjacentHTML("afterbegin",formChooseUser)
   }

}

// Crée une div avec les infos d'un user en param via une requete a l'API
async function createDivUser(id){
   const user = usersData.find(u => u.id === id); 
   if(user!= undefined){
      
      const nameUser = user.name
      const usernameUser = user.username
      const emailUser = user.email
      const streetUser = user.address.street
      const suiteUser = user.address.suite
      const cityUser = user.address.city
      const phoneUser = user.phone
      const websiteUser = user.website
      const nameCompanyUser = user.company.name
      const catchCompanyUser = user.company.catchPhrase
      const bsCompanyUser = user.company.bs
   
      let articleUser = `<article id='infoUser'>
         <h3>${nameUser}</h3>
         <p>Pseudo : ${usernameUser}</p>
         <p>Mail : <a href="mailto:">${emailUser}</a></p>
         <p>Address <address>${streetUser} ${suiteUser} ${cityUser}</address></p>
         <p>Phone : <a href="tel:+">${phoneUser}</a></p>
         <p>Website : <a href="${websiteUser}">${websiteUser}</a></p>
         <h4>Company :</h4>
         <p>Name : ${nameCompanyUser}</p>
         <p>catchPhrase : ${catchCompanyUser}</p>
         <p>Category : ${bsCompanyUser}</p>
      </article>
      `
   
      return articleUser
   }

   return null

}

// J'ajoute un événement "click" sur l'élément parent qui est le <body>
// Cela permet d'utiliser la délégation d'événement (utile pour gérer des éléments dynamiquement ajoutés)
document.body.addEventListener("click", async (e) => {

   // Empêche le comportement par défaut de l'événement (ex: éviter la soumission d'un formulaire)
   e.preventDefault();

   // Vérifie si l'élément cliqué correspond au sélecteur "#chooseUser > input[type='submit']"
   // Autrement dit, si l'utilisateur a cliqué sur un bouton "submit" qui se trouve dans #chooseUser
   if (e.target.matches("#chooseUser > input[type='submit']")) {

      let div = document.querySelector("#infoUser")
      if(div){
         div.remove()
      }

      const select = document.querySelector("#chooseUser>select")
      const form = document.querySelector("form")
      div = await createDivUser(select.value)
      if(div!=null){
         form.insertAdjacentHTML("afterend",div)
      }

   }

});















