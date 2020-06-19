import React, { Fragment, useState, useRef } from "react"
import { AutoSizer, Table, Column } from "react-virtualized"
import { TableCell } from "@material-ui/core"
import Draggable, { DraggableEventHandler } from "react-draggable"

const data = [
    { team: "Team Liquid", standing: 1, wins: 2, losses: 0 },
    { team: "Cloud 9", standing: 1, wins: 2, losses: 0 },
    { team: "Evil Geniuses", standing: 1, wins: 2, losses: 0 },
    { team: "Team SoloMid", standing: 4, wins: 1, losses: 1 },
    { team: "Counter Logic Gaming", standing: 4, wins: 1, losses: 1 },
    { team: "FlyQuest", standing: 4, wins: 1, losses: 1 },
    { team: "Golden Guardians", standing: 4, wins: 1, losses: 1 },
    { team: "Immortals", standing: 8, wins: 0, losses: 2 },
    { team: "100 Thieves", standing: 8, wins: 0, losses: 2 },
    { team: "Dignitas", standing: 8, wins: 0, losses: 2 },
];

const MIN_WIDTH = 40

const myCellRenderer = ({cellData}) => {
    return (
        <TableCell
            padding="none"
            variant="body"
        >
            {cellData}
        </TableCell>
    )
}

const Col = (key, label, width) => { return { key: key, label: label, width: width} }

const ResizableTable = () => {

    const [ columns, setColumns ] = useState([
        Col("team", "Team", 200),
        Col("standing", "Standing", 200),
        Col("wins", "Wins", 100),
        Col("losses", "Losses", 100)
    ])
    const [ totalWidth, setTotalWidth ] = useState(600)
    let tableRef = useRef()

    const myHeaderRenderer = ({ label, dataKey }) => {
        return (
            <Fragment key={dataKey}>
                <TableCell padding="none" variant="head" style={{ display: "flex" }} >
                    <div className="content" style={{ flex: "1", fontWeight: "bold" }}>{label}</div>
                    <Draggable
                        axis="x"
                        position={{ x: 0 }}
                        zIndex={9999}
                        onDrag={(e, { deltaX }) => {
                            let widthHasChanged = false
                            setColumns(columns.map((column) => {
                                if (column.label === label){
                                    const newWidth = column.width + deltaX
                                    if (newWidth >= MIN_WIDTH) {
                                        widthHasChanged = true
                                        return { ...column, width: newWidth } 
                                    }
                                } 
                                return column
                            }))
                            if (widthHasChanged)
                                setTotalWidth(totalWidth + deltaX)
                        }}
                    >
                        <span 
                            className="btn"
                            style={{
                                width: "10px",
                                flex: "0",
                                padding: "0 2px",
                                cursor: "col-resize"
                            }}
                        >||</span>
                    </Draggable>
                </TableCell>
            </Fragment> 
        )
    }
    
    return (
        <AutoSizer>
            {({ height, width }) => {
                return <Table
                    ref={tableRef}
                    headerHeight={30}
                    height={300}
                    rowCount={data.length}
                    rowGetter={({index}) => data[index]}
                    rowHeight={30}
                    width={width}
                >
                    { columns.map(({ key, label, width }, i) => {
                        return (<Column 
                            dataKey={key} 
                            label={label} 
                            width={width} 
                            cellRenderer={myCellRenderer} 
                            headerRenderer={myHeaderRenderer}
                            flexGrow={0}
                            flexShrink={0}
                            key={i} />)
                    }) }
                </Table>
            }}
        </AutoSizer>
    )
}

export default ResizableTable