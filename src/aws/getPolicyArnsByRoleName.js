const { iam } = require("./services");

/*

FIXME: Because iam.listRolePolicies doesn't return the policies that are
attatched to a role, this doesn't work. Somehow we need to find the policies
that are attached to the role. How we do that, I'm not too sure, but it needs
to be done. This currently returns an empty array.

*/

const getPolicyArnsByRoleName = async (name) => {
  const policyNamesSet = new Set();
  const allPoliciesPromise = iam.listPolicies().promise();
  const rolePoliciesPromise = iam
    .listRolePolicies({ RoleName: name })
    .promise();

  // Use await Promise.all rather than do each individually, one per line.
  // This is because it's faster to do requests in parallel rather than serial.
  const [
    { Policies: allPolicies },
    { PolicyNames: policyNames },
  ] = await Promise.all([allPoliciesPromise, rolePoliciesPromise]);

  policyNames.forEach((name) => policyNamesSet.add(name));

  const matchingPolicies = allPolicies.filter(({ PolicyName: name }) =>
    policyNamesSet.has(name)
  );

  const policyArns = matchingPolicies.map(({ Arn: arn }) => arn);

  return policyArns;
};

module.exports = getPolicyArnsByRoleName;
