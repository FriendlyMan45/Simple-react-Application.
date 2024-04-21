import { createContext ,useState, useEffect} from "react";
import campaignFields from '../components/staticData';
import api from '../service/api';
import { useNavigate } from 'react-router-dom';

const DataContext = createContext({});
export const DataProvider=({children})=>{
    const [campaignAll,setCampaignAll] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [formMode,setFormMode] = useState('create');
    const [loggedStatus, setLoggedStatus] = useState(false);
    const nagivate = useNavigate();
    const [campaign,setCampaign] = useState({
        brandName:'',
        budget:'',
        promotionType:'',
        date:''
    });

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await api.get('/api/CampaignDB/getAll');
                setCampaignAll(response.data);
            }
            catch(err){
                console.log(err);
            }
            finally{
                setIsLoading(false);
            }
        }

        setTimeout(() => { fetchData() }, 2000);
        
    },[]);

    
    const handleChange =(e)=>{
        e.preventDefault();
        setCampaign({...campaign,[e.target.name]:e.target.value})
    }

    const handleSubmit =async (e) =>{
        e.preventDefault();
        if(formMode === 'edit'){
            const response = await api.put(`/api/CampaignDB/edit/${campaign.id}`, campaign);
            if(response.status === 200){
                setCampaignAll(campaignAll.map((camp)=> camp.id === campaign.id ? campaign: camp));
            }
        }
        else{
            const response = await api.post('/api/CampaignDB/post', campaign);
                setCampaignAll([...campaignAll,response.data]);
        }   
        setIsVisible(!isVisible);
        setCampaign({
            brandName:'',
            budget:'',
            promotionType:'',
            date:''
        });
    }

    const handleEdit= (campaign)=>{
        setFormMode('edit');
        setCampaign(campaign);
        setIsVisible(!isVisible);
    }

    const handleCancel = ()=>{
        setCampaign({
            brandName:'',
            budget:'',
            promotionType:'',
            date:''
        });
        setIsVisible(!isVisible);
    }
   
    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/CampaignDB/delete/${id}`);
            setCampaignAll(campaignAll.filter(camp => camp.id !== id));
        } catch (err) {
            console.log(err);
        }
    };
    return(
        <DataContext.Provider value={{
            campaignFields, campaign , setCampaign,formMode, setFormMode, loggedStatus, setLoggedStatus,
            isVisible, setIsVisible, campaignAll, setCampaignAll, isLoading, setIsLoading,
            handleChange, handleEdit, handleDelete, handleCancel, handleSubmit, nagivate
        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;