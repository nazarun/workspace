import React from 'react';
import '../App.css';
import utils from "../utils/util";

interface Workspace {
    name?: string;
}

interface Page {
    name?: string;
}


const handleDrop = (event: any) => {
    event.preventDefault();
    let { target, clientX, clientY} = event;
    let id = event.dataTransfer.getData("id");
    let original = document.getElementById(id);

    let pageRect = target.getBoundingClientRect();
    let top = clientY - pageRect.top;
    let left = clientX - pageRect.left;

    if (original) {
        let clone = original.cloneNode(true);
        // @ts-ignore
        clone.style = {
            position : "absolute",
            top : "0px",
            left : "0px"
        }
        // @ts-ignore
        clone.id = utils.getID();

        target.appendChild(clone);
        // @ts-ignore
        clone.style.position = "absolute";
        // @ts-ignore
        clone.style.top = `${top}px`;
        // @ts-ignore
        clone.style.left = `${left}px`;
    }
}

const allowDrop = (event: any) => {
    event.preventDefault();
}

const Page: React.FC<Page> = (props: Page) => {
    return (
        <div className="page"
             onDragOver={allowDrop}
             onDrop={handleDrop}
        >
            Workspace
        </div>
    );
}

const Workspace: React.FC<Workspace> = (props: Workspace) => {
    return (
        <div className='workspace'>
            <Page />
        </div>
    );
}




Workspace.defaultProps = {
    name: 'User',
};

export default Workspace;
