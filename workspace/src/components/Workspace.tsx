import React from 'react';
import '../App.css';

interface Workspace {
    name?: string;
}

const handleDrop = (event: any) => {
    event.preventDefault();
    let id = event.dataTransfer.getData("id");
    let original = document.getElementById(id);
    if (original) {
        let clone = original.cloneNode(true);
        event.target.appendChild(clone);
    }
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
