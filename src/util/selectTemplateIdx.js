const promptAsync = require("../util/promptAsync");

const selectTemplateIdx = async (templateNames) => {
  console.log(
    "Select a template to base your project off of (defaults to no template)"
  );
  console.log(
    "-----------------------------------------------------------------------"
  );

  templateNames.forEach(([prettyName, rawName], idx) => {
    console.log(`${`[${idx + 1}]`.padStart(5)} ${prettyName} (${rawName})`);
  });

  console.log(
    "-----------------------------------------------------------------------"
  );
  const selectedIdx =
    Number(
      await promptAsync(`Select template 1-${templateNames.length}`, "none")
    ) - 1;

  if (Number.isNaN(selectedIdx) || !templateNames[selectedIdx]) {
    return -1;
  } else {
    return selectedIdx;
  }
};

module.exports = selectTemplateIdx;
