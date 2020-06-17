import React, {useRef, useState} from 'react';
import '../App.css';
import utils from "../utils/util";

interface Workspace {
    name?: string;
}

const ZOOM_STEP = 0.1;



const Workspace: React.FC<Workspace> = (props: Workspace) => {
    const [zoom, setZoom] = useState(1);
    const zoomInPercent = Math.floor(zoom * 100);
    const [cursor, setCursor] = useState('default');

    const workspace = useRef(null);

    const updateZoom = (target: any, type: string) => {
        if (type === '+') {
            setZoom(zoom + ZOOM_STEP)
        }
        if (type === '-') {
            setZoom(zoom - ZOOM_STEP)
        }
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

    const handleKeyDown = (event: any) => {
        let { keyCode, ctrlKey, target } = event;

        // zoom in
        if(keyCode === 187 && ctrlKey) {
            updateZoom(target, '+')
        }

        // zoom out
        if(keyCode === 189 && ctrlKey) {
            updateZoom(target, '-')
        }

        if (keyCode === 16) {
            setCursor('grab');
        }
    }

    const handleKeyUp = (event: any) => {
        let { keyCode, ctrlKey, target } = event;

        if (keyCode === 16) {
            setCursor('default');
        }
    }

    const handleClick = (event: any) => {
        const { target, shiftKey, button } = event;

        if (shiftKey && button === 0) {
            target.addEventListener('mousemove', handleMouseMove);
            target.addEventListener('mouseup', handleMouseUp);

            setCursor('grabbing');
        }
    }

    const handleMouseMove = (event: any) => {
        const { shiftKey, button, movementX, movementY } = event;
        if (shiftKey && button === 0) {
            // @ts-ignore
            workspace.current.scrollTop -= movementY;
            // @ts-ignore
            workspace.current.scrollLeft -= movementX;
        }
    }

    const handleMouseUp = (event: any) => {
        const { target } = event;
        target.removeEventListener('mousemove', handleMouseMove);

        setCursor('default');
    }

    const handleScroll = (event: any) => {
        const { target, ctrlKey, deltaY, clientX, clientY } = event;
        if (ctrlKey) {
            event.preventDefault();
            if (deltaY > 0) {
                updateZoom(target, '+');
                // @ts-ignore
                workspace.current.scrollTop += (clientY - 100)/4
                // @ts-ignore
                workspace.current.scrollLeft += (clientX - 240)/4
            }
            if (deltaY < 0) {
                updateZoom(target, '-');
                // @ts-ignore
                workspace.current.scrollTop -= (clientY - 100)/4
                // @ts-ignore
                workspace.current.scrollLeft -= (clientX - 240)/4
            }
        }
    }



    return (
        <div className='workspace'
             ref={workspace}
             style={{
                 'cursor' : cursor
             }}
             onWheel={handleScroll}
        >
            <div className="page"
                 onDragOver={allowDrop}
                 onDrop={handleDrop}
                 onKeyDown={handleKeyDown}
                 onKeyUp={handleKeyUp}
                // @ts-ignore
                 tabIndex={"0"}
                 style={{
                     'transform' : `scale(${zoom})`,
                     'transformOrigin' : 'left top',
                 }}
                 onMouseDown={handleClick}
            >
                Workspace
            </div>
            <div className='zoom-level'>
                Zoom: {zoomInPercent} %
            </div>
        </div>
    );
}




Workspace.defaultProps = {
    name: 'User',
};

export default Workspace;
