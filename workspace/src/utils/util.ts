const getID = (): any => {
    return 'id-' + Math.random().toString(36).substr(2, 16);
}

export default {
    getID
}
