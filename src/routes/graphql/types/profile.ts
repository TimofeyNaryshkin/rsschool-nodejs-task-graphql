import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { Member, MemberType } from './member.js';
import { GraphQLContext } from '../context.js';

export interface Profile {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  memberType: Member;
  memberTypeId: string;
}

export const ProfileType = new GraphQLObjectType<Profile, GraphQLContext>({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: (profile, _args, { loaders }) => {
        return loaders.memberType.load(profile.memberTypeId);
      },
    },
  }),
});
