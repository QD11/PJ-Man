import { createContext, useContext } from 'react';
//import { createConsumer } from '@rails/actioncable'
import dynamic from 'next/dynamic'

const ActionCableConsumer = async () => {
    const { createConsumer } = await import('actioncable')
    const consumer = createConsumer('ws://localhost:3000/cable')
    return consumer
    
}

const ActionCableContext = createContext()

export function ActionCableWrapper({ children }) {

    return (
        <ActionCableContext.Provider value={ActionCableConsumer}>
            {children}
        </ActionCableContext.Provider>
    )
}

export function useActionCableContext() {
    return useContext(ActionCableContext)
}