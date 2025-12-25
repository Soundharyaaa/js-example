export default function reducer(state, action) {
  const{type,payload}=action

  switch (type) {
    case "newtask":
      return {
        ...state,
        newtask: payload
      };

    case "tasks":
      return {
        ...state,
        tasks:payload
      };

    case "edit":
      

      return {
        ...state,
        edit:payload
      };

    
    default:
      return state;
  }
}