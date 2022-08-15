import "./App.scss"
import Form from './components/Form/Form';
import Table from './components/Table/Table';
import Error from "./components/Error/Error";

function App() {

  return (
    <div className="container">
      <Form/>
      <Error/>
      <Table/>
    </div>
  );
}

export default App;