import React, {useState} from 'react';
import '../App.css';
import utils from "../utils/util";

interface Workspace {
    name?: string;
}

const Workspace: React.FC<Workspace> = (props: Workspace) => {
    const [zoom, setZoom] = useState(1);


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

    const handleKeyDown = (event: any) => {
        let { keyCode, ctrlKey, target } = event;

        // zoom in
        if(keyCode === 187 && ctrlKey) {
            console.log(' zoom in'  )
            target.style.transform = "scale(1.5)";
        }

        // zoom out
        if(keyCode === 189 && ctrlKey) {
            console.log('zoom out '  )
            target.style.transform = "scale(0.5)"
        }
    }



    return (
        <div className='workspace'>
            <div className="page"
                 onDragOver={allowDrop}
                 onDrop={handleDrop}
                 onKeyDown={handleKeyDown}
                // @ts-ignore
                 tabIndex={"0"}
            >
                Workspace
            </div>
        </div>
    );
}




Workspace.defaultProps = {
    name: 'User',
};

export default Workspace;
