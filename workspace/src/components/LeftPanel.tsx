import React from 'react';
import '../App.css';

interface LeftPanelProps {
    name?: string;
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
            <div id={getID()}
                draggable="true"
                onDragStart={startDrag}>
                {el}
            </div>);
    })
}

const startDrag = (event: any) => {
    event.dataTransfer.setData("text", event.target.id);
    console.log('startDrag ', event )
}

const getID = (): any => {
   return 'id-' + Math.random().toString(36).substr(2, 16);
}



const LeftPanel: React.FC<LeftPanelProps> = (props: LeftPanelProps) => (
    <div className='left-panel'>
        {renderElements()}
    </div>
);

LeftPanel.defaultProps = {
    name: 'User',
};

export default LeftPanel;
