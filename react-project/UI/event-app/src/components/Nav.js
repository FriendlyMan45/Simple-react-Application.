import { useContext } from 'react';
import style from '../componentsStyle/dashborad.module.css';
import DataContext from '../context/DataContext';


function Nav(){
    const {setIsVisible, isVisible, loggedStatus} = useContext(DataContext);
    return(
        <footer className={style.foot}>
            <h3>Logo</h3>
            <div>
                <h1>FASHION_TV</h1>
            </div>
            {loggedStatus &&
            <button onClick={()=> setIsVisible(!isVisible)}>Create Campaign</button>}
            <hr/>
        </footer>
    );
}

export default Nav;