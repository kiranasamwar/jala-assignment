import { useEffect, useState } from 'react';
import './App.css';
import { EmployeeData } from './EmployeeData';
function App() {
  const [data, setData] = useState([]);
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [age, setAge] = useState(0)
  const [id, setId] = useState(0)
  const [isUpdate, setIsUpdate] = useState(false)




  useEffect(() => {
    setData(EmployeeData)
  }, [])

  const handleEdit = (id) => {
    const dt = data.filter(item => item.id === id);
    if (dt !== undefined) {
      setIsUpdate(true)
      setId(id)
      setfirstName(dt[0].firstName)
      setlastName(dt[0].lastName)
      setAge(dt[0].age)

    }
  }
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm('Are you sure you want to delete this employee')) {
        const dt = data.filter(item => item.id !== id)
        setData(dt);
      }
    }
  }
  const handleSave = (e) => {
    let error = '';

    if (firstName === '')
      error += 'First Name is required, ';

    if (lastName === '')
      error += 'Last Name is required, ';

    if (age <= 0)
      error += 'Age is required ';

    if (error === '') {
      e.preventDefault();
      const dt = [...data]
      const newObject = {
        id: EmployeeData.length + 1,
        firstName: firstName,
        lastName: lastName,
        age: age,
      }
      dt.push(newObject);
      setData(dt);
    }
    else {
      alert(error);
    }
  }
  const handleUpdate = () => {
    const index = data.map((item) => {
      return (
        item.id
      )
    }).indexOf(id)
    const dt = [...data]
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;
    setData(dt);
    handleClear()

  }

  const handleClear = () => {
    setId(0)
    setfirstName('')
    setlastName('')
    setAge('')
    setIsUpdate(false)
  }


  return (
    <div className="App">
      <div className='input-label-main-container'>
        <div>
          <label className='label-container'>FirstName
            <input type='text' className='form-control input' placeholder='Enter First Name' onChange={(e) => setfirstName(e.target.value)} value={firstName} />
          </label>
        </div>
        <div>
          <label className='label-container'>LastName
            <input type='text' className='form-control input' placeholder='Enter Last Name' onChange={(e) => setlastName(e.target.value)} value={lastName} />
          </label>
        </div>
        <div>
          <label className='label-container'>Age
            <input type='text' className='form-control input' placeholder='Enter Age' onChange={(e) => setAge(e.target.value)} value={age} />
          </label>
        </div>
        <div className='buttons-container'>
          {
            !isUpdate ?
              <button className='btn btn-primary' onClick={(e) => handleSave(e)}>Save</button>
              :
              <button className='btn btn-primary' onClick={() => handleUpdate()}>UpDate</button>
          }
          <button className='btn btn-danger' onClick={() => handleClear()}>Clear</button>
        </div>
      </div>
      <table className='table table-hover table'>
        <thead>
          <tr>
            <td>Sr.No</td>
            <td>ID</td>
            <td>FirstName</td>
            <td>LastName</td>
            <td>Age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>
                  <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;
                  <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            )
          })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
