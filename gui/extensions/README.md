patch `scratch-gui/src/lib/libraries/extensions/index.jsx`


import jsonImage from './json/json.png';
import lassImage from './lass/lass.png';
import iftttImage from './ifttt/ifttt.png';
import thingspeakImage from './thingspeak/thingspeak.png';


    {
	name: 'JSON',
    	extensionId: 'gasoJSON',
    	collaborator: 'gasolin',
    	iconURL: jsonImage,
    	insetIconURL: onegpioRpiInsetIconURL,
    	description: (
        	<FormattedMessage
            	defaultMessage="Fetch JSON."
            	description="Fetch JSON extension"
            	id="gui.extension.gasojson.description"
        	/>
    	),
    	featured: true,
    	disabled: false,
    	// bluetoothRequired: false,
    	internetConnectionRequired: true,
    	// launchPeripheralConnectionFlow: false,
    	useAutoScan: false,
    	helpLink: 'https://github.com/gasolin/scratch3-internet'
    },
    {
    	name: 'IFTTT',
	extensionId: 'gasoIFTTT',
	collaborator: 'gasolin',
	iconURL: iftttImage,
	insetIconURL: onegpioRpiInsetIconURL,
	description: (
            <FormattedMessage
                defaultMessage="IFTTT Webhook"
                description="IFTTT Webhook extension"
                id="gui.extension.gasoifttt.description"
            />
        ),
        featured: true,
        disabled: false,
        // bluetoothRequired: false,
        internetConnectionRequired: true,
        // launchPeripheralConnectionFlow: false,
        useAutoScan: false,
        helpLink: 'https://github.com/gasolin/scratch3-internet'
    },
    {
  	name: 'LASS',
	extensionId: 'gasoLASS',
	collaborator: 'gasolin',
	iconURL: lassImage,
	insetIconURL: gdxforInsetIconURL,
	description: (
            <FormattedMessage
                defaultMessage="Fetch LASS."
                description="Fetch LASS extension"
                id="gui.extension.gasolass.description"
            />
        ),
        featured: true,
        disabled: false,
        // bluetoothRequired: false,
        internetConnectionRequired: true,
        // launchPeripheralConnectionFlow: false,
        useAutoScan: false,
        helpLink: 'https://github.com/gasolin/scratch3-internet'
    },
    {
	name: 'ThingSpeak',
	extensionId: 'gasoThingSpeak',
	collaborator: 'gasolin',
	iconURL: thingspeakImage,
	insetIconURL: gdxforInsetIconURL,
	description: (
            <FormattedMessage
                defaultMessage="ThingSpeak"
                description="ThingSpeak extension"
                id="gui.extension.gasothingspeak.description"
            />
        ),
        featured: true,
        disabled: false,
        // bluetoothRequired: false,
        internetConnectionRequired: true,
        // launchPeripheralConnectionFlow: false,
        useAutoScan: false,
        helpLink: 'https://github.com/gasolin/scratch3-internet'
    }

