import { useContext } from "react";
import DataContext from "../context/DataContext";
import style from '../componentsStyle/dashborad.module.css';
import { Link } from "react-router-dom";

function Card({campaigns}){
    const { handleEdit, handleDelete } = useContext(DataContext);
    return(
        <>
        <main className={style.cards}>
            {campaigns.map((campaign)=>(
            <div key={campaign.id} className={style.cardModel}>
            <Link to={`/table/campaign/${campaign.id}`}> 
                        <h2>{campaign.brandName}</h2>
                        <h3>{campaign.promotionType}</h3>
                        <h5>${campaign.budget}</h5> 
                        <h4>{new Date(campaign.date).toLocaleDateString()}</h4>
                    </Link>
             <div className={style.formbtn}>  
                <button onClick={()=>handleEdit(campaign)}>Edit</button>
                <button onClick={()=>handleDelete(campaign.id)}>delete</button>
             </div>     
            </div>

            ))}
        </main>    
        </>
    );
}

export default Card;