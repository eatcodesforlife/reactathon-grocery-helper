import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const GroceryItems = ({items, removeItem, editItem}) => {
    return (
        <div className='grocery-list'>
            {
                items.map(({item, id}) => {

                    return <article key={id} className='grocery-item'>
                        {item}
                        <div className="btn-container">
                            <button className="edit-btn" onClick={() => editItem(id)}>
                                <FaEdit />
                            </button>
                            <button className="delete-btn" onClick={() => removeItem(id)}>
                                <FaTrash />
                            </button>
                        </div>
                    </article>
                })
            }
        </div>
    )
}

export default GroceryItems
