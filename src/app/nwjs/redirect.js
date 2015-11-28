import { App } from "nwjs/nwjs";


var reURI = /^([a-z]+):\/\/([\w-]+(?:\.[\w-]+)*)\/?/;
var enabled = {};


/**
 * @param {string} from
 * @param {string} to
 */
export function enable( from, to ) {
	var src = reURI.exec( from );
	var dst = reURI.exec( to );

	if ( !src || !dst ) {
		throw new Error( "Invalid parameters" );
	}

	if ( enabled.hasOwnProperty( from ) ) {
		if ( enabled[ from ].hasOwnProperty( to ) ) {
			return;
		}
	} else {
		enabled[ from ] = {};
	}
	enabled[ from ][ to ] = true;

	App.addOriginAccessWhitelistEntry( src[0], dst[1], dst[2], true );
}
