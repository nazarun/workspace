import React from 'react';
import '../App.css';

interface Workspace {
    name?: string;
}

const handleDrop = (event: any) => {
    console.log('handleDrop ', event )
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}

const allowDrop = (event: any) => {
    event.preventDefault();
}

const Workspace: React.FC<Workspace> = (props: Workspace) => (
    <div className='workspace'>
        <div className="page"
            onDragOver={allowDrop}
            onDrop={handleDrop}
        >
            Workspace
        </div>
    </div>
);

Workspace.defaultProps = {
    name: 'User',
};

export default Workspace;
