import { useContext } from 'react';
import style from '../componentsStyle/dashborad.module.css';
import DataContext from '../context/DataContext';

function Form(){

    const {campaignFields, formMode, handleCancel, handleChange, campaign, handleSubmit}=useContext(DataContext);
    return(
           <div>
               <form  onSubmit={handleSubmit} className={style.form}>
                    <h2>{formMode === 'create'? 'Create Campaign' : 'Edit Campaign' }</h2>
                    {campaignFields.map((field)=>
                        (
                        <input 
                            key={field.name}
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={campaign[field.name]}
                            onChange={handleChange}
                        />
                        )
                    )}
                    
                    <div className={style.formbtn}>
                        <button type="submit">submit</button>
                        <button type="button" onClick={()=> handleCancel()}>cancel</button>
                    </div>

                    </form>
           </div>
    );
}

export default Form;