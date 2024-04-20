import { Route, Routes } from 'react-router-dom';
import DashBoard from './components/Dashboard';
import LoginRegister from './components/Login-Register';
import { DataProvider } from './context/DataContext';
import Nav from './components/Nav';
import CampaignTable from './components/table';

function App() {
  return (
      <>
      <DataProvider>
      <Nav />
        <Routes>
          <Route path='/' Component={LoginRegister} />
          <Route path='/dashboard' Component={DashBoard} />
          <Route path='/table/campaign/:id' Component={CampaignTable} />
        </Routes>
      </DataProvider>
      </>
  );
}

export default App;
