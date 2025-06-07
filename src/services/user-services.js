// React Imports
import React from 'react';
import {enquUser, statusAnswers, statusUser} from '../utils/utils';
// import Types
import {UserLoginDTO, UserRegisterDTO} from "../types/userTypes"

fSignUp.propTypes = {
    userRegisterData : UserRegisterDTO
}
// signup user
export function fSignUp({userRegisterData}){
    return fetch(`/api/users/register`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userRegisterData)
    }).then((res)=>statusUser(res,"signup")).catch(e => {console.log(e);
    })
}

auth.propTypes = {
    userLoginDTO: UserLoginDTO,
}
// authorize user
export function auth({userLoginDTO}){
    // console.log(`${API}`);
    return fetch(`/api/users/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLoginDTO)
    }).then((res)=>statusUser(res)).catch((e)=>enquUser(e,'error'));
}

export function DeleteUser({setData,id}){
    const data = localStorage.getItem("signed-user");
    const jsonData = JSON.parse(data);
    const token = jsonData ? jsonData.token : "notFound";
    return fetch(`/api/users/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`, //
            "Content-Type": "application/json"
        }
    })
        .then((res) => statusAnswers(res))
        .then((data) => setData(data))
        .catch((e) => {
            console.log("Error fetching answers:", e);
        });

}

export function DeleteUserCascade({setData,id}){
    const data = localStorage.getItem("signed-user");
    const jsonData = JSON.parse(data);
    const token = jsonData ? jsonData.token : "notFound";
    return fetch(`http://localhost:8080/api/users/delete/cascade/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`, //
            "Content-Type": "application/json"
        }
    })
        .then((res) => statusAnswers(res))
        .then((data) => setData(data))
        .catch((e) => {
            console.log("Error fetching answers:", e);
        });

}

export function DeleteUserButKeepAnswers({setData,id}){
    const data = localStorage.getItem("signed-user");
    const jsonData = JSON.parse(data);
    const token = jsonData ? jsonData.token : "notFound";
    return fetch(`http://localhost:8080/api/users/delete/keep-answers/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`, //
            "Content-Type": "application/json"
        }
    })
        .then((res) => statusAnswers(res))
        .then((data) => setData(data))
        .catch((e) => {
            console.log("Error fetching answers:", e);
        });

}
