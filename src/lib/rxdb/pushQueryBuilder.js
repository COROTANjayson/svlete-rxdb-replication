// @ts-ignore
export const pushQueryBuilder = pushRow => {
  // console.log('heloo push',pushRow)
  const query = `
  mutation PushHero($row: [HeroInputPushRow]) {
    pushHero(row: $row) {
      id
      name
      color
      deleted
      updatedAt
    }
  }
  `;
  const variables = {
    row: pushRow
  };
  return {
      query:query,
      variables:variables
  };
};