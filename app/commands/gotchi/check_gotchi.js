import { GraphQLClient, gql } from 'graphql-request';

const check_gotchi = async wallet => {
    const queryGotchis = gql`{users: users(where:{id:"${wallet.toLowerCase()}"}) {
    id
    gotchisOwned(first:1000, orderBy:withSetsRarityScore, orderDirection:desc, where:{claimedAt_gt:0, baseRarityScore_gt:0}) {
      
    id
    name
    baseRarityScore
    modifiedRarityScore
    numericTraits
    usedSkillPoints
    modifiedNumericTraits
    withSetsNumericTraits
    stakedAmount
    kinship
    lastInteracted
    toNextLevel
    equippedWearables
    kinship
    escrow
    minimumStake
    claimedAt
    withSetsRarityScore
    owner {
      id
    }
    experience
    level
    collateral
    hauntId
    status
    locked
    claimedAt

  }
}
}`;
    const client = new GraphQLClient('https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic');
    const response = await client.request(queryGotchis);
    if(typeof response.users[0] !== "undefined") {
        if(response.users[0].gotchisOwned.length > 0) return true;
        else return false;
    } else return false;
}

export default check_gotchi;