import React, {useState} from 'react'
import { RiTodoLine } from 'react-icons/ri'
import { motion, AnimatePresence, AnimatedSharedLayout } from 'framer-motion'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'

const SideItem = ({item}) => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    return (
            <ItemDiv
                className="item-div"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onClick={() => navigate(item.url)}
            >
                {item.icon}
                <AnimatePresence>
                    {isOpen && (
                        <motion.span
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {item.name}
                        </motion.span>
                    )}
                </AnimatePresence>
            </ItemDiv>
    )
}

const ItemDiv = styled(motion.div)`
    width: fit-content;
    margin-bottom: 20px;
    font-size: 30px;
    cursor: pointer;
`

export default SideItem
