export default function( { dispatch }) {
    return next => action => {
        // if action dows nor have payload
        // or, the payload does not have a .then property
        // we dont care about it, send it on 
        if(!action.payload || !action.payload.then) {
            return next(action);
        }

        // Make sure the action's promise resolves
        action.payload
            .then(function(response) {
                // create a new actionswith the old type, but
                // replace the promise with the response data
              const newAction =  { ...action, payload: response }
              dispatch(newAction);
            });
    };
}
