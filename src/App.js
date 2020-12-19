import React, { useState, useEffect, useCallback } from 'react'
import GroceryItems from './components/GroceryItems'
import Alert from './components/Alert'
import { v4 as uuidv4 } from 'uuid';



const getLocalStorage = () => {
  let items = localStorage.getItem('items')

  if(items){
    return JSON.parse(localStorage.getItem('items'))
  }
  return []
}

function App() {
  
  const [ name, setName ] = useState('')
  const [ items, setItems ] = useState(getLocalStorage())
  const [ isEditing, setIsEditing ] = useState(false)
  const [ editId, setEditId ] = useState(null)
  const [ alert, setAlert ] = useState({
    show: false, 
    text: '', 
    type: ''
  })

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name){
      showAlert(true,'please add item','danger')
    }else if(name && isEditing){
      setItems(items.map( list => {
        return list.id === editId 
          ? { ...list, item: name}
          : list
      }))
      setIsEditing(false)
      showAlert(true, 'item successfully edited', 'success')
      setName('')
    }else {
      showAlert(true,'item added','success')
      const newItem = { id: uuidv4(), item: name}
      setItems([...items, newItem])
      setName('')
      setEditId(null)
    }
  }

  const showAlert = useCallback((show=false, text='', type='') => {
    setAlert({show,text,type})
  }, [])

  const editItem = (id) => {
    const item = items.find( item => id === item.id )
    setIsEditing(true)
    setEditId(id)
    setName(item.item)
  }

  const removeItem = (id) => {
    const newItems = items.filter( (item) => item.id !== id )
    showAlert(true, 'item removed', 'danger')
    setItems(newItems)
  }
  const removeAllItems = () => {
    showAlert(true,'items cleared','danger')
    setItems([])
  } 

  return (
    <section className='section-center' >
      <div className="grocery-container">
        <form onSubmit={handleSubmit} className='grocery-form'>
          { alert.show && <Alert {...alert} removeAlert={showAlert} items={items}/>}
          <h3>Grocery Helper</h3>
          <div className="form-control">
            <input 
              type="text" 
              placeholder='Add an item. e.g. eggs'
              className="grocery" 
              value={name} 
              onChange={(e)=> setName(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              { isEditing ? 'edit' : 'submit'}
            </button>
          </div>
        </form>
        { items.length > 0 && (
            <div className="grocery-container">
              <GroceryItems items={items} removeItem={removeItem} editItem={editItem}/>
              <button className="clear-btn" onClick={removeAllItems}>Remove Items</button>
            </div>
          )
        }
      </div>
    </section>
  );
}

export default App;
