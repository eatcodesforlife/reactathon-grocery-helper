import React, { useEffect } from 'react'

const Alert = ({text, type, removeAlert, items}) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
          removeAlert()  	    
        }, 3000)
        return () => clearTimeout(timeout)
    }, [items, removeAlert])

    return (
        <div>
            <p className={`alert alert-${type}`}>{text}</p>
        </div>
    )
}

export default Alert
