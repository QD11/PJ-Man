import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux"
import Avatar from "react-avatar"
import styled from 'styled-components'

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems
            },
            [destination.droppableId]: {
            ...destColumn,
            items: destItems
            }
    });
    } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                ...column,
                items: copiedItems
                }
        });
    }
};

function DndAssign({setColumns, columns}) {
    // const members = useSelector(state => state.team).users

    // const itemsFromBackend = members.map(member => {
    //     return ({
    //         ...member,
    //         id : member.id.toString()
    //     })
    // })
        
    // const columnsFromBackend = {
    //     ['members']: {
    //         name: "Members",
    //         items: itemsFromBackend
    //     },
    //     ['assigned_members']: {
    //         name: "Assign To",
    //         items: []
    //     },
    // };

    // const [columns, setColumns] = useState(columnsFromBackend);
    // useEffect(() => {
    //     setColumns(columnsFromBackend)
    // }, [])
    

    return (
        <div name="A" style={{ display: "flex", justifyContent: "center", height: "100%" }}>
        <DragDropContext
            onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
            {Object.entries(columns).map(([columnId, column], index) => {
            return (
                <div
                name="column"
                style={{
                    
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                key={columnId}
                >
                <span name="column-name">{column.name}</span>
                <div name="container" style={{ margin: 8 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                        return (
                        <div
                            name="inner-container"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                            background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "lightgrey",
                            padding: 4,
                            width: 290,
                            maxHeight: 300,
                            minHeight: 300,
                            overflowY: "scroll",
                            }}
                        >
                            {column.items.map((item, index) => {
                            return (
                                <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                                >
                                {(provided, snapshot) => {
                                    return (
                                    <div
                                        name="item"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "30px",
                                        backgroundColor: snapshot.isDragging
                                            ? "#263B4A"
                                            : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style
                                        }}
                                    >
                                        <ItemDiv>
                                            <Avatar src={item.profile_picture_url} name={item.first_name + " " + item.last_name} round={true} size={40} textSizeRatio={1} />
                                            {item.first_name + " " + item.last_name}
                                        </ItemDiv>
                                    </div>
                                    );
                                }}
                                </Draggable>
                            );
                            })}
                            {provided.placeholder}
                        </div>
                        );
                    }}
                    </Droppable>
                </div>
                </div>
            );
            })}
        </DragDropContext>
        </div>
    );
}

const ItemDiv = styled.div`
    display: flex;
    justify-content: space-between
`

export default DndAssign;
