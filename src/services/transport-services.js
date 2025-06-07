// React Import
import React from 'react';
// Utils Import
import {statusAnswers} from '../utils/utils';

export function GetAllTransports(setData){
    const data = localStorage.getItem("signed-user");
    const jsonData = JSON.parse(data);
    const token = jsonData ? jsonData.token : "notFound";
    return fetch("/api/transportmethods", {
        method: "GET",
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

export function DeleteTransport({setData,id}){
    const data = localStorage.getItem("signed-user");
    const jsonData = JSON.parse(data);
    const token = jsonData ? jsonData.token : "notFound";
    return fetch(`/api/transportmethods/delete/${id}`, {
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

export function DeleteTransportCascade({setData,id}){
    const data = localStorage.getItem("signed-user");
    const jsonData = JSON.parse(data);
    const token = jsonData ? jsonData.token : "notFound";
    return fetch(`/api/transportmethods/delete/cascade/${id}`, {
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

export function DeleteTransportButKeepAnswers({setData,id}){
    const data = localStorage.getItem("signed-user");
    const jsonData = JSON.parse(data);
    const token = jsonData ? jsonData.token : "notFound";
    return fetch(`/api/transportmethods/delete/keep-answers/${id}`, {
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
export function SetTransport({ setData, transportRegisterDTO }) {

    const data = localStorage.getItem("signed-user");
    const jsonData = JSON.parse(data);
    const token = jsonData ? jsonData.token : "notFound";

    return fetch(`/api/transportmethods/create`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transportRegisterDTO) //
    })
        .then((res) => res.json()) //
        .then((data) => {
            setData(data);
        })
        .catch((e) => {
            console.error("Error setting answer:", e);
        });
}