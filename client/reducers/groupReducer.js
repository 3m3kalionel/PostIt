import { group, member, message } from '../actions/actionTypes';

/**
 * updates groups in the store depending on the action type
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
const groupReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case group.CREATE_SUCCESS:
      return {
        ...state,
        [action.group.id]: {
          members: [],
          messages: [],
          message: action.message
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
          ],
          message: action.message
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
      return {
        ...state,
        [action.message.groupId]: {
          ...state[action.message.groupId],
          messages: [
            ...state[action.message.groupId].messages,
            action.message
          ]
        }
      };
    case message.LIST_SUCCESS:
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
