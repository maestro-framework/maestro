const codes = {
  reset: "\033[m",
  bold: "\033[1m",
  faint: "\033[2m",
  italic: "\033[3m",
  underline: "\033[4m",
  black: "\033[30m",
  red: "\033[31m",
  green: "\033[32m",
  yellow: "\033[33m",
  blue: "\033[34m",
  magenta: "\033[35m",
  cyan: "\033[36m",
  white: "\033[37m",
};

const configMsg = `maestro-config: ${codes.italic + codes.blue}maestro config${
  codes.reset
}
    Set up or alter your Maestro configuration files.

    Run ${codes.italic + codes.blue}maestro config${
  codes.reset
} to set the global config values of AWS account number and
    region.

    See manual page ${codes.yellow + codes.bold}maestro-config(1)${
  codes.reset
} for more information.`;

const deployMsg = `maestro-deploy: ${codes.italic + codes.blue}maestro deploy${
  codes.reset
}
    Deploy a full AWS Step Functions workflow with AWS Lambdas.

    Run ${codes.italic + codes.blue}maestro deploy${
  codes.reset
} inside a Maestro project to quickly deploy all the
    project's resources including AWS IAM Roles, AWS Lambdas, and the AWS Step
    Functions state machine.

    See manual page ${codes.yellow + codes.bold}maestro-deploy(1)${
  codes.reset
} for more information.`;

const teardownMsg = `maestro-teardown: ${
  codes.italic + codes.blue
}maestro teardown${codes.reset} [${
  codes.italic + codes.bold + codes.red
}options${codes.reset} ...]
    Teardown an existing Maestro project.

    Run ${codes.italic + codes.blue}maestro teardown${
  codes.reset
} inside a Maestro project to quickly tear down all
    the project's resources including AWS Lambdas, the AWS Step Functions state
    machine, and optionally AWS IAM Roles.

    Options:
      -f, --force
          Do not prompt for confirmation.

      --roles ${codes.italic + codes.bold + codes.red}role1${codes.reset}[,${
  codes.italic + codes.bold + codes.red
}role2${codes.reset}...],
      --roles=${codes.italic + codes.bold + codes.red}role1${codes.reset}[,${
  codes.italic + codes.bold + codes.red
}role2${codes.reset}...]
          Specify the roles to be deleted in addition to the other resources.

    See manual page ${codes.yellow + codes.bold}maestro-teardown(1)${
  codes.reset
} for more information.`;

const newMsg = `maestro-new: ${codes.italic + codes.blue}maestro new ${
  codes.reset
}[${codes.italic + codes.bold + codes.red}options ${codes.reset}...] ${
  codes.bold + codes.red
}project_name${codes.reset}
    Create a new Maestro project.

    Run ${codes.italic + codes.blue}maestro new ${
  codes.bold + codes.red
}project_name${codes.reset} to create a new maestro project with the
    given project name.
    When this command is executed a prompt is displayed listing all of the
    available templates on which to base this new project.

    Options:
      -n, --no-template
          Don't use a template for the new project.

      -t ${codes.italic + codes.bold + codes.red}template_name${codes.reset},
      --template ${codes.italic + codes.bold + codes.red}template_name${
  codes.reset
},
      --template=${codes.italic + codes.bold + codes.red}template_name${
  codes.reset
}
          Use a specific template for the new project.

    See manual page ${codes.yellow + codes.bold}maestro-new(1)${
  codes.reset
} for more information.`;

const getTemplatesMsg = `maestro-get-templates: ${
  codes.italic + codes.blue
}maestro get-templates${codes.reset}
    Fetch and install the default Maestro templates.

    Run ${codes.italic + codes.blue}maestro get-templates${
  codes.reset
} to fetch and install the default Maestro
    templates from the ${codes.yellow}⟨${
  codes.green + codes.underline
}https://github.com/maestro-framework/maestro-templates${
  codes.reset + codes.yellow
}⟩${codes.reset}
    git repository.

    See manual page ${codes.yellow + codes.bold}maestro-get-templates(1)${
  codes.reset
} for more information.`;

const helpMsg = `maestro-help: ${codes.italic + codes.blue}maestro help ${
  codes.bold + codes.red
}command${codes.reset}
    Display help about a specific Maestro command.

    Run ${codes.italic + codes.blue}maestro help ${
  codes.bold + codes.red
}command${codes.reset} to get help specific to a Maestro subcommand.

    See manual page ${codes.yellow + codes.bold}maestro-help(1)${
  codes.reset
} for more information.`;

const defaultMsg = `Run \`${codes.italic + codes.blue}maestro help ${
  codes.bold + codes.red
}command${codes.reset}\` to get help specific to a subcommand.`;

const help = (command) => {
  switch (command) {
    case undefined:
      console.log(defaultMsg);
      break;
    case "config":
      console.log(configMsg);
      break;
    case "deploy":
      console.log(deployMsg);
      break;
    case "teardown":
      console.log(teardownMsg);
      break;
    case "new":
      console.log(newMsg);
      break;
    case "get-templates":
      console.log(getTemplatesMsg);
      break;
    case "help":
      console.log(helpMsg);
      break;
    default:
      console.log(defaultMsg);
      break;
  }
};

module.exports = help;
