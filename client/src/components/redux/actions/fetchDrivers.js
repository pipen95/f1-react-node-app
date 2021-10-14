import NEW_VOTE from '../types/newVote';
export const addVote = i => {
  return {
    type: NEW_VOTE,
    i
  };
};
