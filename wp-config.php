<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'IOTAM');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'xk^5~(%6Xx.5Y}AM3Vql9=rji.u+R0rTU|Za>25}s](r+K*J[pmA?Jb@1l# PCny');
define('SECURE_AUTH_KEY',  'Ay9a3Du:BK4?.O~A5CdA$I8n@gGO%w/c-]$(gO=xOuFbKp.H@l-$QtFeSSf17}gg');
define('LOGGED_IN_KEY',    'iPqVw+$kvD5K]QM8k[l?oHcy;@u4mS Pj5I]w~FB)BttZ{vLk|Y{*}n>4 Qb%oZ`');
define('NONCE_KEY',        'q/C7+5.R7 %J~3z|=.;@**DbBT]S3}zdhd&it#ZF;6*sE3*i]V8Py{K!zj|{rznA');
define('AUTH_SALT',        'K-<2.XF*u?*j!*>g~@4G.+#J_:S293U1(rh!]z]Dq+.i_=)#D=PaXx(<5K$X;~PP');
define('SECURE_AUTH_SALT', 'd}xGa?NAx .%YuGM9EzBnU&M;>Pg:v6r;@B?qOh%]yz7b&$-SLM$p.6GUY((cn27');
define('LOGGED_IN_SALT',   ']|cq6=.VO4n+g8Y-K-@qujke3PhJz4,DA(<]rV2IL3(y]R=mTF,;x|-M~+O3iq|X');
define('NONCE_SALT',       '{5.XiPx*=#x{8P4?hX7m:R}yE~`xa@_m1Z8w/wjq%*nmX]0d|iF5_mr,,HOf0@tf');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
