//* Page section
export const loginSection = document.getElementById('login_section');
export const userPage = document.getElementById('userPage_section');

//* Login from
export const textInput = document.getElementById('name');
export const passInput = document.getElementById('password');
export const submitBtn = document.getElementById('submit-btn');

//* User Page
export const btnLogout = document.getElementById('btn-logout');
export const firstName = document.getElementById('userfirstName');
export const lastName = document.getElementById('userLastName');
export const email = document.getElementById('userEmail');
export const adresse = document.getElementById('userAdresse');
export const phone = document.getElementById('userPhone');
export const attents = document.getElementById('userAttents');
export const auditRatio = document.getElementById('auditRatio');
export const firstSVG = document.getElementById('firstSVG');

//* API URL
export const ApiSignin = "https://zone01normandie.org/api/auth/signin";
export const apiGraphQLUrl = "https://zone01normandie.org/api/graphql-engine/v1/graphql";

//* api info
export let content_type = { "Content-Type": "application/json" };
export let param = {
    method: "POST",
    headers: content_type,
};

//* GraphQL query

export let queryRequest = {
  query: `
  {
    user{
      id
      login
      totalUp
      totalDown
      auditRatio
      firstName
      lastName
      campus
      discordId
      discordLogin
      email
      attrs
      events(where: {event: {path: {_ilike: "/rouen/div-01"}}})  {
        level
       }
      xps {
        event {
          id
          createdAt
          status
          endAt
          parentId
         }
        amount
        path
       }
     }
     transaction(where: {type: {_eq: "xp"} event: {path: {_ilike: "/rouen/div-01"}}}, order_by: {id: asc}) {
      amount
      createdAt
    }
  }
  `,
};