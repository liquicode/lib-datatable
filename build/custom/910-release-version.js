/*
# 910-release-version

Finalizes a library project for release and establishes a new version.

## Finalize Project for Release

- Loads the package.json file to obtain current version number.
- Runs tests and store output: `npx mocha -u bdd tests/*.js --timeout 0 --slow 10`
- Do final commit: `git commit -a -m "Finalization for vX.Y.Z"`
- Do final push: `git push origin`
- Create git version tag: `git tag -a vX.Y.Z -m "Version vX.Y.Z"`
- Push git version tag: `git push origin vX.Y.Z`
- Create new npm version: `npm publish . --access public`

## Establish a New Version

- Increments the minor portion of the version number (e.g. 0.0.1 -> 0.0.2).
- Search/Replace the old version number with the new version in source files:
	- `package.json`
	- `VERSION`
	- `readme.md` (in format: `(vX.Y.Z)`)
	- `docs/_coverpage.md` (in format: `(vX.Y.Z)`)
	- `docs/guides/readme.md` (in format: `(vX.Y.Z)`)
*/

const LIB_FS = require( 'fs' );
const LIB_PATH = require( 'path' );
const LIB_CHILD_PROCESS = require( 'child_process' );


//---------------------------------------------------------------------
function print_command_output( Command, Output )
{
	console.log( '------------------------------------------' );
	console.log( `Command: ${Command}` );
	console.log( `stdout: \n${Output.stdout}` );
	console.log( `stderr: \n${Output.stderr}` );
	console.log( '------------------------------------------' );
	console.log( '\n' );
	return;
}


//---------------------------------------------------------------------
async function execute_command( Command )
{
	return new Promise(
		( resolve, reject ) =>
		{
			LIB_CHILD_PROCESS.exec( Command,
				( error, stdout, stderr ) =>
				{
					if ( error )
					{
						reject( error );
						return;
					}
					let output =
					{
						stdout: stdout,
						stderr: stderr,
					};
					print_command_output( Command, output );
					resolve( output );
				} );
			return;
		}
	);
}


//---------------------------------------------------------------------
function replace_text( Text, Search, Replace )
{
	while ( Text.indexOf( Search ) >= 0 )
	{
		let ich1 = Text.indexOf( Search );
		let ich2 = ich1 + Search.length;
		Text = Text.substr( 0, ich1 ) + Replace + Text.substr( ich2 );
	}
	return Text;
}


//---------------------------------------------------------------------
( async function ()
{
	console.log( `Running in: ${process.cwd()}` );

	// Load package.json
	let path = LIB_PATH.join( process.cwd(), 'package.json' );
	let PACKAGE = require( path );
	console.log( `Loaded package.json` );
	console.log( `\tname = ${PACKAGE.name}` );
	console.log( `\tversion = ${PACKAGE.version}` );

	//---------------------------------------------------------------------
	//	Finalize Project for Release
	//---------------------------------------------------------------------

	// Update docs/testing-output.md
	console.log( 'Updating docs/testing-output.md' );
	{
		let result = await execute_command( `npx mocha -u bdd tests/*.js --timeout 0 --slow 10` );
		path = LIB_PATH.join( process.cwd(), 'docs', 'testing-output.md' );
		LIB_FS.writeFileSync( path,
			"# Testing Output\n\n\n"
			+ "```\n"
			+ result.stdout + "\n"
			+ "```\n\n\n"
		);
	}

	return;

	// Set git version tag.
	console.log( 'Setting git version tag' );
	await execute_command( `git tag -a v${PACKAGE.version} -m "Version ${PACKAGE.version}"` );

	// Push git version tag.
	console.log( 'Pushing git version tag' );
	await execute_command( `git push origin v${PACKAGE.version}` );

	// Update npm with new release.
	console.log( 'Updating npm with new release' );
	await execute_command( `npm publish . --access public` );

	//---------------------------------------------------------------------
	//	Establish a New Version
	//---------------------------------------------------------------------

	// Increment the version number.
	let prev_version = PACKAGE.version;
	{
		let parts = PACKAGE.version.split( '.' );
		parts[ 2 ] = parseInt( parts[ 2 ] ) + 1;
		PACKAGE.version = parts.join( '.' );
	}

	// Update files with new version.
	let doc = null;

	// Update package.json
	console.log( `Updating file: package.json` );
	path = LIB_PATH.join( process.cwd(), 'package.json' );
	LIB_FS.writeFileSync( path, JSON.stringify( PACKAGE, null, '\t' ) );

	// Update VERSION
	console.log( `Updating file: VERSION` );
	path = LIB_PATH.join( process.cwd(), 'VERSION' );
	LIB_FS.writeFileSync( path, PACKAGE.version );

	console.log( `Updating file: readme.md` );
	path = LIB_PATH.join( process.cwd(), 'readme.md' );
	doc = LIB_FS.readFileSync( path, 'utf-8' );
	doc = replace_text( doc, `(v${prev_version})`, `(v${PACKAGE.version})` );
	LIB_FS.writeFileSync( path, doc );

	console.log( `Updating file: docs/_coverpage.md` );
	path = LIB_PATH.join( process.cwd(), 'docs', '_coverpage.md' );
	doc = LIB_FS.readFileSync( path, 'utf-8' );
	doc = replace_text( doc, `(v${prev_version})`, `(v${PACKAGE.version})` );
	LIB_FS.writeFileSync( path, doc );

	console.log( `Updating file: docs/guides/readme.md` );
	path = LIB_PATH.join( process.cwd(), 'docs', 'guides', 'readme.md' );
	doc = LIB_FS.readFileSync( path, 'utf-8' );
	doc = replace_text( doc, `(v${prev_version})`, `(v${PACKAGE.version})` );
	LIB_FS.writeFileSync( path, doc );

	return;
} )();