const INITIAL_STATE = { about : '', terms : '', data : [], notifications : [], social : null, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'aboutUs':
            return {
                about                   : action.payload.data.about,
                loader                  : action.payload.success
            };
        case 'termsCondition':
            return {
                terms                   : action.payload.data.terms,
                loader                  : action.payload.success
            };
        case 'allQuestions':
            return {
                data                    : action.payload.data,
                loader                  : action.payload.success
            };
        case 'allNotifications':
            return {
                notifications           : action.payload.data,
                loader                  : action.payload.success
            };
        case 'social':
            return {
                social                  : action.payload.data,
            };
        default:
            return state;
    }
};
