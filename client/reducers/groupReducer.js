import { group, member, message } from '../actions/actionTypes';

const groupReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case group.CREATE_SUCCESS:
      return {
        ...state,
        [action.group.id]: {
          members: [],
          messages: []
        }
      };
    case member.ADD_SUCCESS:
      return {
        ...state,
        [action.groupId]: {
          ...state[action.groupId],
          members: [
            ...state[action.groupId].members,
            action.member
          ]
        }
      };
    case member.LIST_SUCCESS:
      return {
        ...state,
        [action.groupId]: {
          ...state[action.groupId],
          members: action.list
        }
      };
    case message.CREATE_SUCCESS:
      return { ...state,
        [action.message.groupId]: {
          messages: [...state[action.message.groupId].messages, action.message]
        } };
      // return {
      //   ...state,
      //   [action.groupId]: {
      //     ...state[action.groupId],
      //     messages: [
      //       ...state[action.groupId].messages,
      //       action.message
      //     ]
      //   }
      // };
    case message.LIST_SUCCESS:
      console.log(state, 'reducer', action);
      return {
        ...state,
        [action.groupId]: {
          ...state[action.groupId],
          messages: action.list
        }
      };
    default:
      return state;
  }
};

export default groupReducer;