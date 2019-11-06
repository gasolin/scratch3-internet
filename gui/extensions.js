const json = {
    name: 'JSON積木',
    extensionId: 'json',
    collaborator: 'gasolin',
    iconURL: gdxforIconURL,
    insetIconURL: gdxforInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Fetch JSON."
            description="Fetch JSON extension"
            id="gui.extension.gasjson.description"
        />
    ),
    featured: true,
    disabled: false,
    // bluetoothRequired: false,
    internetConnectionRequired: true,
    // launchPeripheralConnectionFlow: false,
    useAutoScan: false,
    // connectionIconURL: gdxforConnectionIconURL,
    // connectionSmallIconURL: gdxforConnectionSmallIconURL,
    connectingMessage: (
        <FormattedMessage
            defaultMessage="Connecting"
            description="Message to help people connect to their force and acceleration sensor."
            id="gui.extension.gdxfor.connectingMessage"
        />
    ),
    helpLink: 'https://scratch.mit.edu/vernier'
};
