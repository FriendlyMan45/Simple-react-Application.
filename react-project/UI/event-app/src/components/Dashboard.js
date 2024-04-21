import Card from "./card";
import style from '../componentsStyle/dashborad.module.css';
import Form from "./form";
import { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";
import Search from "./search";



function DashBoard(){

    const [search,setSearch]= useState('');
    const {isVisible, isLoading, setLoggedStatus,campaignAll, nagivate} = useContext(DataContext);
    useEffect(()=>{
        if (!sessionStorage.getItem('isLoggedIn')) {
            nagivate('/');
        }
        setLoggedStatus(true);
    },[setLoggedStatus, nagivate])
    
    return(
    <>
        <div className={isVisible? style.overlay: ""}>
            <div className={isVisible? style.dialog: ""}>
                    {isVisible && <Form  /> }
            </div>
        </div>
        <Search search={search} setSearch={setSearch}/>
        {isLoading && <h3>Campaign Loading</h3>}
        {!isLoading && campaignAll.length===0? <h2>No campaigns avaiable</h2>:
        <Card campaigns={campaignAll.filter(campaign => campaign.brandName.toLowerCase().includes(search.toLowerCase()))} />}
    </>
    );
}


export default DashBoard;