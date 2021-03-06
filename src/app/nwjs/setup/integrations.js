define([
	"Ember",
	"nwjs/nwWindow",
	"nwjs/argv",
	"nwjs/setup/platformfixes"
], function(
	Ember,
	nwWindow,
	argv,
	platformfixes
) {

	var get = Ember.get;


	function setupIntegrations( settings ) {
		// try to fix issues on certain platforms first
		platformfixes();

		// read from settings first
		onChangeIntegrations( settings );

		// then process launch parameters

		if ( argv.max ) {
			// maximize window
			nwWindow.toggleMaximize( false );
		}

		if ( argv.min ) {
			// minimize window
			nwWindow.toggleMinimize( false );
		}

		if ( argv.tray ) {
			// show tray icon (and taskbar item)
			nwWindow.setShowInTray( true, get( settings, "isVisibleInTaskbar" ) );
			// remove the tray icon after clicking it if it's disabled in the settings
			if ( !get( settings, "isVisibleInTray" ) ) {
				nwWindow.tray.removeOnClick();
			}
		} else {
			// show application window
			nwWindow.toggleVisibility( true );
		}

		if ( DEBUG ) {
			nwWindow.window.initialized = true;
		}

		// listen for changes to integration settings
		settings.addObserver( "gui_integration", settings, onChangeIntegrations );
	}

	function onChangeIntegrations( settings ) {
		var taskbar = get( settings, "isVisibleInTaskbar" );
		var tray    = get( settings, "isVisibleInTray" );

		nwWindow.setShowInTaskbar( taskbar );
		nwWindow.setShowInTray( tray, taskbar );
	}


	return {
		setupIntegrations: setupIntegrations
	};

});
