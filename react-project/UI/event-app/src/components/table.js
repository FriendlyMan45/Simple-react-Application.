import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DataContext from '../context/DataContext';

function CampaignTable() {
    const { id } = useParams();
    console.log(id);
    const { campaignAll, setLoggedStatus, nagivate } = useContext(DataContext);
    const [campaign, setCampaign] = useState(null);

    useEffect(() => {
        if (!sessionStorage.getItem('isLoggedIn')) {
            nagivate('/');
        }
            const foundCampaign = campaignAll.find(c => c.id.toString()=== id);
            console.log(foundCampaign);
            setCampaign(foundCampaign);
            setLoggedStatus(false);
        
    }, [id, campaignAll,setLoggedStatus,nagivate]);

    return (
        <table>
            <thead>
                <tr>
                    <th>Brand Name</th>
                    <th>Budget</th>
                    <th>Promotion Type</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {campaign ? (
                    <tr>
                        <td>{campaign.brandName}</td>
                        <td>{campaign.budget}</td>
                        <td>{campaign.promotionType}</td>
                        <td>{new Date(campaign.date).toLocaleDateString()}</td>
                    </tr>
                ) : (
                    <tr>
                        <td colSpan="4">No campaign data available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default CampaignTable;
