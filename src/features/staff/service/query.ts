export const lookupToRolesQuery = {
  from: 'staffRoles',
  localField: 'roles',
  foreignField: '_id',
  as: 'roles',
  pipeline: [
    {
      $project: { _id: 1, title: 1 },
    },
  ],
};
