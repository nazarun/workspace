import React from 'react';
import utils from '../utils/util';
import '../App.css';

interface LeftPanelProps {
    name?: string;
    shapes: object[];
}


const exampleElements: Array<any> = [
    <h1>Heading</h1>,
    <p>Paragraph</p>,
    <button>Button</button>
]

const renderElements = () => {
    console.log('renderElements ', exampleElements )
    return exampleElements.map((el) => {
        return (
            <div id={utils.getID()}
                draggable="true"
                onDragStart={startDrag}>
                {el}
            </div>);
    })
}

const startDrag = (event: any) => {
    event.dataTransfer.setData("id", event.target.id);
}


const LeftPanel: React.FC<LeftPanelProps> = (props: LeftPanelProps) => {
    
    console.log('LeftPanel props::: ', props );
    const { shapes } = props;

    const renderShapes = () => {
        return shapes && shapes.map((el) => {
            // @ts-ignore
            let { background, height, width, title, x, y } = el;
            
            return (
                <div id={utils.getID()}
                     draggable="true"
                     onDragStart={startDrag}>
                    {/*{el}*/}
                    <div 
                        style={{
                            margin: '1px',
                            background: background,
                            height: height,
                            width: width,
                            top: x,
                            left: y
                        }}
                    />
                </div>
            );
        })
    }
    
    return (
        <div className='left-panel'>
            {/*{renderElements()}*/}
            {renderShapes()}
        </div>
    );
} 

LeftPanel.defaultProps = {
    name: 'User',
};

export default LeftPanel;
