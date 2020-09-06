const INITIAL_STATE = { about : '', terms : '' , phone : '', email : '' , address : ''  ,loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'aboutUs':
            return {
                about       : action.payload.data,
                loader      : action.payload.success
            };
        case 'termsCondition':
            return {
                terms       : action.payload.data,
                loader      : action.payload.success
            };
        case 'siteHelp':
            return {
                phone       : action.payload.data,
                email       : action.payload.email,
                address     : action.payload.address,
                loader      : action.payload.success
            };
        default:
            return state;
    }
};
