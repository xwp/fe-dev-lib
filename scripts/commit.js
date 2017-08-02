/**
 * Commits dist directory as an auto compile, if there are changes.
 */

const { exec, exit, echo, env } = require( 'shelljs' );

// Check for changes to commit.
if ( '' === exec( 'git status dist --porcelain', { silent: true }).stdout ) {
	echo( 'No changes in dist to commit.' );
	exit( 0 );
}

if ( exec( 'git commit -m ":zap: babel compile (bot) [skip ci]" -- dist' ).code !== 0 ) {
	echo( 'Error: Git commit failed' );
	exit( 0 );
}

if ( 'true' === env['TRAVIS'] ) {
	exec( 'git push' );
}
