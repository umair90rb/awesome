// export default function(storeApi) {
//     return function(next){
//         return function(action){
//             console.log(action, 'dispatched')
//             next(action);
//         }
//     }
// }

export default store => next => action => {
    console.log(action.type, 'dispatched with payload', action.payload);
    next(action);
}