import React, {useState} from 'react'
import { RiTodoLine } from 'react-icons/ri'
import { motion, AnimatePresence, AnimatedSharedLayout } from 'framer-motion'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'

const SideItem = ({item}) => {
    const navigate = useNavigate()
    const [onHover, setOnHover] = useState(false)

    return (
            <ItemDiv
                onMouseEnter ={() => setOnHover(true)}
                onMouseLeave ={() => setOnHover(false)}
                whileHover={{scale: 1.1 }}
                whileTap={{scale: 0.9 }}
                onClick={() => navigate(item.url)}
            >
                {item.icon}
                <AnimatePresence initial={false}>
                    {onHover && <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, width: "auto",
                                transition:{ 
                                    duration: 0.3, 
                                    ease: [0.04, 0.62, 0.83, 0.99],
                                }},
                            collapsed: { opacity: 0, width: 0,
                                transition:{ 
                                    duration: 0.3, 
                                    ease: [0.04, 0.82, 0.83, 0.99],
                                    delay: 0.1,
                                }
                            }
                        }}
        
                    >
                        <ItemSpan
                            layout
                            variants={{
                                open: { opacity: 1, width: "auto",
                                transition:{
                                    type: 'tween',
                                    duration: 0.3, 
                                    ease: "easeInOut",
                                    delay: 0.08
                                }},
                                collapsed: { opacity: 0, width: 0,
                                    transition:{ 
                                        duration: 0.2, 
                                        ease: [0.04, 0.62, 0.83, 0.99],
                                    }
                                }
                            }}
                        >{item.name}</ItemSpan>
                    </motion.div>}
                </AnimatePresence>
            </ItemDiv>
    )
}

const ItemSpan = styled(motion.span)`
    font-weight: bold;
    font-weight: 500;
    // margin-bottom: -10px;
`

const ItemDiv = styled(motion.li)`
    list-styled: none;
    display:flex;
    height: 25px;
    align-items: center;
    width: fit-content;
    margin-bottom: 40px;
    font-size: 25px;
    cursor: pointer;
    border-radius: 10px;
    padding: 10px 10px;
    box-shadow: 0 0px 20px -6px rgba(0,0,0,0.7);
    background: rgb(248 248 248 / 100%);
`

export default SideItem
